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

## Nginx Configuration for asteroidsheep.work

For production deployment with custom domain, create an Nginx configuration:

```nginx
server {
    listen 80;
    server_name asteroidsheep.work;
    
    # Frontend (React app)
    location / {
        proxy_pass http://localhost:5174;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:3100;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Setup Steps:
1. Save the configuration as `/etc/nginx/sites-available/asteroidsheep.work`
2. Create symlink: `sudo ln -s /etc/nginx/sites-available/asteroidsheep.work /etc/nginx/sites-enabled/`
3. Test configuration: `sudo nginx -t`
4. Reload Nginx: `sudo nginx -s reload`
5. Update your hosts file or DNS to point `asteroidsheep.work` to your server IP

### Vite Configuration
The vite.config.ts is already configured to accept connections from `asteroidsheep.work`:
```typescript
server: {
  host: true,
  allowedHosts: ['asteroidsheep.work', 'localhost'],
  // ...
}
```

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
