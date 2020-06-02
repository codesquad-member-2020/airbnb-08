const initialState = {
  isSearched: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "search":
      return {
        ...state,
        isSearched: action.payload,
      };
    default:
      return state;
  }
};

export { searchReducer };
