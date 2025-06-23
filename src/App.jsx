
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CalendarView from "./CalendarView";
import EventDetail from "./EventDetail";
import SubmitEvent from "./SubmitEvent";
import "./style.css";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <img src="/logo.png" alt="Fresno Music Calendar Logo" className="logo" />
          <h1 className="site-title">Fresno Music Calendar</h1>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/submit">Submit Event</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<CalendarView />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/submit" element={<SubmitEvent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
