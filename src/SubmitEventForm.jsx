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
  email: "",
  flyer: null
  
});

const localToISO = (dateStr, timeStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  const localDate = new Date(year, month - 1, day, hour, minute);
  const tzOffset = localDate.getTimezoneOffset() * 60000;
  return new Date(localDate.getTime() - tzOffset).toISOString();
};


const handleSubmit = async (e) => {
  e.preventDefault();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!formData.email || !emailRegex.test(formData.email)) {
  alert("Please enter a valid email address.");
  return;
}
  // Step 1: Rate limit check (3 submissions max in 7 days)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneWeekAgoISO = oneWeekAgo.toISOString();

  const { data: emailMatchedEvents, error: fetchError } = await supabase
  .from("events")
  .select("id, created_at")
  .eq("email", formData.email);

if (fetchError) {
  alert("Unable to verify submission limit. Please try again later.");
  return;
}

const eventsInWindow = emailMatchedEvents.filter(e => e.created_at >= oneWeekAgoISO);

if (eventsInWindow.length >= 3) {
  alert("You've reached the maximum of 3 submissions this week. Please request an account to submit more.");
  return;
}

proceedToSubmitEvent();
};


const proceedToSubmitEvent = async () => {
  const start = localToISO(formData.date, formData.startTime);
  const end = localToISO(formData.date, formData.endTime);

  let flyerUrl = "";
  if (formData.flyer) {
    const filePath = `public/${Date.now()}-${formData.flyer.name}`;
    const { data, error } = await supabase.storage
      .from("flyers")
      .upload(filePath, formData.flyer, { upsert: true });

    if (error) {
      console.error("Upload error:", error);
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
    submittedBy: "anon",
    email: formData.email,
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
