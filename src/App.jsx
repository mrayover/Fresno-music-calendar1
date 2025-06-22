
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Calendar from './components/Calendar';
import EventPage from './components/EventPage';
import SubmitEvent from './components/SubmitEvent';
import ReviewDashboard from './components/ReviewDashboard';
import Join from './components/Join';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><LandingPage /><Calendar /></>} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/submit" element={<SubmitEvent />} />
        <Route path="/review" element={<ReviewDashboard />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}
