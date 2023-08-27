export const setSearchKey = (value) => {
  return {
    type: "SEARCH_KEY",
    payload: {
      searchKey: value,
    },
  };
};

export const setFilterSelections = (value) => {
  return {
    type: "FILTER_SELECTION",
    payload: {
      filterSelections: value,
    },
  };
};
