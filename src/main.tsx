import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./styles/playback.css";
import "./styles/motion.css";
import "./styles/mobile.css";
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh: () => {},
  onOfflineReady: () => {},
  onRegisterError: (error) => console.error("SW registration failed:", error),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
