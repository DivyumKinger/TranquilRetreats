# Tranquil Retreats - Hotel Booking Web Application

Tranquil Retreats is a full-stack Node.js web application for a luxury hillside hotel, featuring user authentication, room booking, and a modern, responsive UI. The project uses Express.js, EJS, MongoDB (via Mongoose), and a variety of security and utility middleware.

## Features

- **User Registration & Login**: Secure user registration and login with session management.
- **MongoDB Integration**: User data is stored in MongoDB using Mongoose.
- **Room Booking**: Users can browse rooms, view amenities, and book their stay.
- **Admin Dashboard**: (UI only) for managing bookings, rooms, and guests.
- **Static Pages**: About, FAQ, Policies, Testimonials, and Services.
- **Responsive Design**: Modern UI with EJS templates and custom CSS.
- **Security**: Uses Helmet, CORS, cookie-parser, and compression middleware.
- **Error Handling**: Graceful error and 404 handling.

## Project Structure

```
Tranquil_Retreats/
├── db.js                # MongoDB connection setup
├── server.js            # Main Express server
├── package.json         # Project dependencies
├── models/
│   └── User.js          # Mongoose user schema
├── routes/
│   ├── userRoutes.js    # User API routes (register, login)
│   └── pageRoutes.js    # Static page routes
├── views/               # EJS templates for all pages
├── public/              # Static assets (CSS, JS, images)
└── data/                # (Legacy) JSON user data
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd Tranquil_Retreats
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. (Optional) Set your MongoDB URI in an `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/tranquil_retreats
   ```
   By default, the app connects to `mongodb://localhost:27017/tranquil_retreats`.

### Running the App
1. Start your MongoDB server (if local):
   ```sh
   mongod
   ```
2. Start the Node.js server:
   ```sh
   node server.js
   ```
3. Visit [http://localhost:8080](http://localhost:8080) in your browser.

## Usage
- Register a new user at `/register`.
- Log in at `/login`.
- Browse rooms, book your stay, and explore hotel services.
- Admin dashboard and booking management are UI-only (no backend logic yet).

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: EJS, CSS, JavaScript
- **Middleware**: Helmet, CORS, cookie-parser, compression, morgan, express-session

## Security Notes
- Passwords are currently stored in plaintext for demonstration. For production, use password hashing (e.g., bcrypt).
- Session secret should be stored securely (e.g., in environment variables).

## License
This project is for educational/demo purposes.

---

**Tranquil Retreats** – Experience Serenity Among the Hills
