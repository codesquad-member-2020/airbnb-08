const initialState = {
  isSearched: null,
  isFirst: true,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "search":
      return {
        ...state,
        isSearched: action.payload,
      };
    case "changeFirst":
      return {
        ...state,
        isFirst: false,
      };
    default:
      return state;
  }
};

export { searchReducer };
