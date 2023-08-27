const getUser = async () => {
  const strUser = localStorage.getItem("geogo_user");
  if (strUser && strUser != "undefined") {
    return JSON.parse(strUser);
  } else {
    try {
      const jsonData = await fetch(`${process.env.REACT_APP_API}/user/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "geogo_" + Date.now(),
        }),
      });
      const data = await jsonData.json();
      localStorage.setItem("geogo_user", JSON.stringify(data.value));
      return data.value;
    } catch (err) {
      console.log(err);
    }
  }
};

const initialState = {
  initialLoad: false,
  user: await getUser(),
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD":
      return { ...state, initialLoad: action.payload.status };

    case "USER":
      localStorage.setItem("geogo_user", JSON.stringify(action.payload.user));
      return { ...state, user: action.payload.user };

    default:
      return state;
  }
};

export default user;
