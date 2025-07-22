
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CalendarView from "./CalendarView";
import EventDetail from "./EventDetail";
import SubmitEvent from "./SubmitEvent.jsx";
import AdminConfig from "./AdminConfig";
import DayView from "./DayView";
import Login from "./login";
import AdminRoute from "./AdminRoute";





export default function App() {

  return (
    
    <div className="app-container bg-[#2B182E] min-h-screen">
<header className="fixed top-0 left-0 w-full z-50 bg-[#216568] text-tower-cream px-6 py-4 shadow-md">
  <div className="flex justify-between items-center w-full">
    <div className="flex items-center space-x-4 min-w-0">
      <img src="/logo.png" alt="Fresno Music Calendar Logo" className="h-12 shrink-0" />
      <h1 className="text-2xl font-extrabold tracking-wide truncate">Fresno Music Calendar</h1>
    </div>
    <nav className="flex items-center space-x-4 whitespace-nowrap">
      <Link to="/" className="hover:underline hover:text-tower-yellow">Home</Link>
      <Link to="/submit" className="hover:underline hover:text-tower-yellow">Submit Event</Link>
{/* Login removed for public-facing version */}


    </nav>
  </div>
</header>

      <main className="pt-24">
        <Routes>
          <Route path="/" element={<CalendarView />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/submit" element={<SubmitEvent />} />
          
<Route path="/admin" element={
  <AuthProvider>
    <AdminRoute>
      <AdminConfig />
    </AdminRoute>
  </AuthProvider>
} />
          <Route path="/login" element={<Login />} />
          <Route path="/day/:date" element={<DayView />} />
        </Routes>
        <div className="hidden">
        <span className="bg-tower-yellow hover:bg-yellow-300 text-black font-semibold px-3 py-1 rounded"></span>
      </div>
      </main>
    </div>
  );
}
