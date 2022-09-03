import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../pages/landing";
import SignInAndUp from "../pages/signInAndUp";
export default function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/signin" element={<SignInAndUp />} />
        </Routes>
      </Router>
    </div>
  );
}
