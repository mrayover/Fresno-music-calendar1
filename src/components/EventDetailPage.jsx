import { useParams } from 'react-router-dom';

const eventData = {
  1: {
    name: 'Tower Jazz Night',
    venue: "Lucy's Lounge",
    time: '2025-07-05T20:00:00',
    cover: '$10',
    genre: 'Jazz',
    description: 'Live jazz in the heart of Tower.',
    source: 'https://instagram.com/lucysloungefresno'
  }
};

export default function EventDetailPage() {
  const { id } = useParams();
  const event = eventData[id];

  if (!event) return <div className="p-6 text-center">Event not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-tower-purple mb-2">{event.name}</h2>
      <p className="text-lg mb-1"><strong>Venue:</strong> {event.venue}</p>
      <p className="text-lg mb-1"><strong>Time:</strong> {new Date(event.time).toLocaleString()}</p>
      <p className="text-lg mb-1"><strong>Cover:</strong> {event.cover}</p>
      <p className="text-lg mb-1"><strong>Genre:</strong> {event.genre}</p>
      <p className="mt-4 text-md">{event.description}</p>
      <a href={event.source} className="text-blue-600 underline text-sm mt-2 block" target="_blank" rel="noopener noreferrer">Event Source</a>
    </div>
  );
}
