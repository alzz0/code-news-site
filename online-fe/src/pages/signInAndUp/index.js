import React, { useState } from "react";
import axios from "axios";
export default function SignInAndUp() {
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
    console.log(e);
    const url =
      "https://58jjw78k39.execute-api.us-east-1.amazonaws.com/dev/user/signup";
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
    <div>
      <form onSubmit={submitForm}>
        <input
          onChange={handleChange}
          type="text"
          name="firstName"
          placeholder="First Name"
        />
        <input
          onChange={handleChange}
          type="text"
          name="lastName"
          placeholder="Last Name"
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="password"
        />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
}
