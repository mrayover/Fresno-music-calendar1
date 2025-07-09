import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import EventForm from "./components/EventForm";

const SubmitEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "18:00",
    endTime: "19:00",
    venue: "",
    genre: "",
    cover: "",
    description: ""
  });

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
    <EventForm
      mode="public"
      data={formData}
      setData={setFormData}
      onSubmit={handleSubmit}
    />
  );
};

export default SubmitEventForm;
