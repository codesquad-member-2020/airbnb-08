export const decrementCount = (ageType, payload) => {
  return {
    type: `${ageType}_DECREMENT_COUNT`,
    ageType: ageType,
    payload,
  };
};

export const incrementCount = (ageType, payload) => {
  return {
    type: `${ageType}_INCREMENT_COUNT`,
    ageType: ageType,
    payload,
  };
};

export const deleteCount = (payload) => {
  return {
    type: "DELETE_COUNT",
    payload,
  };
};

export const dateChange = (payload) => {
  return {
    type: "dateChange",
    payload,
  };
};
