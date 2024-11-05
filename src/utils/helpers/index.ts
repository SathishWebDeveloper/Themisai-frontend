
const setAuth = (data:any) => {
  localStorage.setItem("isAuth", data.isAuth);
  localStorage.setItem("token", data.userInfo.accessToken);
};

const clearAuth = () => {
  localStorage.removeItem("isAuth");
  localStorage.removeItem("token");
};

const getAuth = () => {
    return {
      isAuth: localStorage.getItem("isAuth"),
      token: localStorage.getItem("token"),
    };
  };

export { clearAuth, getAuth, setAuth };
