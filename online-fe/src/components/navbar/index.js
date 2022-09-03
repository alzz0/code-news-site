import React from "react";
import { NavLink } from "react-router-dom";
import { StyledComponent } from "styled-components";
export default function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/signin">Sign in</NavLink>
        </li>
      </ul>
    </div>
  );
}
