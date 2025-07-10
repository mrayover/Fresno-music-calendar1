import React from "react";
import SubmitEventForm from "./SubmitEventForm";

const SubmitEvent = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 bg-black/50 rounded-xl shadow-md text-tower-cream">
      <h2 className="text-2xl font-bold mb-4 text-tower-yellow">Submit a New Event</h2>
      <SubmitEventForm />
    </div>
  );
};

export default SubmitEvent;
