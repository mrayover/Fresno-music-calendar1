import { useState } from 'react';

const sampleEvents = [
  {
    id: 1,
    name: 'Tower Jazz Night',
    venue: "Lucy's Lounge",
    time: '2025-07-05T20:00:00',
    cover: '$10',
    genre: 'Jazz',
    description: 'Live jazz in the heart of Tower.',
    source: 'https://instagram.com/lucysloungefresno'
  }
];

export default function CalendarPage() {
  const [events] = useState(sampleEvents);

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold mb-4 text-tower-purple">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(event => (
          <div key={event.id} className="border p-4 rounded-xl shadow bg-tower-yellow text-black">
            <h3 className="text-xl font-bold mb-1">{event.name}</h3>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Time:</strong> {new Date(event.time).toLocaleString()}</p>
            <p><strong>Cover:</strong> {event.cover}</p>
            <p><strong>Genre:</strong> {event.genre}</p>
            <p className="mt-2 text-sm">{event.description}</p>
            <a href={event.source} className="text-blue-600 underline text-sm mt-2 block" target="_blank" rel="noopener noreferrer">Event Source</a>
          </div>
        ))}
      </div>
    </div>
  );
}
