import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../actions/movies";

const useFetchData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonData = await fetch(`${process.env.REACT_APP_API}/movie/data`);
    const data = await jsonData.json();
    dispatch(addMovie(data.value));
  };
};

export default useFetchData;
