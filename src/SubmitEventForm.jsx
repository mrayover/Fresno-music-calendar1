import React, { useState } from "react";
import { supabase } from "./supabaseClient";

const SubmitEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    genre: "",
    cover: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatDateToISO = (mmddyyyy) => {
    const [month, day, year] = mmddyyyy.split("-");
    return `${year}-${month}-${day}`;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
    const start = `${formData.date}T${formData.startTime}:00`;
    const end = `${formData.date}T${formData.endTime}:00`;

  const newEvent = {
    title: formData.title,
    start,
    end,
    venue: formData.venue,
    genre: formData.genre,
    cover: formData.cover,
    description: formData.description,
    source: "user",
    status: "pending"
  };

  console.log("Submitting event:", newEvent);

  const { error } = await supabase.from("events").insert([newEvent]);

  if (error) {
    console.error("Submission failed:", error.message);
    alert("Oops! Something went wrong submitting your event.");
  } else {
    alert("Your event was submitted and is now awaiting approval. Thank you!");
    window.location.href = "/";
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <input name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <select
  name="startTime"
  value={eventData.startTime}
  onChange={handleEventChange}
  required
>
  <option value="">Select Start Time</option>
  {generateTimeOptions().map((time) => (
    <option key={time.value} value={time.value}>
      {time.label}
    </option>
  ))}
</select>

<select
  name="endTime"
  value={eventData.endTime}
  onChange={handleEventChange}
  required
>
  <option value="">Select End Time</option>
  {generateTimeOptions().map((time) => (
    <option key={time.value} value={time.value}>
      {time.label}
    </option>
  ))}
</select>

      <input name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} required />
      <input name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} />
      <input name="cover" placeholder="Cover Charge" value={formData.cover} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <button type="submit">Submit Event</button>
    </form>
  );
};

export default SubmitEventForm;
