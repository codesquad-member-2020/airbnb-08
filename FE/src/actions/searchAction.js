export const search = (payload) => {
  return {
    type: "search",
    payload,
  };
};

export const changeFirst = () => {
  return {
    type: "changeFirst",
  };
};
