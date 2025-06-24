
import React from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import events from "./eventsData";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const allViews = ['month', 'week', 'day', 'agenda'];

function CalendarView() {
  const navigate = useNavigate();

  const handleSelectEvent = (event) => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        onSelectEvent={handleSelectEvent}
        views={allViews}
        defaultView="month"
      />
    </div>
  );
}

export default CalendarView;
