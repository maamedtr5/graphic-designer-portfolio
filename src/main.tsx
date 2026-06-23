import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// @ts-ignore: side-effect import of CSS module
import './styles/global.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>
);