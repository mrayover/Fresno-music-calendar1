import React, { useState } from "react";

export default function WeekCalendar({
  title,
  events = [],
  onEdit,
  onPrimaryAction,
  onSecondaryAction,
  labelPrimary = "Primary",
  labelSecondary = "Secondary",
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

  const handlePrevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const handleDateChange = (e) => setCurrentDate(new Date(e.target.value));

  const weekStart = startOfWeek(currentDate);
  const weekDates = Array.from({ length: 7 }, (_, i) =>
    addDays(weekStart, i)
  );

  const filteredEvents = events.filter((event) => {
    const date = new Date(event.start);
    return date >= weekStart && date < addDays(weekStart, 7);
  });

  const eventsByDay = weekDates.map((date) => {
    const dayStr = date.toISOString().slice(0, 10);
    return filteredEvents
      .filter((event) => event.start.slice(0, 10) === dayStr)
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  });

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handlePrevWeek}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
        >
          ← Prev
        </button>
        <span className="text-sm">
          Week of <strong>{weekStart.toISOString().slice(0, 10)}</strong>
        </span>
        <button
          onClick={handleNextWeek}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
        >
          Next →
        </button>
        <input
          type="date"
          onChange={handleDateChange}
          value={currentDate.toISOString().slice(0, 10)}
          className="ml-4 px-2 py-1 border rounded"
        />
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, i) => (
          <div
            key={i}
            className="border border-gray-300 rounded-md p-2 bg-white shadow-sm"
          >
            <div className="text-sm font-semibold mb-2 text-gray-700">
              {date.toDateString().slice(0, 10)}
            </div>

            <div className="flex flex-col gap-2">
              {eventsByDay[i].map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-400 bg-gray-50 p-2 rounded text-xs shadow-sm"
                >
                  <div className="font-semibold">{event.title}</div>
                  <div className="text-gray-600">
                    {event.start.slice(11, 16)} – {event.end.slice(11, 16)}
                    <br />
                    {event.venue} | {event.genre}
                    <br />
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
                    {onPrimaryAction && labelPrimary && (
                      <button
                        onClick={() => onPrimaryAction(event)}
                        className="bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded"
                      >
                        {labelPrimary}
                      </button>
                    )}
                    {onSecondaryAction && labelSecondary && (
                      <button
                        onClick={() => onSecondaryAction(event)}
                        className="bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded"
                      >
                        {labelSecondary}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
