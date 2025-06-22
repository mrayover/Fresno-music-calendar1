import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CalendarPage from './components/CalendarPage';
import SubmitEventPage from './components/SubmitEventPage';
import EventDetailPage from './components/EventDetailPage';
import AboutPage from './components/AboutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/submit" element={<SubmitEventPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
