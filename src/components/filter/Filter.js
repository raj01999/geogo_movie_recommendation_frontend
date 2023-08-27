import React from "react";
import "./filter.css";
import { motion } from "framer-motion";
import Genres from "../../utils/genres";
import { useDispatch, useSelector } from "react-redux";
import { setFilterSelections, setSearchKey } from "../../actions/filter";
import { sortByRating, sortByYear } from "../../actions/movies";

const Filter = () => {
  const { _, filterSelections } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    dispatch(setFilterSelections(arrayCopy));
  };

  return (
    <motion.div layout className="contailer__filter">
      {Genres.map((genre, idx) => (
        <motion.button
          key={genre}
          className="filter__menu"
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            handleFiltersChange(idx);
          }}
          style={{
            backgroundColor: filterSelections[idx] ? "#495e57" : "#edefee",
          }}
        >
          {genre}
        </motion.button>
      ))}
      <motion.button
        className="movie__sorting"
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          dispatch(sortByRating());
        }}
      >
        Sort By Rating
      </motion.button>
      <motion.button
        className="movie__sorting"
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          dispatch(sortByYear());
        }}
      >
        Sort By Year
      </motion.button>
      <motion.button
        className="filter_clear"
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          dispatch(setFilterSelections(Genres.map(() => false)));
          dispatch(setSearchKey(""));
        }}
      >
        Clear
      </motion.button>
    </motion.div>
  );
};

export default Filter;
