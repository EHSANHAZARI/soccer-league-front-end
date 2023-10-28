import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { Route, Router, Routes } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import Register from "./RegisterPage/register";
import Player from "./PlayerPage/Player";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
