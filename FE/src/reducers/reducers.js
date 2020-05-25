const initialState = {
  adultCount: 0,
  childrenCount: 0,
  babyCount: 0,
  totalCount: 0,
};

const guestCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADULT_INCREMENT_COUNT":
      return {
        ...state,
        adultCount: state.adultCount + 1,
        totalCount: state.totalCount + 1,
      };
    case "ADULT_DECREMENT_COUNT":
      return {
        ...state,
        adultCount: state.adultCount - 1,
        totalCount: state.totalCount - 1,
      };
    case "CHILDREN_INCREMENT_COUNT":
      return {
        ...state,
        childrenCount: state.childrenCount + 1,
        totalCount: state.totalCount + 1,
      };
    case "CHILDREN_DECREMENT_COUNT":
      return {
        ...state,
        childrenCount: state.childrenCount - 1,
        totalCount: state.totalCount - 1,
      };
    case "BABY_INCREMENT_COUNT":
      return {
        ...state,
        babyCount: state.babyCount + 1,
      };
    case "BABY_DECREMENT_COUNT":
      return {
        ...state,
        babyCount: state.babyCount - 1,
      };
    default:
      return state;
  }
};

export { guestCountReducer };
