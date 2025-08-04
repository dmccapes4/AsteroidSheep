#!/bin/bash

set -e

echo "🛠️  Starting AsteroidSheep development environment..."

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm run install:all

echo -e "${YELLOW}🔍 Checking MongoDB connection...${NC}"
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${YELLOW}🚀 Starting MongoDB...${NC}"
    brew services start mongodb-community || {
        echo "Failed to start MongoDB with brew services. Trying manual start..."
        mongod --config /opt/homebrew/etc/mongod.conf --fork
    }
fi

echo -e "${YELLOW}⚙️  Checking server environment...${NC}"
if [ ! -f "server/.env" ]; then
    echo -e "${YELLOW}📝 Creating server/.env file...${NC}"
    cat > server/.env << EOF
PORT=3100
MONGODB_URI=mongodb://localhost:27017/asteroid-sheep-dev
NODE_ENV=development
EOF
fi

echo -e "${GREEN}🚀 Starting development server...${NC}"
echo -e "${GREEN}  • Application: http://localhost:3100${NC}"
echo -e "${GREEN}  • API: http://localhost:3100/api${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"

npm run dev
