import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/inter";
import { MockApp } from "./App";
import { Gallery } from "./gallery/Gallery";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {window.location.pathname.replace(/\/$/, "").endsWith("/gallery") || window.location.pathname.endsWith("/gallery/index.html") ? <Gallery /> : <MockApp />}
  </React.StrictMode>,
);
