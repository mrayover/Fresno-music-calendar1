import React, { useState } from "react";

export default function UnifiedWeekView({
  pendingEvents = [],
  approvedEvents = [],
  archivedEvents = [],
  onEdit,
  approveEvent,
  rejectEvent,
  archiveEvent,
  deleteEvent,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfWeek = (date) => {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const addDays = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const weekStart = startOfWeek(currentDate);
  const weekDates = Array.from({ length: 7 }, (_, i) =>
    addDays(weekStart, i)
  );

  const handlePrevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const handleDateChange = (e) => setCurrentDate(new Date(e.target.value));

  const getEventsForSection = (events, bgColor) =>
    weekDates.map((date, i) => {
      const dayStr = date.toISOString().slice(0, 10);
      const dayEvents = events
        .filter((e) => e.start.slice(0, 10) === dayStr)
        .sort((a, b) => new Date(a.start) - new Date(b.start));

      return (
        <div key={i} className="border p-2 rounded bg-white">
          <div className="text-sm font-semibold mb-2">
            {date.toDateString().slice(0, 10)}
          </div>
          <div className="flex flex-col gap-2">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className={`border p-2 rounded text-xs shadow-sm ${bgColor}`}
              >
                <div className="font-bold text-black">{event.title}</div>
                <div className="text-gray-700">
                  {event.start.slice(11, 16)} – {event.end.slice(11, 16)} <br />
                  {event.venue} | {event.genre} <br />
                  {parseFloat(event.cover) > 0
                    ? `$${parseFloat(event.cover).toFixed(2)}`
                    : "Free"}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    onClick={() => onEdit(event)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  {bgColor === "bg-yellow-100" && (
                    <>
                      <button
                        onClick={() => approveEvent(event)}
                        className="bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectEvent(event.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {bgColor === "bg-rose-200" && (
                    <>
                      <button
                        onClick={() => archiveEvent(event)}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded"
                      >
                        Archive
                      </button>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {bgColor === "bg-gray-200" && (
                    <>
                      <button
                        onClick={() => archiveEvent(event)}
                        className="bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });

  return (
    <div className="mb-12">

<div className="flex items-center gap-4 mb-6 bg-[#2B182E] sticky top-16 z-40 py-2">
  <button
    onClick={handlePrevWeek}
    className="bg-gray-200 hover:bg-gray-300 text-black px-3 py-1 rounded"
  >
    ← Prev
  </button>
  <span className="text-sm text-white">
    Week of <strong>{weekStart.toISOString().slice(0, 10)}</strong>
  </span>
  <button
    onClick={handleNextWeek}
    className="bg-gray-200 hover:bg-gray-300 text-black px-3 py-1 rounded"
  >
    Next →
  </button>
  <input
    type="date"
    onChange={handleDateChange}
    value={currentDate.toISOString().slice(0, 10)}
    className="ml-4 px-2 py-1 border rounded text-black"
  />
</div>

      {/* PENDING SECTION */}
      <h2 className="text-lg font-bold mb-2">Pending Events</h2>
      <div className="grid grid-cols-7 gap-2 mb-8">
        {getEventsForSection(pendingEvents, "bg-yellow-100")}
      </div>

      {/* APPROVED SECTION */}
      <h2 className="text-lg font-bold mb-2">Approved Events</h2>
      <div className="grid grid-cols-7 gap-2 mb-8">
        {getEventsForSection(approvedEvents, "bg-rose-200")}
      </div>

      {/* ARCHIVED SECTION */}
      <h2 className="text-lg font-bold mb-2 text-gray-600">Archived Events</h2>
      <div className="grid grid-cols-7 gap-2 mb-8">
        {getEventsForSection(archivedEvents, "bg-gray-200")}
      </div>
    </div>
  );
}
