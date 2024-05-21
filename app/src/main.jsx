import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { appWindow } from '@tauri-apps/api/window';

let min = document.getElementById('titlebar-minimize');
min.addEventListener('click', () => appWindow.minimize());

let max = document.getElementById('titlebar-maximize');
max.addEventListener('click', () => appWindow.toggleMaximize());

let close = document.getElementById('titlebar-close');
close.addEventListener('click', () => appWindow.close());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
