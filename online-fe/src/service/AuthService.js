module.exports = {
  getUser: function () {
    const user = localStorage.getItem("username");
    if (user === "undefined" || !user) {
      return null;
    } else {
      return user;
    }
  },
  getAccessToken: function () {
    return localStorage.getItem("accessToken");
  },
  getIdToken: function () {
    return localStorage.getItem("IdToken");
  },
  getRefreshToken: function () {
    return localStorage.getItem("refreshToken");
  },
  getExpiresIn: function () {
    return localStorage.getItem("expiresIn");
  },
  setUserSession: function (
    accessToken,
    refreshToken,
    expiresIn,
    username,
    IdToken
  ) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("expiresIn", expiresIn);
    localStorage.setItem("username", username);
    localStorage.setItem("IdToken", IdToken);
  },
  resetUserSession: function () {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("username");
    localStorage.removeItem("IdToken");
  },
};

// import { getUser, resetUserSession } from "../../service/AuthService";
// const handleLogout = () => {
//   resetUserSession();
//   window.location.reload();
// };
