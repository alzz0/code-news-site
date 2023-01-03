import { getAccessToken, getRefreshToken, getIdToken } from "./AuthService";
import axios from "axios";

var retryFetch = false;
const authRefreshToken = (url, payload) => {
  const token = getAccessToken();
  if (
    token === "undefined" ||
    token === undefined ||
    token === null ||
    !token
  ) {
    return;
  }
  if (payload) {
    console.log(payload);

    axios
      .post(url, payload, {
        headers: {
          Authorization: `Bearer ${getIdToken()}`,
        },
      })
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        if (!retryFetch) {
          reValidateTokens(url, payload);
        }
      });
  } else {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getIdToken()}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        if (!retryFetch) {
          reValidateTokens(url);
        }
      });
  }
};

const reValidateTokens = (url, payload) => {
  console.log("Revalidating tokens");
  const requestBody = {
    refreshToken: getRefreshToken(),
    accessToken: getAccessToken(),
    idtoken: getIdToken(),
    email: localStorage.getItem("username"),
  };
  axios
    .post(
      "https://rz2sslew69.execute-api.us-east-1.amazonaws.com/dev/user/verify",
      requestBody,
      {
        headers: {
          Authorization: `${getAccessToken()}`,
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      const { AccessToken, IdToken, ExpiresIn } = res.data.accessToken;
      localStorage.setItem("accessToken", AccessToken);
      localStorage.setItem("IdToken", IdToken);
      localStorage.setItem("expiresIn", ExpiresIn);
      // setRetryFetch(true);
      authRefreshToken(url, payload);
      retryFetch = true;
      console.log(res);
    });
};

export default authRefreshToken;
