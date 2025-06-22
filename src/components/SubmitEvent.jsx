
import { useState } from "react";
import "./SubmitEvent.css";

export default function SubmitEvent() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    address: "",
    genre: "",
    cover: "",
    description: "",
    ticketsLink: "",
    source: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Event:", form);
    setSubmitted(true);
    setForm({
      title: "", date: "", time: "", venue: "", address: "", genre: "",
      cover: "", description: "", ticketsLink: "", source: ""
    });
  };

  return (
    <div className="submit-event">
      <h1>Submit an Event</h1>
      {submitted ? (
        <div className="confirmation">🎉 Event submitted for review!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Event Title" required />
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <input type="time" name="time" value={form.time} onChange={handleChange} required />
          <input type="text" name="venue" value={form.venue} onChange={handleChange} placeholder="Venue Name" required />
          <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Venue Address" required />
          <input type="text" name="genre" value={form.genre} onChange={handleChange} placeholder="Genre(s)" required />
          <input type="text" name="cover" value={form.cover} onChange={handleChange} placeholder="Cover Charge" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short Description" rows="3" />
          <input type="url" name="ticketsLink" value={form.ticketsLink} onChange={handleChange} placeholder="Ticket Link (optional)" />
          <input type="url" name="source" value={form.source} onChange={handleChange} placeholder="Source Link (Instagram, etc.)" />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
