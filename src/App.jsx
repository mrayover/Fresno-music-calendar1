
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";

import eventsData from "./eventsData.jsx";
import EventDetail from "./EventDetail.jsx";
import SubmitEvent from "./SubmitEvent.jsx";
import FilterPanel from "./FilterPanel.jsx";
import logo from "./assets/logo.png";

const localizer = momentLocalizer(moment);

function HomePage() {
  const navigate = useNavigate();

  const handleSelectEvent = (event) => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={logo} alt="Fresno Music Calendar Logo" className="app-logo" />
        <h1 className="app-title">Fresno Music Calendar</h1>
      </header>
      <div className="main-layout">
        <FilterPanel />
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={eventsData}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/submit" element={<SubmitEvent />} />
      </Routes>
    </Router>
  );
}
