
import React, { useState } from "react";

const SubmitEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    venue: "",
    description: "",
    genre: "",
    cover: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Submitted:", formData);
    alert("Event submitted! (This form is not yet connected to a backend.)");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <label>Title: <input type="text" name="title" value={formData.title} onChange={handleChange} required /></label>
      <label>Start Time: <input type="datetime-local" name="start" value={formData.start} onChange={handleChange} required /></label>
      <label>End Time: <input type="datetime-local" name="end" value={formData.end} onChange={handleChange} required /></label>
      <label>Venue: <input type="text" name="venue" value={formData.venue} onChange={handleChange} required /></label>
      <label>Description: <textarea name="description" value={formData.description} onChange={handleChange} required /></label>
      <label>Genre: <input type="text" name="genre" value={formData.genre} onChange={handleChange} required /></label>
      <label>Cover Charge: <input type="text" name="cover" value={formData.cover} onChange={handleChange} /></label>
      <button type="submit">Submit Event</button>
    </form>
  );
};

export default SubmitEventForm;
