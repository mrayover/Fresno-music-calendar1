
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarView({ events, onSelectEvent }) {
  const handleSelectEvent = (event) => {
    onSelectEvent(event);
  };

  return (
    <div style={{ height: "calc(100vh - 100px)" }}>
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
}

export default CalendarView;
