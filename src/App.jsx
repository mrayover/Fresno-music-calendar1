
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CalendarView from "./CalendarView";
import EventDetail from "./EventDetail";
import SubmitEvent from "./SubmitEvent";

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-title">
          <img src="/logo.png" alt="Fresno Music Calendar Logo" className="logo" />
          <h1 className="site-title">Fresno Music Calendar</h1>
        </div>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
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
  );
}
