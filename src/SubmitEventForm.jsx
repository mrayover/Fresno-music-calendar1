import React, { useState } from "react";
import { supabase } from "./supabaseClient";

const SubmitEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "13:00",
    endTime: "14:00",
    venue: "",
    genre: "",
    cover: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min of [0, 15, 30, 45]) {
      const h = hour % 24;
      const labelHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
      const suffix = h < 12 || h === 24 ? "AM" : "PM";
      const label = `${labelHour}:${min.toString().padStart(2, "0")} ${suffix}`;
      const value = `${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
      times.push({ label, value });
    }
  }
  return times;
};

const localToISO = (dateStr, timeStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute);
};

const handleSubmit = async (e) => {
  e.preventDefault();
    const start = localToISO(formData.date, formData.startTime);
const end = localToISO(formData.date, formData.endTime);

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
  value={formData.startTime}
  onChange={handleChange}
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
  value={formData.endTime}
  onChange={handleChange}
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
