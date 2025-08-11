import React from "react";
import ResponsiveContainer from "../components/ResponsiveContainer";
import { Link, useNavigate } from "react-router-dom";

// Sundays in October-December and February-April
const months1 = ["October", "November", "December"];
const months2 = ["March", "April", "May"];
const venues = [
  "TBC",
  "TBC",
  "TBC",
  "TBC",
  "TBC",
  "TBC",
  "TBC",
  "TBC",
];

function getSundays(month, year) {
  // Get all Sundays in a month
  const sundays = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    if (date.getDay() === 0) {
      sundays.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }
  return sundays.map(d =>
    d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  );
}

function Schedule() {
  const currentYear = new Date().getFullYear();
  const events = [];

  months1.forEach((month, idx) => {
    const sundays = getSundays(idx + 9, currentYear); // October=9
    events.push(...sundays.map(date => ({ date, venue: venues[idx % venues.length] })));
  });
  months2.forEach((month, idx) => {
    const sundays = getSundays(idx + 2, currentYear + 1); // Feb=1, next calendar year
    events.push(...sundays.map(date => ({ date, venue: venues[(idx + 3) % venues.length] })));
  });

  const navigate = useNavigate();

  const handleBookClick = (date) => {
    navigate(`/booking?date=${encodeURIComponent(date)}`);
  };

  return (
    <ResponsiveContainer>
      <div className="schedule-root">
        <h1 className="club-title">Event Schedule</h1>
        <Link className="back-link" to="/">← Back to Home</Link>
        <div className="schedule-table-wrap">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Date (Sunday)</th>
                <th>Venue</th>
                <th>Book Tickets</th>
              </tr>
            </thead>
            <tbody>
              {events.map(({ date, venue }, i) => (
                <tr key={i}>
                  <td>{date}</td>
                  <td>{venue}</td>
                  <td>
                    <button
                      className="book-btn"
                      onClick={() => handleBookClick(date)}
                    >
                      Book Tickets
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ResponsiveContainer>
  );
}

export default Schedule;