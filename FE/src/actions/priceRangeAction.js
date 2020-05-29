export const changePriceRange = (payload) => {
  return {
    type: "changePriceRange",
    payload,
  };
};

export const deletePriceRange = () => {
  return {
    type: "deletePriceRange",
  };
};

export const savePriceRange = () => {
  return {
    type: "savePriceRange",
  };
};
