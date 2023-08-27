const initialState = {
  moviesList: [],
};

const movies = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MOVIES":
      return { ...state, moviesList: action.payload.moviesList };

    case "SORT_BY_RATING":
      const copyData1 = [...state.moviesList];
      return {
        ...state,
        moviesList: copyData1.sort((a, b) => b.vote_average - a.vote_average),
      };

    case "SORT_BY_YEAR":
      const copyData2 = [...state.moviesList];
      return {
        ...state,
        moviesList: copyData2.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        ),
      };

    default:
      return state;
  }
};

export default movies;
