// EventForm.jsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const inputClass =
  "bg-white/10 text-tower-cream placeholder-gray-400 p-2 rounded-md border border-tower-teal focus:outline-none focus:ring-2 focus:ring-tower-pink appearance-none";

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
const isAfterOrEqual = (a, b) => {
  const [ah, am] = a.split(":").map(Number);
  const [bh, bm] = b.split(":").map(Number);
  return ah > bh || (ah === bh && am >= bm);
};

const EventForm = ({ data, setData, onSubmit, mode = "public", editingId = null, cancelEdit = null }) => {
  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "startTime") {
    setData((prev) => {
      const [hour, minute] = value.split(":").map(Number);
      const prevStart = prev.startTime || "18:00";
      const [prevHour, prevMinute] = prevStart.split(":").map(Number);
      const expectedPrevEnd = `${(prevHour + 1) % 24}`.padStart(2, "0") + `:${prevMinute.toString().padStart(2, "0")}`;

      const shouldUpdate =
        prev.endTime === "" ||
        prev.endTime === prev.startTime ||
        prev.endTime === expectedPrevEnd;

      const newHour = (hour + 1) % 24;
      const adjustedEnd = `${newHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

      return {
        ...prev,
        startTime: value,
        endTime: shouldUpdate ? adjustedEnd : prev.endTime
      };
    });
  } else {
    if (name === "endTime" && data.startTime && !isAfterOrEqual(value, data.startTime)) {
        alert("End time cannot be before start time.");
        return;
      }
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
};
  return (
    <>
      {mode === "admin" && editingId && (
  <div className="mb-4 text-tower-yellow bg-tower-black p-2 rounded-md shadow-sm">
    <strong>Editing Event ID: {editingId}</strong>
    <button onClick={cancelEdit} className="ml-4 text-tower-teal underline hover:text-tower-yellow">Cancel Edit</button>
  </div>
)}

      <form
  onSubmit={onSubmit}
  className="flex flex-col gap-4 max-w-xl bg-black/50 p-6 rounded-lg shadow-md text-tower-cream"
        >
                <input
  name="title"
  placeholder="Title"
  value={data.title}
  onChange={handleChange}
  required
  className={inputClass}
/>

<DatePicker
  selected={data.date ? new Date(data.date) : null}
  onChange={(date) =>
    setData((prev) => ({
      ...prev,
      date: date.toISOString().slice(0, 10)
    }))
  }
  placeholderText="Select a date"
  dateFormat="yyyy-MM-dd"
  className="bg-white text-black p-2 rounded-md border border-tower-teal focus:outline-none focus:ring-2 focus:ring-tower-pink w-full"
/>

<select
  name="startTime"
  value={data.startTime}
  onChange={handleChange}
  required
  className="bg-white text-black p-2 rounded-md border border-tower-teal focus:outline-none focus:ring-2 focus:ring-tower-pink w-full"
>
  <option value="">Select Start Time</option>
{generateTimeOptions().map((time) => (
  <option key={time.value} value={time.value}>{time.label}</option>
))}

</select>
<select
  name="endTime"
  value={data.endTime}
  onChange={handleChange}
  required
className="bg-white text-black p-2 rounded-md border border-tower-teal focus:outline-none focus:ring-2 focus:ring-tower-pink w-full"
>
  <option value="">Select End Time</option>
  {generateTimeOptions().map((time) => (
    <option key={time.value} value={time.value}>{time.label}</option>
  ))}
  
</select>



        <input name="venue" placeholder="Venue" value={data.venue} onChange={handleChange} required className={inputClass}/>
        <input name="genre" placeholder="Genre" value={data.genre} onChange={handleChange} className={inputClass}/>
        <input name="cover" placeholder="Cover Charge" value={data.cover} onChange={handleChange} className={inputClass}/>
        <textarea
  name="description"
  placeholder="Description"
  value={data.description}
  onChange={handleChange}
  required
  className={inputClass}
/>
<input
  name="source"
  placeholder="Source Link (optional)"
  value={data.source || ""}
  onChange={handleChange}
  className={inputClass}
/>
<input
  name="submittedBy"
  placeholder="Submitted By (your name or org)"
  value={data.submittedBy || ""}
  onChange={handleChange}
  className={inputClass}
/>

<input
  name="contact"
  placeholder="Contact Info (optional)"
  value={data.contact || ""}
  onChange={handleChange}
  className={inputClass}
/>

<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setData((prev) => ({
      ...prev,
      flyer: e.target.files?.[0] || null
    }))
  }
  className="text-tower-cream"
/>

<button
  type="submit"
  className="bg-tower-pink hover:bg-tower-yellow text-black font-semibold py-2 px-4 rounded-md transition-colors duration-200"
>
  {editingId ? "Update Event" : mode === "admin" ? "Add Event to Calendar" : "Submit Event"}
</button>
      </form>
    </>
  );
};

export default EventForm;
