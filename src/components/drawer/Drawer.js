import React, { useEffect, useRef } from "react";
import "./drawer.css";
import { Link } from "react-router-dom";

const Drawer = () => {
  const toggleRef = useRef();
  const menuRef = useRef();

  const handleClick = () => {
    toggleRef.current.classList.toggle("active");
    menuRef.current.classList.toggle("active");
  };

  return (
    <>
      <div ref={menuRef} className="menu">
        <Link to={"/"} onClick={handleClick}>
          Home
        </Link>
        <Link to={"/watchLater"} onClick={handleClick}>
          Watch Later
        </Link>
        <Link to={"/likedMovies"} onClick={handleClick}>
          Liked Movies
        </Link>
      </div>
      <div onClick={handleClick} ref={toggleRef} className="menu__toggler">
        <span></span>
      </div>
    </>
  );
};

export default Drawer;
