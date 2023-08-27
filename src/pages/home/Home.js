import React, { useEffect } from "react";
import "./home.css";
import Cards from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import { filterByQueryAndCategories } from "../../utils/utils";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { useSelector } from "react-redux";
import Genres from "../../utils/genres";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addMovie } from "../../actions/movies";
import { setFilterSelections, setSearchKey } from "../../actions/filter";

const Home = () => {
  const { searchKey, filterSelections } = useSelector((state) => state.filter);
  const { moviesList } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const activeCategories = Genres.filter((s, i) => {
    // * It's required when we go for or condition for generes filtering *
    // if (filterSelections.every((item) => item === false)) {
    //   return true;
    // }
    return filterSelections[i];
  });

  useEffect(() => {
    dispatch(setFilterSelections(Genres.map(() => false)));
    dispatch(setSearchKey(""));
  }, []);

  useUpdateEffect(() => {
    (async () => {
      try {
        const menuItems = await filterByQueryAndCategories(
          searchKey,
          activeCategories
        );
        dispatch(addMovie(menuItems.value));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [filterSelections, searchKey]);

  return (
    <motion.div layout className="movie__list">
      <Filter />
      <motion.div layout animate={{ y: 30 }} className="list__cards">
        <AnimatePresence>
          {moviesList.length !== 0 ? (
            moviesList.map((movie, idx) => <Cards key={idx} movie={movie} />)
          ) : (
            <div style={{ fontSize: "1.5rem" }}>
              <p>SearchQuery : {searchKey ? searchKey : "Empty"}</p>
              <p>Genres : {activeCategories.join(",")}</p>
              <p>Message : 404 Not Found !</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Home;
