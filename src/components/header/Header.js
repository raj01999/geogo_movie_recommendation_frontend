import React, { useCallback, useMemo, useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import geogo__logo from "../../utils/images/geogo-logo.png";
import avatar__user from "../../utils/images/avatar.png";
import Drawer from "../drawer/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { setSearchKey } from "../../actions/filter";
import debounce from "lodash.debounce";
import { setFilterSelections } from "../../actions/filter";
import Genres from "../../utils/genres";

const Header = () => {
  const { searchKey, _ } = useSelector((state) => state.filter);
  const [sKey, setSKey] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchKey.length == 0) {
      setSKey("");
    }
  }, [searchKey]);

  /**
   * Debouncing for less api call on search key word
   */
  const lookup = useCallback((value) => {
    dispatch(setSearchKey(value));
  }, []);
  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleChange = (event) => {
    setSKey(event.target.value);
    debouncedLookup(event.target.value);
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Drawer />
        <Link to="/">
          <motion.img
            whileTap={{ scale: 0.7 }}
            className="header__icon"
            src={geogo__logo}
            alt="logo"
            onClick={() => {
              dispatch(setFilterSelections(Genres.map(() => false)));
              dispatch(setSearchKey(""));
            }}
          />
        </Link>
      </div>
      <div className="headerRight">
        <motion.input
          whileTap={{ scale: 0.97 }}
          className="search__movie"
          src={avatar__user}
          placeholder="Search Movie"
          value={sKey}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Header;
