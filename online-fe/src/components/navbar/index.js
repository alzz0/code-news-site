import React from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../../service/AuthService";

import logo192 from "../../logo.svg";
export default function Navbar({ theme }) {
  const styles = {
    navContainer: {
      position: "fixed",
      gridArea: "header",
      display: "flex",
      width: "100%",
      height: "60px",
      background: theme === "dark" ? "#121212" : "#fff",
      top: "0",
      zIndex: 3,
    },
    logo: {
      marginRight: "auto",
    },
    navUl: {
      display: "flex",
      listStyle: "none",
      justifyContent: "flex-end",
      paddingLeft: 0,
      width: "100%",
      alignItems: "center",
    },
    navItems: {
      marginRight: "35px",
    },
  };
  return (
    <div style={styles.navContainer}>
      <ul style={styles.navUl}>
        <li style={styles.logo}>
          <NavLink to="/">
            <img src={logo192} alt="" width={50} />
          </NavLink>
        </li>
        {!getUser() && (
          <li style={styles.navItems}>
            <NavLink to="/signin">Sign In</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
