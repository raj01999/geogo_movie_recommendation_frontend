export const setLoad = (value) => {
  return {
    type: "LOAD",
    payload: {
      status: value,
    },
  };
};

export const setUser = (value) => {
  return {
    type: "USER",
    payload: {
      user: value,
    },
  };
};
