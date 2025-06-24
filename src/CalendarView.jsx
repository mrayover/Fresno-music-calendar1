import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import eventsData from "./eventsData";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarView() {
  const navigate = useNavigate();

  const handleSelectEvent = (event) => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Calendar
        localizer={localizer}
        events={eventsData}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}
