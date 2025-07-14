// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./style.css";
import { AuthProvider } from "./AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
</React.StrictMode>
);
