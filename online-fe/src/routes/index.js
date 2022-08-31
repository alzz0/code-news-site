import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "../pages/landing";
export default function Routing() {
  return (
    <div>
      <Router>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}
