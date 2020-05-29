const initialState = {
  priceRange: [0, 1000000],
  isSaved: false,
  isDeleted: false,
};

const priceRangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "changePriceRange":
      return {
        ...state,
        priceRange: action.payload,
        isDeleted: false,
      };
    case "deletePriceRange":
      return { ...state, ...initialState, isDeleted: true };
    case "savePriceRange":
      return { ...state, isSaved: true };
    default:
      return state;
  }
};

export { priceRangeReducer };
