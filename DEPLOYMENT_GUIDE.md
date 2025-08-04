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

## Production Deployment Strategy

### Quick Production Setup

```bash
# Build and deploy to production
npm run deploy:prod

# Or step by step:
npm run build                    # Build frontend static assets
pm2 start ecosystem.config.js    # Start backend with pm2
sudo nginx -s reload             # Reload Nginx configuration
```

### Production Architecture

- **Frontend**: Static files served by Express from `client/build/`
- **Backend**: Express server managed by pm2 on port 3100
- **Database**: MongoDB running locally
- **Proxy**: Nginx reverse proxies all requests to Express
- **Ports**: Only 80/443 exposed publicly, internal services on 3100

### Nginx Configuration

The production Nginx configuration (`nginx/asteroidsheep.conf`) includes:
- Reverse proxy to Express server (which serves both static files and API)
- Security headers and gzip compression
- Simplified configuration with Express handling all routing

### Development vs Production Workflows

**Development:**
```bash
npm run dev:start    # Automated dev environment setup
# OR
npm run dev          # Start Express server with nodemon (serves built React app)
```

**Production:**
```bash
npm run build        # Build React app with Webpack
npm start            # Start Express server (serves static files + API)
npm run deploy:prod  # Complete production deployment with pm2
npm run prod:status  # Check backend status
npm run prod:logs    # View backend logs
npm run prod:restart # Restart backend
```

### Process Management with pm2

The `ecosystem.config.js` provides:
- Automatic restarts on crashes
- Memory limit monitoring
- Separate dev/prod environment configurations
- Centralized logging to `logs/` directory

### Manual Nginx Setup

If the automated deployment doesn't work:

1. Copy configuration:
```bash
sudo cp nginx/asteroidsheep.conf /opt/homebrew/etc/nginx/sites-enabled/
```

2. The configuration now proxies all requests to Express, so no path updates needed.

3. Test and reload:
```bash
sudo nginx -t
sudo nginx -s reload
```

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
