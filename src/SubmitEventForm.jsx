
import React, { useState } from "react";

export default function SubmitEventForm() {
  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    time: "",
    genre: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submission received! (Feature under construction)");
    // Here you’d typically send the data to a backend or queue for moderation
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Submit an Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Venue:
          <input type="text" name="venue" value={formData.venue} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Time:
          <input type="text" name="time" value={formData.time} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Genre:
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Submit Event</button>
      </form>
    </div>
  );
}
