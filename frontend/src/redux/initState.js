const initState = () => {
  const IS = {
    user: null || window.localStorage.getItem("user")
  };

  return IS;
};

export default initState;