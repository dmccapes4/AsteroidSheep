# AsteroidSheep Troubleshooting Guide

## Common Issues and Solutions

### 1. Server still running on port 3000 instead of 3100

**Problem:** Server output shows "AsteroidSheep server running on port 3000"

**Solution:**
```bash
# Check if .env file exists and has correct content
cd server
cat .env

# If file doesn't exist or is empty, create it:
cat > .env << EOF
PORT=3100
MONGODB_URI=mongodb://localhost:27017/asteroid-sheep
NODE_ENV=development
EOF

# Verify the file is being read:
node -e "require('dotenv').config(); console.log('PORT:', process.env.PORT);"
```

### 2. "vite: command not found" error

**Problem:** Client fails to start with "sh: vite: command not found"

**Solution:**
```bash
# Install client dependencies
cd client
npm install

# Verify vite is installed
npx vite --version
```

### 3. MongoDB connection error: "undefined" URI

**Problem:** Server shows "The `uri` parameter to `openUri()` must be a string, got 'undefined'"

**Solution:**
```bash
# Check if .env file has MONGODB_URI
cd server
grep MONGODB_URI .env

# If missing, add it:
echo "MONGODB_URI=mongodb://localhost:27017/asteroid-sheep" >> .env

# Install MongoDB if not installed (macOS):
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### 4. "concurrently: command not found" error

**Problem:** Root npm run dev fails with "sh: concurrently: command not found"

**Solution:**
```bash
# Install root dependencies
npm install

# Verify concurrently is installed
npx concurrently --version
```

### 5. MongoDB not running

**Problem:** Connection errors even with correct URI

**Solution:**
```bash
# Check if MongoDB is running (macOS)
brew services list | grep mongodb

# Start MongoDB if not running
brew services start mongodb-community

# Check if MongoDB process is active
pgrep -x "mongod"
```

### 6. Directory structure issues

**Problem:** Commands fail because you're in wrong directory

**Solution:**
```bash
# Make sure you're in the project root with both client/ and server/ folders
ls -la
# Should show: client/ server/ package.json README.md

# If you're in a nested directory, navigate up:
cd ..
ls -la
```

### 7. Environment variables not loading

**Problem:** .env file exists but variables show as undefined

**Solution:**
```bash
# Check file permissions
ls -la server/.env

# Recreate the file with proper content
cd server
rm -f .env
cat > .env << EOF
PORT=3100
MONGODB_URI=mongodb://localhost:27017/asteroid-sheep
NODE_ENV=development
EOF

# Test loading
node -e "require('dotenv').config(); console.log(process.env);"
```

### 8. Port conflicts

**Problem:** Port 3100 is already in use

**Solution:**
```bash
# Check what's using the port
lsof -i :3100

# Kill the process if needed
kill -9 <PID>

# Or change the port in server/.env
echo "PORT=3200" > server/.env
# Also update client/vite.config.ts proxy target
```

## Quick Reset

If all else fails, try this complete reset:

```bash
# Stop all processes
pkill -f "npm run dev"
pkill -f "nodemon"
pkill -f "vite"

# Clean and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

# Recreate .env
cat > server/.env << EOF
PORT=3100
MONGODB_URI=mongodb://localhost:27017/asteroid-sheep
NODE_ENV=development
EOF

# Restart MongoDB
brew services restart mongodb-community

# Start the application
npm run dev
```

## Getting Help

If you're still having issues:

1. Check the console output for specific error messages
2. Verify all prerequisites are installed (Node.js, npm, MongoDB)
3. Make sure you're in the correct directory structure
4. Try the manual setup steps in DEPLOYMENT_GUIDE.md
5. Use the setup-macos.sh script for automated setup

For additional support, please create an issue in the repository with:
- Your operating system and version
- Node.js and npm versions (`node --version`, `npm --version`)
- Complete error messages
- Steps you've already tried
