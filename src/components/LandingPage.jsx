export default function LandingPage() {
  return (
    <div className="min-h-screen bg-tower-yellow text-black p-6">
      <h1 className="text-4xl font-bold mb-4 text-tower-purple">Fresno Music Calendar</h1>
      <p className="mb-6 text-lg">All the Gigs. One Grid. Fresno’s Stage, Not the Star.</p>
      <a href="/calendar" className="inline-block bg-tower-red text-white px-4 py-2 rounded hover:bg-red-700 transition">View Events</a>
    </div>
  );
}
