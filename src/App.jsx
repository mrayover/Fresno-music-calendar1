
import React from "react";

export default function App() {
  const events = [
    {
      name: "Tower District Jazz Night",
      venue: "Goldstein's Mortuary",
      time: "2025-06-25T20:00:00",
      genre: "Jazz",
      description: "A night of local jazz talent.",
    }
  ];

  return (
    <div style={{ backgroundColor: "#000", color: "#0f0", padding: "2rem", fontFamily: "monospace" }}>
      <h1 style={{ marginBottom: "2rem" }}>Fresno Music Calendar - Calendar View</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "1rem",
        border: "1px solid #0f0",
        padding: "1rem"
      }}>
        {[...Array(30)].map((_, index) => {
          const date = index + 1;
          const event = date === 25 ? events[0] : null;
          return (
            <div key={index} style={{
              border: "1px solid #0f0",
              minHeight: "6rem",
              padding: "0.5rem"
            }}>
              <strong>June {date}</strong>
              {event && (
                <div>
                  <p><strong>{event.name}</strong></p>
                  <p>{event.venue}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
