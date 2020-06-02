export const focusChange = (payload) => {
  return {
    type: "focusChange",
    payload,
  };
};

export const dateChange = (payload) => {
  return {
    type: "dateChange",
    payload,
  };
};

export const dateDelete = () => {
  return {
    type: "dateDelete",
  };
};
