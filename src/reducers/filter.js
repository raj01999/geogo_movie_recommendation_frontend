import Genres from "../utils/genres";
const initialState = {
  searchKey: "",
  filterSelections: Genres.map(() => false),
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_KEY":
      return { ...state, searchKey: action.payload.searchKey };

    case "FILTER_SELECTION":
      return { ...state, filterSelections: action.payload.filterSelections };

    default:
      return state;
  }
};

export default filter;
