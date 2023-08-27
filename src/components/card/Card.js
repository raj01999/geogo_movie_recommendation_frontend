import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./card.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          layout
        >
          <Link
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="cards">
              <img
                className="cards__img"
                src={`https://image.tmdb.org/t/p/original${
                  movie ? movie.poster_path : ""
                }`}
              />
              <div className="cards__overlay">
                <div className="card__title">
                  {movie ? movie.original_title : ""}
                </div>
                <div className="card__runtime">
                  {movie ? movie.release_date : ""}
                  <span className="card__rating">
                    {movie ? movie.vote_average : ""}
                    <i className="fas fa-star" />
                  </span>
                </div>
                <div className="card__description">
                  {movie ? movie.overview.slice(0, 118) + "..." : ""}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default Cards;