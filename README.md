# ExploreMyBharat

Premium Indian travel marketplace — discover destinations, holiday packages, hotels, cabs and experiences across India.

**Tagline:** Discover India. Experience More.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Vite, TypeScript, Tailwind CSS, React Router, Framer Motion |
| Backend | Node.js, Express, TypeScript, MongoDB, Mongoose, JWT |
| Security | Helmet, CORS, rate limiting, bcrypt, Zod validation |

## Quick start

### Prerequisites

- Node.js 20+
- MongoDB locally **or** set `USE_MEMORY_DB=true` (default in `.env` for easy local demo)

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API: `http://localhost:5001`

With a real MongoDB instance:

```bash
# in backend/.env
USE_MEMORY_DB=false
MONGODB_URI=mongodb://127.0.0.1:27017/exploremybharat
npm run seed
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App: `http://localhost:5173`

### Seed / demo accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@exploremybharat.com | Admin@123 |
| Customer | traveler@exploremybharat.com | Travel@123 |

## What's included

- Marketplace homepage (hero search, destinations, offers, packages, categories, FAQ, newsletter)
- Packages listing + filters + detail + enquiry modal
- Hotels, cabs, activities
- Flights / trains / bus UI with honest “service unavailable” states
- Auth (JWT), My Trips, admin dashboard
- Blog, destinations, category pages, SEO helpers, robots.txt

## Project structure

```
/frontend   — React marketplace UI
/backend    — REST API + MongoDB
```
