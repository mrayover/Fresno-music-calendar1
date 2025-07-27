import React, { useState } from "react";

/*
 * This updated UnifiedWeekView component ensures that all event date/time
 * calculations are performed using local Fresno/Pacific time rather than
 * interpreting ISO strings as UTC.  Events in Supabase are stored in a
 * pseudo‑UTC ISO format (e.g. "2025-07-27T18:00:00.000Z") created by
 * subtracting the timezone offset before calling toISOString().  When
 * reading those strings back we ignore the trailing "Z" and build a
 * Date from the date and time components directly.  The helper below
 * handles both string and Date inputs.
 */
function parseLocalDateTime(datetimeStr) {
  if (datetimeStr instanceof Date) return datetimeStr;
  if (!datetimeStr) return new Date(NaN);
  const [datePart, timePart = "00:00"] = datetimeStr.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":" ).map(Number);
  return new Date(year, month - 1, day, hour, minute);
}

export default function UnifiedWeekView({
  pendingEvents = [],
  approvedEvents = [],
  archivedEvents = [],
  onEdit,
  approveEvent,
  rejectEvent,
  archiveEvent,
  deleteEvent,
  genres = [],
  setGenres = () => {}
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
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handlePrevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const handleDateChange = (e) => setCurrentDate(new Date(e.target.value));

  const toLocalYMD = (d) => {
    const dateObj = parseLocalDateTime(d);
    return dateObj.toLocaleDateString("en-CA");
  };

  const getEventsForSection = (events, bgColor) =>
    weekDates.map((date, i) => {
      const dayStr = toLocalYMD(date);
      const dayEvents = events
        .filter((e) => toLocalYMD(e.start) === dayStr)
        .sort((a, b) => parseLocalDateTime(a.start) - parseLocalDateTime(b.start));
      return (
        <div key={i} className="border p-2 rounded bg-white w-[120px] min-w-[120px] flex-shrink-0">
          <div className="text-sm font-semibold mb-2">{toLocalYMD(date)}</div>
          <div className="flex flex-col gap-2">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className={`border p-3 rounded text-sm sm:text-xs shadow-sm ${bgColor}`}
              >
                <div className="font-bold text-black">{event.title}</div>
                <div className="text-gray-700">
                  {parseLocalDateTime(event.start).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} – {parseLocalDateTime(event.end).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} <br />
                  {event.venue} | <strong>{event.genre}</strong>
                  {!genres.includes(event.genre) && (
                    <>
                      <span className="ml-2 text-red-500 font-semibold">(Unapproved)</span>
                      <button
                        onClick={() => {
                          const updated = [...new Set([...genres, event.genre])];
                          setGenres(updated);
                          localStorage.setItem("customGenres", JSON.stringify(updated));
                          alert(`Genre "${event.genre}" added to your approved list.`);
                        }}
                        className="ml-2 bg-tower-yellow text-black text-xs px-3 py-2 text-sm rounded"
                      >
                        Approve Genre
                      </button>
                    </>
                  )}
                  <br />
                  {parseFloat(event.cover) > 0 ? `$${parseFloat(event.cover).toFixed(2)}` : "Free"}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    onClick={() => onEdit(event)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 text-sm rounded"
                  >
                    Edit
                  </button>
                  {bgColor === "bg-yellow-100" && (
                    <>
                      <button
                        onClick={() => approveEvent(event)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 text-sm rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectEvent(event.id)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 text-sm rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {bgColor === "bg-rose-200" && (
                    <>
                      <button
                        onClick={() => archiveEvent(event)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 text-sm rounded"
                      >
                        Archive
                      </button>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 text-sm rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {bgColor === "bg-gray-200" && (
                    <>
                      <button
                        onClick={() => archiveEvent(event)}
                        className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 text-sm rounded"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 text-sm rounded"
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
<div className="bg-[#2B182E] sticky top-[120px] z-40 py-2">
  <div className="flex items-center gap-4 px-4">
    <button onClick={handlePrevWeek} className="bg-gray-200 hover:bg-gray-300 text-black px-3 py-1 rounded">← Prev</button>
    <span className="text-sm text-white">Week of <strong>{toLocalYMD(weekStart)}</strong></span>
    <button onClick={handleNextWeek} className="bg-gray-200 hover:bg-gray-300 text-black px-3 py-1 rounded">Next →</button>
    <input type="date" onChange={handleDateChange} value={toLocalYMD(currentDate)} className="ml-4 px-2 py-1 border rounded text-black" />
  </div>
  <div className="flex justify-between text-xs text-white mt-2 px-4">
    {Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(weekStart);
      day.setDate(day.getDate() + i);
      return (
<div key={i} className="w-[120px] min-w-[120px] text-center flex-shrink-0">
          <div className="font-bold">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
          <div>{day.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" })}</div>
        </div>
      );
    })}
  </div>
</div>


    <div className="mt-6 px-4">
      <h2 className="text-lg font-bold text-white mb-2">Pending Events</h2>
      <div className="overflow-x-auto mb-8">
        <div className="flex gap-2 w-fit">{getEventsForSection(pendingEvents, "bg-yellow-100")}</div>
      </div>

      <h2 className="text-lg font-bold text-white mb-2">Approved Events</h2>
      <div className="overflow-x-auto mb-8">
        <div className="flex gap-2 w-fit">{getEventsForSection(approvedEvents, "bg-rose-200")}</div>
      </div>

      <h2 className="text-lg font-bold text-white mb-2">Archived Events</h2>
      <div className="overflow-x-auto mb-8">
        <div className="flex gap-2 w-fit">{getEventsForSection(archivedEvents, "bg-gray-200")}</div>
      </div>
    </div>
  </div>
);
}