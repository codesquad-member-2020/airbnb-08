export const adultDecrementCount = (payload) => {
  return {
    type: "ADULT_DECREMENT_COUNT",
    payload,
  };
};

export const audltIncrementCount = (payload) => {
  return {
    type: "ADULT_INCREMENT_COUNT",
    payload,
  };
};

export const childrenDecrementCount = (payload) => {
  return {
    type: "CHILDREN_DECREMENT_COUNT",
    payload,
  };
};

export const childrenIncrementCount = (payload) => {
  return {
    type: "CHILDREN_INCREMENT_COUNT",
    payload,
  };
};

export const babyDecrementCount = (payload) => {
  return {
    type: "BABY_DECREMENT_COUNT",
    payload,
  };
};

export const babyIncrementCount = (payload) => {
  return {
    type: "BABY_INCREMENT_COUNT",
    payload,
  };
};
