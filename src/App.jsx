import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import logo from "/logo.png";


const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: "Jazz Night at Tower",
    start: new Date(2025, 5, 28, 19, 0),
    end: new Date(2025, 5, 28, 21, 0),
    venue: "Tower Theatre",
    genre: "Jazz",
    description: "Live jazz performance."
  },
];

export default function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="Fresno Music Calendar Logo" className="logo" />
        <h1>Fresno Music Calendar</h1>
      </header>
      <main className="main">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </main>
    </div>
  );
}