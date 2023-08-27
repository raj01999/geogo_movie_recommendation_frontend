export const addMovie = (value) => {
  return {
    type: "ADD_MOVIES",
    payload: {
      moviesList: value,
    },
  };
};

export const sortByRating = (value) => {
  return {
    type: "SORT_BY_RATING",
  };
};

export const sortByYear = (value) => {
  return {
    type: "SORT_BY_YEAR",
  };
};
