
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CalendarView from "./CalendarView";
import EventDetail from "./EventDetail";
import SubmitEvent from "./SubmitEvent";
import logo from "/public/assets/logo.png";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <img src={logo} alt="Fresno Music Calendar Logo" className="logo" />
          <h1 className="app-title">Fresno Music Calendar</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/submit">Submit Event</Link>
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
