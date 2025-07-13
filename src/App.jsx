
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CalendarView from "./CalendarView";
import EventPage from "./components/EventPage";
import SubmitEvent from "./SubmitEvent.jsx";
import AdminConfig from "./AdminConfig";
import DayView from "./DayView";

export default function App() {
  return (
    <div className="app-container">
<header className="bg-tower-brick text-tower-cream px-6 py-4 flex items-center justify-between shadow-md">
  <div className="flex items-center space-x-4">
    <img src="/logo.png" alt="Fresno Music Calendar Logo" className="h-12" />
    <h1 className="text-2xl font-extrabold tracking-wide">Fresno Music Calendar</h1>
  </div>
  <nav className="space-x-4">
    <Link to="/" className="hover:underline hover:text-tower-yellow">Home</Link>
    <Link to="/submit" className="hover:underline hover:text-tower-yellow">Submit Event</Link>
  </nav>
</header>
      <main>
        <Routes>
          <Route path="/" element={<CalendarView />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/submit" element={<SubmitEvent />} />
          <Route path="/admin" element={<AdminConfig />} />
          <Route path="/day/:date" element={<DayView />} />
        </Routes>
      </main>
    </div>
  );
}
