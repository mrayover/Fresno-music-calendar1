import React, { useState } from "react";
import eventsData from "./eventsData.jsx";
import "./style.css";

export default function App() {
  const [events] = useState(eventsData);

  return (
    <div className="App">
      <header>
        <h1>Fresno Music Calendar</h1>
      </header>
      <main style={{ padding: "1rem" }}>
        {events.map((event, index) => (
          <div
            key={index}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#fff"
            }}
          >
            <h2>{event.name}</h2>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Genre:</strong> {event.genre}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
