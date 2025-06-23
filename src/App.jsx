import React from "react";
import "./style.css";

export default function App() {
  return (
    <div style={{ backgroundColor: "black", color: "lime", padding: "2rem" }}>
      <h1>Fresno Music Calendar</h1>
      <p>Debug: App is rendering.</p>
      <div style={{ marginTop: "2rem", border: "1px solid lime", padding: "1rem" }}>
        <h2>The Jazz Night</h2>
        <p><strong>Venue:</strong> Tower Lounge</p>
        <p><strong>Time:</strong> 8:00 PM</p>
        <p><strong>Genre:</strong> Jazz</p>
        <p>Enjoy a mellow evening of smooth jazz with the Tower Quartet.</p>
      </div>
    </div>
  );
}
