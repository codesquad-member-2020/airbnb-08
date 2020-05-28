const initialState = {
  adultCount: 0,
  childrenCount: 0,
  babyCount: 0,
  totalCount: 0,
  adultMin: true,
  adultMax: false,
  childrenMin: true,
  childrenMax: false,
  babyMin: true,
  babyMax: false,
  countType: "",
};

const guestCountReducer = (state = initialState, action) => {
  const { type, ageType } = action;

  switch (type) {
    case `${ageType}_INCREMENT_COUNT`:
      if (state[`${ageType}Count`] === 8)
        return {
          ...state,
          [`${ageType}Max`]: true,
          countType: ageType,
        };
      if (state[`${ageType}Count`] >= 7)
        return {
          ...state,
          [`${ageType}Count`]: state[`${ageType}Count`] + 1,
          totalCount: ageType === "baby" ? state.totalCount : state.totalCount + 1,
          [`${ageType}Min`]: false,
          [`${ageType}Max`]: true,
          countType: ageType,
        };
      return {
        ...state,
        [`${ageType}Count`]: state[`${ageType}Count`] + 1,
        totalCount: ageType === "baby" ? state.totalCount : state.totalCount + 1,
        [`${ageType}Min`]: false,
        [`${ageType}Max`]: false,
        countType: ageType,
      };
    case `${ageType}_DECREMENT_COUNT`:
      if (state[`${ageType}Count`] === 0)
        return {
          ...state,
          [`${ageType}Min`]: true,
          countType: ageType,
        };
      if (state[`${ageType}Count`] <= 1)
        return {
          ...state,
          [`${ageType}Count`]: state[`${ageType}Count`] - 1,
          totalCount: ageType === "baby" ? state.totalCount : state.totalCount - 1,
          [`${ageType}Min`]: true,
          [`${ageType}Max`]: false,
          countType: ageType,
        };
      return {
        ...state,
        [`${ageType}Count`]: state[`${ageType}Count`] - 1,
        totalCount: ageType === "baby" ? state.totalCount : state.totalCount - 1,
        [`${ageType}Min`]: false,
        [`${ageType}Max`]: false,
        countType: ageType,
      };
    case "DELETE_COUNT":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export { guestCountReducer };
