
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CalendarView from "./CalendarView";
import EventDetail from "./EventDetail";
import SubmitEvent from "./SubmitEvent.jsx";
import AdminConfig from "./AdminConfig";
import DayView from "./DayView";
import { useUser } from "./AuthProvider";
import Login from "./login";
import AdminRoute from "./AdminRoute";
import RequestAccount from "./RequestAccount";



export default function App() {
  const { user } = useUser();
  return (
    
    <div className="app-container bg-[#2B182E] min-h-screen">
<header className="fixed top-0 left-0 w-full z-50 bg-[#216568] text-tower-cream px-6 py-4 flex items-center justify-between shadow-md">
  <div className="flex items-center space-x-4">
    <img src="/logo.png" alt="Fresno Music Calendar Logo" className="h-12" />
    <h1 className="text-2xl font-extrabold tracking-wide">Fresno Music Calendar</h1>
  </div>
<nav className="space-x-4 flex items-center">
  <Link to="/" className="hover:underline hover:text-tower-yellow">Home</Link>
  <Link to="/submit" className="hover:underline hover:text-tower-yellow">Submit Event</Link>
  {!user && (
    <Link
      to="/login"
      className="ml-2 bg-tower-yellow text-black font-semibold px-3 py-1 rounded hover:bg-yellow-300"
    >
      Login
    </Link>
  )}
</nav>

</header>
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<CalendarView />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/submit" element={<SubmitEvent />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminConfig />
            </AdminRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/request-account" element={<RequestAccount />} />
          <Route path="/day/:date" element={<DayView />} />
        </Routes>
      </main>
    </div>
  );
}
