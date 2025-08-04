# AsteroidSheep Deployment Guide

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm
- MongoDB 6.0+ (Community Edition)
- Git

### Installation & Setup

1. **Clone and navigate to project:**
```bash
git clone <repository-url>
cd AsteroidSheep
```

2. **Install dependencies:**
```bash
# Install root dependencies (for concurrent development)
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies  
cd client && npm install && cd ..
```

3. **Configure environment:**
```bash
# Copy server environment template
cp server/.env.example server/.env

# Edit server/.env with your MongoDB connection:
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/asteroidSheep
# NODE_ENV=development
```

4. **Start MongoDB:**
```bash
# Ubuntu/Debian
sudo systemctl start mongod

# macOS with Homebrew
brew services start mongodb-community

# Windows
net start MongoDB
```

5. **Run the application:**
```bash
# Start both client and server concurrently
npm run dev

# Or start individually:
# Terminal 1: cd server && npm start
# Terminal 2: cd client && npm run dev
```

6. **Access the application:**
- Frontend: http://localhost:5174
- Backend API: http://localhost:3000/api

## Production Deployment

### Backend (Express + MongoDB)
- Use the included Dockerfile for containerization
- Set production environment variables
- Configure MongoDB Atlas or self-hosted MongoDB
- Deploy to platforms like Railway, Render, or AWS

### Frontend (React)
- Build: `cd client && npm run build`
- Deploy the `client/dist` folder to Netlify, Vercel, or CDN
- Update API base URL for production backend

## Features Verified
✅ MongoDB connection and data persistence
✅ Full CRUD operations (Create, Read, Update, Delete)
✅ Automatic threat level calculation
✅ Color-coded threat levels and size indicators
✅ Responsive table with asteroid catalog
✅ Modal forms for adding/editing asteroids
✅ Real-time statistics dashboard
✅ Error handling and user feedback
✅ Vite proxy for seamless development

## API Endpoints
- GET /api/asteroids - List all asteroids
- POST /api/asteroids - Create new asteroid
- GET /api/asteroids/:id - Get specific asteroid
- PUT /api/asteroids/:id - Update asteroid
- DELETE /api/asteroids/:id - Delete asteroid
- GET /api/asteroids/stats - Get statistics

## Technology Stack
- **Frontend:** React 18, TypeScript, Vite, TailwindCSS, shadcn/ui
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Development:** Concurrent scripts, Axios, React Hook Form
