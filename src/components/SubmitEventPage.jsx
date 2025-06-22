import { useState } from 'react';

export default function SubmitEventPage() {
  const [form, setForm] = useState({
    name: '', venue: '', time: '', cover: '', genre: '', description: '', source: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your event was submitted for review!');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-tower-purple text-center">Submit Your Music Event</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Event Name" required className="border rounded p-2" />
        <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue Name" required className="border rounded p-2" />
        <input name="time" value={form.time} onChange={handleChange} type="datetime-local" required className="border rounded p-2" />
        <input name="cover" value={form.cover} onChange={handleChange} placeholder="Cover Charge" className="border rounded p-2" />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" required className="border rounded p-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short Description" required className="border rounded p-2"></textarea>
        <input name="source" value={form.source} onChange={handleChange} placeholder="Event Source (optional)" className="border rounded p-2" />
        <button type="submit" className="bg-tower-red text-white py-2 px-4 rounded hover:bg-red-700 transition">Submit for Review</button>
      </form>
    </div>
  );
}
