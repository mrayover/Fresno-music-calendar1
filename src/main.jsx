
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import EventDetail from "./EventDetail";
import SubmitEvent from "./SubmitEvent";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/submit-event" element={<SubmitEvent />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
