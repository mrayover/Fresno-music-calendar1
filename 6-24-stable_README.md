
# ✅ Updated Project Structure — Fresno Music Calendar

```
project-root/
├── public/
│   └── logo.png               # Static image referenced with src="/logo.png"
│
├── src/
│   ├── App.jsx                # Top-level routing layout and nav bar
│   ├── main.jsx               # React root (entry point)
│   ├── CalendarView.jsx       # Main calendar with event display and click-to-detail
│   ├── EventDetail.jsx        # Routed detail page for individual events
│   ├── eventsData.jsx         # Current event array with genre, cover, time
│   ├── FilterPanel.jsx        # Sidebar genre filters (upcoming feature)
│   ├── SubmitEvent.jsx        # Routed wrapper for form page
│   ├── SubmitEventForm.jsx    # Working form (MM-DD-YYYY + start/end time)
│   ├── AddToCalendarButton.jsx# Renders calendar button on event pages
│   └── style.css              # Global styles (margins, layout, responsive)
```

## 🗂️ Component Purpose (Confirmed Working)

| File | Purpose |
|------|---------|
| `App.jsx` | Routes calendar, event details, and submission. Nav links functional. |
| `main.jsx` | ReactDOM entry — uses `BrowserRouter` properly. |
| `CalendarView.jsx` | Displays react-big-calendar in Month/Day view. Clickable events. |
| `EventDetail.jsx` | Shows single event info, styled, with back button and calendar link. |
| `SubmitEvent.jsx` | Header wrapper for event form + back button. Routed from `/submit`. |
| `SubmitEventForm.jsx` | Fully working controlled form. Fields: title, date, time, genre, venue, cover, description. |
| `eventsData.jsx` | Current format includes: id, title, start, end, venue, description, genre, cover. |
| `AddToCalendarButton.jsx` | Converts event details into Google Calendar link. |
| `FilterPanel.jsx` | Placeholder for genre filters (future refinement). |
| `style.css` | Establishes site margin, responsive grid, layout spacing. |

## 💡 Key Notes & Conventions

- Images go in `public/` and are referenced as `/logo.png` in JSX.
- Component filenames use `PascalCase` and `.jsx` extension.
- Events use `start` and `end` in ISO string format for react-big-calendar.
- Dates in the form are entered as `MM-DD-YYYY` then parsed.
- All routing uses **React Router v6**, confirmed wired in `main.jsx`.

## 🔒 Stable Baseline Confirmed

This build has been verified to support:
- ✅ Month/Day calendar view
- ✅ Event click → detail page
- ✅ Add to Calendar button
- ✅ Submit event form (with alert preview)
- ✅ Working navigation
- ✅ Visual layout with spacing
- ✅ Proper file structure

---

**Last updated: 2025-06-25**
