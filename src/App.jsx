
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Calendar from './components/Calendar';
import EventPage from './components/EventPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><LandingPage /><Calendar /></>} />
        <Route path="/event/:id" element={<EventPage />} />
      </Routes>
    </BrowserRouter>
  );
}
