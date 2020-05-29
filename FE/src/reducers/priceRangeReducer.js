const initialState = {
  priceRange: [0, 1000000],
};

const priceRangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "changePriceRange":
      return {
        ...state,
        priceRange: action.payload,
      };
    default:
      return state;
  }
};

export { priceRangeReducer };
