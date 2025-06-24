import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const CalendarView = ({ events }) => {
  const navigate = useNavigate();

  const handleSelectEvent = (event) => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div style={{ height: "calc(100vh - 120px)", margin: "1rem" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        onSelectEvent={handleSelectEvent}
        views={['month', 'week', 'day', 'agenda']}
        defaultView="month"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default CalendarView;
