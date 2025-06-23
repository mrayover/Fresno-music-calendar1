import React, { useState } from "react";

export default function SubmitEvent() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    genre: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Event:", formData);
    alert("Thank you! Your event submission has been received.");
  };

  return (
    <div className="submit-event-container">
      <h2>Submit a New Event</h2>
      <form onSubmit={handleSubmit} className="submit-event-form">
        <label>
          Event Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <label>
          Start Time:
          <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
        </label>
        <label>
          End Time:
          <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </label>
        <label>
          Genre:
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <button type="submit">Submit Event</button>
      </form>
    </div>
  );
}