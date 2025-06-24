import React, { useState } from "react";

const SubmitEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    description: "",
    genre: "",
    cover: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatDateToISO = (mmddyyyy) => {
    const [month, day, year] = mmddyyyy.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isoDate = formatDateToISO(formData.date);
    const start = `${isoDate}T${formData.startTime}:00`;
    const end = `${isoDate}T${formData.endTime}:00`;

    const event = {
      ...formData,
      start,
      end
    };

    delete event.date;
    delete event.startTime;
    delete event.endTime;

    alert("Submitted:\n" + JSON.stringify(event, null, 2));
  };

  return (
  <>
    <h2 style={{ textAlign: "center" }}>Form is Rendering</h2>

    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#f8f8f8", // temp styling
        border: "1px solid red",     // temp styling
        padding: "2rem"
      }}
    >
      <input name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
      <input name="date" placeholder="MM-DD-YYYY" value={formData.date} onChange={handleChange} required />
      <input name="startTime" type="time" value={formData.startTime} onChange={handleChange} required />
      <input name="endTime" type="time" value={formData.endTime} onChange={handleChange} required />
      <input name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} required />
      <input name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} />
      <input name="cover" placeholder="Cover Charge" value={formData.cover} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <button type="submit">Submit Event</button>
    </form>
  </>
);

};

export default SubmitEventForm;
