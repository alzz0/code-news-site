import React from "react";
import { NavLink } from "react-router-dom";

import logo192 from "../../logo.svg";
export default function Navbar() {
  return (
    <div style={styles.navContainer}>
      <ul style={styles.navUl}>
        <li style={styles.logo}>
          <NavLink to="/">
            <img src={logo192} alt="" width={50} />
          </NavLink>
        </li>
        <li style={styles.navItems}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li style={styles.navItems}>
          <NavLink to="/signin">Sign in</NavLink>
        </li>
      </ul>
    </div>
  );
}

const styles = {
  navContainer: {
    margin: "30px",
  },
  logo: {
    marginRight: "auto",
  },
  navUl: {
    display: "flex",
    listStyle: "none",
    justifyContent: "flex-end",
    paddingLeft: 0,
  },
  navItems: {
    marginRight: "20px",
  },
};
