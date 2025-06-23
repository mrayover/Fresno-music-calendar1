import React, { useState } from "react";

const SubmitEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    genre: "",
    location: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Event submitted for review (not yet live).");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" onChange={handleChange} placeholder="Event Title" />
      <input name="start" onChange={handleChange} type="datetime-local" />
      <input name="end" onChange={handleChange} type="datetime-local" />
      <input name="genre" onChange={handleChange} placeholder="Genre" />
      <input name="location" onChange={handleChange} placeholder="Location" />
      <textarea name="description" onChange={handleChange} placeholder="Description" />
      <button type="submit">Submit Event</button>
    </form>
  );
};

export default SubmitEventForm;
