import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../../config";
import { Input } from "../../utils";
import { AuthContext } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { setUserSession } from "../../service/AuthService";


const { URL } = config.apiGateway;
const SignUp = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const url = `${URL}user/signup`;
    const data = {
      email: user.email,
      password: user.password,
    };

    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
      });
  };

  return (
    <div>
      <h1>Sign up </h1>
      <form onSubmit={submitForm}>
        <Input
          handleChange={handleChange}
          type="text"
          name="firstName"
          placeholder="First Name"
        />
        <Input
          handleChange={handleChange}
          type="text"
          name="lastName"
          placeholder="Last Name"
        />
        <Input
          handleChange={handleChange}
          type="email"
          name="email"
          placeholder="email"
          autoComplete="email"
        />
        <Input
          handleChange={handleChange}
          type="password"
          name="password"
          placeholder="password"
          autoComplete="current-password"
        />
        <Input type="submit" value="Sign Up" />
      </form>
      {responseMessage}
    </div>
  );
};

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  console.log('user')
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const submitForm = (e) => {
    e.preventDefault();

    const url = `${URL}user/login`;
    const data = {
      email: user.email,
      password: user.password,
    };
    axios
      .post(url, data)
      .then((res) => {
        setAuth(res.data);
        const { AccessToken, RefreshToken, ExpiresIn, IdToken } =
          res.data.AuthenticationResult;
        setUserSession(
          AccessToken,
          RefreshToken,
          ExpiresIn,
          res.data.Username,
          IdToken
        );

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {" "}
      <h1>Sign in </h1>
      <form onSubmit={submitForm}>
        <Input
          handleChange={handleChange}
          type="email"
          name="email"
          placeholder="email"
          autoComplete="email"
        />
        <Input
          handleChange={handleChange}
          type="password"
          name="password"
          placeholder="password"
          autoComplete="current-password"
        />
        <Input type="submit" value="Sign In" />
      </form>
    </>
  );
};

export default function SignInAndUp() {
  return (
    <div style={{ paddingTop: "100px", marginLeft: "400px" }}>
      <SignUp />
      <SignIn />
    </div>
  );
}
