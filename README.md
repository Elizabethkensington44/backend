# Dance Studio API

Express + PostgreSQL backend for the Dance Studio capstone app.

## Setup

1. Install dependencies: `npm install`
2. Create a PostgreSQL database named `dancer`.
3. Create a `.env` file with:
   ```
   PORT=3000
   DATABASE_URL=postgres://user:password@localhost:5432/dancer
   JWT_SECRET=your-secret
   ```
4. Create the tables and seed sample data: `npm run db:reset`. This drops and
   recreates the tables first, so it is safe to run repeatedly.
5. Start the server: `npm run dev`

## Routes

| Method | Route | Description |
| --- | --- | --- |
| POST | `/users/register` | Create a user and return a token |
| POST | `/users/login` | Log in and return a token |
| GET | `/classes` | List all classes |
| GET | `/classes/:id` | Get one class |
| GET | `/classes/:id/reservations` | List reservations for a class (auth) |
| POST | `/classes/:id/reservations` | Reserve a class for the current user (auth) |
| GET | `/teachers` | List all teachers |
| GET | `/teachers/:id` | Get one teacher |
| GET | `/reservations` | List the current user's reservations (auth) |
| DELETE | `/reservations/:id` | Delete one of the current user's reservations (auth) |

Authenticated routes expect an `Authorization: Bearer <token>` header.
