
import { Link } from "react-router-dom";
import { events } from "../eventsData";
import "./Calendar.css";

function getMonthDates() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = Array(firstDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`)
  );
  return dates;
}

export default function Calendar() {
  const dates = getMonthDates();

  return (
    <div className="calendar">
      <h2>June 2025</h2>
      <div className="grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}
        {dates.map((date, i) => (
          <div key={i} className="cell">
            {date && (
              <>
                <div className="date-label">{new Date(date).getDate()}</div>
                {events.filter((e) => e.start && e.start.slice(0, 10) === date).map(e => (
                  <div className="event" key={e.id}>
                    <Link to={`/event/${e.id}`}>{e.title}</Link>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
