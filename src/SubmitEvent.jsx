import React from "react";
import SubmitEventForm from "./SubmitEventForm";
import { useNavigate } from "react-router-dom";
import "./components/SubmitEvent.css";

const SubmitEvent = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Submit a New Event</h2>
      <SubmitEventForm />
    </div>
  );
};

export default SubmitEvent;

