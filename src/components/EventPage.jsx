
import { useParams } from 'react-router-dom';
import { events } from '../eventsData';
import './EventPage.css';

export default function EventPage() {
  const { id } = useParams();
  const event = events.find(e => e.id === id);

  if (!event) return <div style={{ padding: '2rem' }}>Event not found</div>;

  return (
    <div className="event-page">
      <h1>{event.title}</h1>
      <p><strong>Date:</strong> {event.date} at {event.time}</p>
      <p><strong>Venue:</strong> <a href={event.venue.mapLink} target="_blank" rel="noreferrer">{event.venue.name}</a></p>
      <p><strong>Address:</strong> {event.venue.address}</p>
      <p><strong>Genre:</strong> {event.genre}</p>
      <p><strong>Cover Charge:</strong> {event.cover}</p>
      <p>{event.description}</p>
      <div className="event-links">
        <a href={event.ticketsLink} target="_blank" rel="noreferrer">🎟 Get Tickets</a>
        <a href="https://www.addevent.com" target="_blank" rel="noreferrer">📅 Add to Calendar</a>
        <a href={event.source} target="_blank" rel="noreferrer">🔗 Source</a>
      </div>
    </div>
  );
}
