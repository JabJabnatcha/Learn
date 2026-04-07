# DnD Character Manager Frontend

This is a Vue 3 + Vuetify 3 frontend for the `DnDGame2.0` backend.

## Setup

1. Open a terminal in `DnDGame2.0/frontend`.
2. Run `npm install`.
3. Start the backend API:
   - Use `dotnet run` in the `DnDGame2.0` folder, or start the `Backend` profile from Visual Studio.
4. Start the frontend:
   - `npm run dev`

## Notes

- The frontend proxies `/api` requests to `https://localhost:7044`.
- The API endpoints used are:
  - `GET /api/character` to fetch all characters
  - `POST /api/character` to create a character

## Files

- `src/App.vue` — main page layout
- `src/components/CharacterList.vue` — table of saved characters
- `src/components/CharacterForm.vue` — form for creating a new character
- `src/services/api.js` — API helper for calling the backend
