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
  description: "",
  source: "",
  submittedBy: "",
  contact: "",
  flyer: null
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

  let flyerUrl = "";
if (formData.flyer) {
  const filePath = `public/${Date.now()}-${formData.flyer.name}`;
  const { data, error } = await supabase.storage
    .from("flyers")
    .upload(filePath, formData.flyer, { upsert: true });

  if (error) {
    console.error("Upload error:", error); // <-- log real cause
    alert("Flyer upload failed. Event not submitted.");
    return;
  }

  const { data: publicUrl } = supabase.storage
    .from("flyers")
    .getPublicUrl(filePath);
  flyerUrl = publicUrl.publicUrl;
}


  const newEvent = {
    title: formData.title,
    start,
    end,
    venue: formData.venue,
    genre: formData.genre,
    cover: formData.cover,
    description: formData.description,
    source: formData.source,
    submittedBy: formData.submittedBy,
    contact: formData.contact,
    flyer: flyerUrl,
    status: "pending"
  };

  const { error } = await supabase.from("events").insert([newEvent]);

  if (error) {
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
