
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CalendarView from "./CalendarView";
import EventDetail from "./EventDetail";
import SubmitEvent from "./SubmitEvent";
import logo from "/public/logo.png"; // ensure logo is in the public folder

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="logo-container">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h1 className="site-title">Fresno Music Calendar</h1>
          </div>
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
