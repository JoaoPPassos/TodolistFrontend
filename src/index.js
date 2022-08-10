import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Home } from "./pages";
import { isAuthenticated } from "./store/auth";
import Private from "./layout/private";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    {!isAuthenticated() ? (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    ) : (
      <Private />
    )}
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
