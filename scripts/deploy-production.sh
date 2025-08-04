#!/bin/bash

set -e

echo "🚀 Starting AsteroidSheep production deployment..."

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo -e "${YELLOW}📦 Building frontend...${NC}"
cd client
npm run build
cd ..

echo -e "${YELLOW}🔧 Setting up logs directory...${NC}"
mkdir -p logs

echo -e "${YELLOW}⚙️  Installing pm2 globally (if not installed)...${NC}"
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

echo -e "${YELLOW}🛑 Stopping existing pm2 processes...${NC}"
pm2 stop ecosystem.config.js || true
pm2 delete ecosystem.config.js || true

echo -e "${YELLOW}🚀 Starting backend with pm2...${NC}"
pm2 start ecosystem.config.js --env production

echo -e "${YELLOW}📋 Saving pm2 configuration...${NC}"
pm2 save
pm2 startup

echo -e "${YELLOW}🌐 Setting up Nginx configuration...${NC}"
NGINX_SITES_DIR="/opt/homebrew/etc/nginx/sites-enabled"
if [ -d "$NGINX_SITES_DIR" ]; then
    sudo cp nginx/asteroidsheep.conf "$NGINX_SITES_DIR/"
    echo -e "${GREEN}✅ Nginx configuration copied${NC}"
else
    echo -e "${RED}❌ Nginx sites-enabled directory not found at $NGINX_SITES_DIR${NC}"
    echo -e "${YELLOW}Please manually copy nginx/asteroidsheep.conf to your Nginx configuration directory${NC}"
fi

echo -e "${YELLOW}🔍 Testing Nginx configuration...${NC}"
if sudo nginx -t; then
    echo -e "${GREEN}✅ Nginx configuration is valid${NC}"
    echo -e "${YELLOW}🔄 Reloading Nginx...${NC}"
    sudo nginx -s reload
    echo -e "${GREEN}✅ Nginx reloaded successfully${NC}"
else
    echo -e "${RED}❌ Nginx configuration test failed${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Production deployment complete!${NC}"
echo -e "${GREEN}📊 Backend status:${NC}"
pm2 status

echo -e "${GREEN}🌐 Application should be available at:${NC}"
echo -e "  • http://asteroidsheep.work"
echo -e "  • http://www.asteroidsheep.work"

echo -e "${YELLOW}📝 Useful commands:${NC}"
echo -e "  • pm2 status                 - Check backend status"
echo -e "  • pm2 logs asteroidsheep-api - View backend logs"
echo -e "  • pm2 restart all           - Restart backend"
echo -e "  • sudo nginx -s reload       - Reload Nginx"
