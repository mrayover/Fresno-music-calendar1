
import React from 'react';
import { useNavigate } from 'react-router-dom';
import eventsData from './eventsData';

const CalendarView = () => {
  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Month View</h2>
      <div className="calendar-grid">
        {eventsData.map((event) => (
          <div
            key={event.id}
            className={`calendar-event ${event.genre.toLowerCase()}`}
            onClick={() => handleEventClick(event.id)}
          >
            <h3>{event.title}</h3>
            <p>{event.venue}</p>
            <p>{event.date} @ {event.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
