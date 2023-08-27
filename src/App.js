import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Movie from "./pages/movieDetail/Movie";
import MoviesList from "./pages/userSpecific/MoviesList";

const App = () => {
  return (
    <div className="container__main">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route
            path="watchLater"
            element={<MoviesList pageTitle={"Watch Later"} />}
          ></Route>
          <Route
            path="likedMovies"
            element={<MoviesList pageTitle={"Liked Movies"} />}
          ></Route>
          <Route
            path="/*"
            element={
              <h1 style={{ color: "red", textAlign: "center" }}>
                404 Not Found !
              </h1>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
