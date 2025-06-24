
import React from "react";
import { useNavigate } from "react-router-dom";
import SubmitEventForm from "./SubmitEventForm";

const SubmitEvent = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
        ← Back to Calendar
      </button>
      <h1>Submit a New Event</h1>
      <SubmitEventForm />
    </div>
  );
};

export default SubmitEvent;
