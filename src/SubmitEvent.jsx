import React from "react";
import SubmitEventForm from "./SubmitEventForm";
import { useNavigate } from "react-router-dom";

export default function SubmitEvent() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
        ← Back to Calendar
      </button>
      <h2>Submit a New Event</h2>
      <p>DEBUG: Form should be below this line.</p>
      <SubmitEventForm />
    </div>
  );
}
