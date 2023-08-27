import React, { Fragment, useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import { setUser } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(`${process.env.REACT_APP_API}/movie/data/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data.value));
  };

  const handleWatchLater = async () => {
    try {
      const jsonData = await fetch(`${process.env.REACT_APP_API}/user/custom`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          movie_id: id,
          type: "watch_later",
        }),
      });
      const data = await jsonData.json();
      dispatch(setUser(data.value));
    } catch (err) {
      console.log(err);
    }
  };
  const handleLiked = async () => {
    try {
      const jsonData = await fetch(`${process.env.REACT_APP_API}/user/custom`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          movie_id: id,
          type: "liked",
        }),
      });
      const data = await jsonData.json();
      dispatch(setUser(data.value));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div layout className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre, idx) => (
                    <Fragment key={idx}>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </Fragment>
                  ))
                : ""}
              <motion.span
                className="movie__genre"
                whileTap={{ scale: 0.95 }}
                onClick={handleWatchLater}
                style={{
                  backgroundColor: "rgb(172, 172, 37)",
                  cursor: "pointer",
                  borderRadius: "7px",
                  color: "black",
                }}
              >
                {!user.watch_later.includes(Number(id))
                  ? "Add to Watch Later"
                  : "Remove from Watch Later"}
              </motion.span>
              <motion.span
                className="movie__genre"
                whileTap={{ scale: 0.95 }}
                onClick={handleLiked}
                style={{
                  backgroundColor: "rgb(172, 172, 37)",
                  cursor: "pointer",
                  borderRadius: "7px",
                  color: "black",
                }}
              >
                {!user.liked.includes(Number(id)) ? "Add" : "Remove"}{" "}
                <i className="fa fa-thumbs-up" aria-hidden="true"></i>
              </motion.span>
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail &&
          currentMovieDetail.production_companies &&
          currentMovieDetail.production_companies.map((company, idx) => (
            <Fragment key={idx}>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    className="movie__productionComapany"
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </Fragment>
          ))}
      </div>
    </motion.div>
  );
};

export default Movie;
