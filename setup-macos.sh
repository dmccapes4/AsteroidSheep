#!/bin/bash

echo "🚀 Setting up AsteroidSheep on macOS..."

if [ ! -d "client" ] || [ ! -d "server" ]; then
    echo "❌ Error: Please run this script from the AsteroidSheep root directory (containing client/ and server/ folders)"
    exit 1
fi

echo "📁 Current directory: $(pwd)"

echo "🔧 Creating server/.env file..."
cat > server/.env << EOF
PORT=3100
MONGODB_URI=mongodb://localhost:27017/asteroid-sheep
NODE_ENV=development
EOF

echo "✅ Created server/.env with:"
cat server/.env

echo "🔍 Checking MongoDB installation..."
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found. Installing via Homebrew..."
    if ! command -v brew &> /dev/null; then
        echo "❌ Homebrew not found. Please install Homebrew first:"
        echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        exit 1
    fi
    
    echo "📦 Installing MongoDB..."
    brew tap mongodb/brew
    brew install mongodb-community
else
    echo "✅ MongoDB is already installed"
fi

echo "🚀 Starting MongoDB..."
brew services start mongodb-community

sleep 3

if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB may not be running. You can start it manually with:"
    echo "   brew services start mongodb-community"
fi

echo "📦 Installing dependencies..."

echo "  Installing root dependencies..."
npm install

echo "  Installing server dependencies..."
cd server
npm install
cd ..

echo "  Installing client dependencies..."
cd client
npm install
cd ..

echo "🔍 Verifying .env configuration..."
cd server
node -e "require('dotenv').config(); console.log('PORT:', process.env.PORT); console.log('MONGODB_URI:', process.env.MONGODB_URI);"
cd ..

echo ""
echo "🎉 Setup complete! You can now run the application with:"
echo "   npm run dev"
echo ""
echo "The application will be available at:"
echo "   Frontend: http://localhost:5174"
echo "   Backend:  http://localhost:3100/api"
echo ""
echo "If you encounter any issues, check that MongoDB is running:"
echo "   brew services list | grep mongodb"
