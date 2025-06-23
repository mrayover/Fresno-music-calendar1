
import React, { useState } from "react";
import eventsData from "./eventsData.jsx";
import "./style.css";

export default function App() {
  const [events] = useState(eventsData);

  // Group events by date for calendar view
  const groupedEvents = events.reduce((acc, event) => {
    const date = event.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {});

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const numDays = lastDay.getDate();
  const startWeekday = firstDay.getDay();

  const days = [];
  for (let i = 0; i < startWeekday; i++) {
    days.push(null);
  }
  for (let i = 1; i <= numDays; i++) {
    days.push(i);
  }

  const monthName = today.toLocaleString("default", { month: "long" });

  return (
    <div className="App">
      <header>
        <h1>Fresno Music Calendar</h1>
        <h2>{monthName} {year}</h2>
      </header>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div className="calendar-header" key={idx}>{day}</div>
        ))}
        {days.map((day, idx) => {
          const dateKey = day ? `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}` : null;
          const eventsForDay = dateKey && groupedEvents[dateKey] ? groupedEvents[dateKey] : [];

          return (
            <div key={idx} className="calendar-day">
              {day && <div className="day-number">{day}</div>}
              {eventsForDay.map((event, i) => (
                <div key={i} className="event-card">
                  <strong>{event.name}</strong><br />
                  {event.venue}<br />
                  {event.time}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
