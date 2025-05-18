## ✅ `backend/README.md`

# 🧼 CLEAN API — Backend
> A RESTful API backend for an online home and office cleaning booking system.

## 🔧 Description
This backend server:
- Manages bookings and schedules
- Stores cleaner profiles and services
- Provides data to the frontend via REST API
- Uses PostgreSQL for persistent storage

## 🚀 Tech Stack

- **Node.js + Express** — RESTful server
- **PostgreSQL** — database
- **Prisma ORM** — data modeling and migrations
- **dotenv** — config management
- **faker** — generate sample/mock data

## Structure
backend/
├── src/
├ 
├ ├── lib/ 
├ ├	├─prisma.ts # Initializes and exports a singleton instance of the Prisma Client, enabling database access throughout the backend.
├ ├
├ ├── routes/ # Organize all available HTTP routes (routes), group them logically and pass control to the appropriate handlers.
├ ├	├─clinnerRoutes.ts # Defines API routes for managing cleaners (clinners) and retrieving them by cleaning type.
├ ├── services/ #  contains business logic modules that handle core application functionality, independent of HTTP routes or controller logic.
├ ├	├──clinnerService.ts #  This file contains business logic for working with clinner data, including generating and retrieving cleaners based on cleaning type.
├ ├── utils/  # This folder contains utility modules and shared types used across the backend to ensure type safety, readability, and reusability.
├	├──types.ts # Defines reusable TypeScript types and constants for cleaning service types.


## ⚙️ Scripts
npm install               # Install dependencies
npx prisma generate       # Generate Prisma client
npx prisma migrate dev    # Run database migrations
npm run dev               # Start dev server with ts-node-dev

🌍 Deployment
Backend is deployed at: Render.com
https://backend-ob1m.onrender.com/

👤 Author
Crafted by Illia Andrienko