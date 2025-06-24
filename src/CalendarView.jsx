
import React, { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "./eventsData";

const localizer = momentLocalizer(moment);

const CalendarView = ({ onSelectEvent }) => {
  const [view, setView] = useState(Views.MONTH);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="calendar-container">
      <div className="view-selector">
        {Object.values(Views).map((v) => (
          <button
            key={v}
            className={view === v ? "active" : ""}
            onClick={() => handleViewChange(v)}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}
        views={["month", "week", "day", "agenda"]}
        view={view}
        onView={handleViewChange}
        onSelectEvent={onSelectEvent}
      />
    </div>
  );
};

export default CalendarView;
