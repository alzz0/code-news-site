import React, { useState } from "react";
import axios from "axios";
import config from "../../config";
import { Input } from "../../utils";
const { URL } = config.apiGateway;
const SignUp = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    console.log(e.target.value);
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
          onChange={handleChange}
          type="text"
          name="firstName"
          placeholder="First Name"
        />
        <Input
          onChange={handleChange}
          type="text"
          name="lastName"
          placeholder="Last Name"
        />
        <Input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="email"
          autoComplete="email"
        />
        <Input
          onChange={handleChange}
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
  const handleChange = (e) => {
    console.log(e.target.value);
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
        console.log(res);
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
    <>
      <SignUp />
      <SignIn />
    </>
  );
}
