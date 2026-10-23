import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/inter";
import { ComponentGallery } from "./ui";
import "./styles.css";
import "./ui/index.css";
import "./ui/gallery.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><ComponentGallery /></React.StrictMode>,
);
