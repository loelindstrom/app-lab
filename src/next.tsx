import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/inter";
import { App } from "./App";
import { NextWorkspaceShell } from "./ui";
import "./styles.css";
import "./ui/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App shell={NextWorkspaceShell} /></React.StrictMode>,
);
