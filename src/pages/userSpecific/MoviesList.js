import React, { useEffect, useState } from "react";
import "./moviesList.css";
import Cards from "../../components/card/Card";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

const MoviesList = ({ pageTitle }) => {
  const [movieList, setMovieList] = useState([]);
  const { _, user } = useSelector((state) => state.user);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [pageTitle]);

  const getData = async () => {
    const jsonData = await fetch(
      `${process.env.REACT_APP_API}/movie/user/${pageTitle}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie_ids:
            pageTitle == "Liked Movies" ? user.liked : user.watch_later,
        }),
      }
    );
    const data = await jsonData.json();
    setMovieList(data.value);
  };

  return (
    <div className="movie__list">
      <h1>{pageTitle} : </h1>
      <motion.div layout animate={{ y: 30 }} className="list__cards">
        <AnimatePresence>
          {movieList.length !== 0 ? (
            movieList.map((movie, idx) => <Cards key={idx} movie={movie} />)
          ) : (
            <div style={{ fontSize: "1.5rem" }}>
              {pageTitle == "Liked Movies"
                ? "You have not liked any movie yet, Your liked movie will appear here"
                : "You have not added any movie yet, Your saved movie will appear here"}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MoviesList;
