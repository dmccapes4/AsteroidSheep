# AsteroidSheep Deployment Guide

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm
- MongoDB 6.0+ (Community Edition)
- Git

### Installation & Setup

1. **Clone and navigate to project:**
```bash
git clone https://github.com/dmccapes4/AsteroidSheep.git
cd AsteroidSheep
git checkout devin/1733297154-asteroidSheep-fullstack-setup
```

2. **Quick setup (macOS):**
```bash
chmod +x setup-macos.sh
./setup-macos.sh
```

3. **Manual setup (if script fails):**
```bash
# Install dependencies
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

# Create server/.env file
cat > server/.env << EOF
PORT=3100
MONGODB_URI=mongodb://localhost:27017/asteroid-sheep
NODE_ENV=development
EOF

# Install and start MongoDB (macOS)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

4. **Start the application:**
```bash
npm run dev
```

6. **Access the application:**
- Frontend: http://localhost:5174
- Backend API: http://localhost:3100/api

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
✅ macOS setup script for easy installation

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
