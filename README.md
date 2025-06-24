
# Fresno Music Calendar – Project Structure & Conventions

This file documents the structure, naming conventions, and key components used in the Fresno Music Calendar React project. It ensures consistent architecture and prevents errors during development or deployment.

---

## ✅ Folder & File Structure

```
/public
  └── logo.png

/src
  ├── App.jsx
  ├── main.jsx
  ├── CalendarView.jsx
  ├── EventDetail.jsx
  ├── SubmitEvent.jsx
  ├── SubmitEventForm.jsx
  ├── AddToCalendarButton.jsx
  ├── eventsData.jsx
  ├── FilterPanel.jsx
  └── style.css
```

---

## ✅ Import Path Conventions

- All asset imports (e.g. images) must use the `/public` directory:
  ```jsx
  <img src="/logo.png" alt="Fresno Music Calendar Logo" />
  ```

- Component and data imports should use relative paths:
  ```jsx
  import CalendarView from "./CalendarView";
  import eventsData from "./eventsData.jsx";
  ```

---

## ✅ Core Functionality (as of Phase 1)

- ✅ Calendar grid with correct date rendering
- ✅ Live event display on the appropriate calendar day
- ✅ Event detail view via click & route (`/event/:id`)
- ✅ “Add to Calendar” button
- ✅ FilterPanel placeholder
- ✅ Submit event functionality (basic form)
- ✅ Tower District-inspired styling (partial)
- ✅ Logo placement in top-left
- ⏳ Genre-based color highlights for events
- ⏳ Styling refinements and polish
- ⏳ Moderation and live sync (future phases)

---

## ✅ Notes

- Be cautious with `App.jsx` edits — verify existing imports, component structure, and preserve all current functionality.
- For styling: global styles reside in `style.css`.
- All route-based components are wired in `main.jsx` using React Router.

---

*Last updated: Automatically maintained by ChatGPT (Project Manager AI).*
