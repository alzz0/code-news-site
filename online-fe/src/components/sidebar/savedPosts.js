import {
  getAccessToken,
  getRefreshToken,
  getIdToken,
} from "../../service/AuthService";

import axios from "axios";

var retryFetch = false;
const savedPosts = (url, payload) => {
  const token = getAccessToken();
  if (
    token === "undefined" ||
    token === undefined ||
    token === null ||
    !token
  ) {
    return;
  }

  console.log(payload);

  return axios
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
};

// const fetchData = async (sorttype) => {
//     const params = {
//       page: 1,
//       lastItem: "",
//       secondaryIndex: sorttype,
//     };

//     setSortType({
//       type: sorttype,
//       page: 1,
//       lastItem: "",
//       lastPage: false,
//       loading: true,
//     });

//     try {
//       const res = await axios.post(url, params);
//       const items = res.data.Items;

//       if (res.data.LastEvaluatedKey) {
//         setSortType({
//           type: sorttype,
//           page: 1,
//           lastItem: res.data.LastEvaluatedKey,
//           lastPage: false,
//           loading: false,
//         });
//       } else {
//         setSortType({
//           type: sorttype,
//           page: 1,
//           lastItem: "",
//           lastPage: true,
//           loading: false,
//         });
//       }

//       setPosts([...items]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

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
      savedPosts(url, payload);
      retryFetch = true;
      console.log(res);
    });
};

export default savedPosts;
