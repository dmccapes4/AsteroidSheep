# AsteroidSheep - Full-Stack Game Application

A comprehensive asteroid tracking and threat assessment system built with React, Express, and MongoDB.

## 🚀 Features

### Backend (Express + MongoDB)
- RESTful API for asteroid management
- Automatic threat level calculation based on size and velocity
- MongoDB integration with Mongoose ODM
- CORS support and request logging
- Environment-based configuration

### Frontend (React + TypeScript)
- Modern React application with TypeScript
- Responsive UI with TailwindCSS and shadcn/ui components
- Real-time asteroid table with color-coded threat levels
- Modal forms for adding/editing asteroids
- Statistics dashboard with threat and size distribution
- Form validation with react-hook-form

## 📁 Project Structure

```
asteroid-sheep/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   └── package.json
└── package.json           # Root package.json for development
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd asteroid-sheep
   npm run install:all
   ```

2. **Configure environment variables:**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your MongoDB URI and port
   ```

3. **Start development servers:**
   ```bash
   # From root directory - starts both client and server
   npm run dev
   ```

   Or start individually:
   ```bash
   # Terminal 1 - Backend (port 3000)
   npm run server:dev
   
   # Terminal 2 - Frontend (port 5173)
   npm run client:dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api

## 🔧 Environment Configuration

### Server (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/asteroid-sheep
NODE_ENV=development
```

## 📊 API Endpoints

### Asteroids
- `GET /api/asteroids` - Get all asteroids (with pagination and filtering)
- `POST /api/asteroids` - Create new asteroid
- `GET /api/asteroids/:id` - Get asteroid by ID
- `PUT /api/asteroids/:id` - Update asteroid
- `DELETE /api/asteroids/:id` - Delete asteroid
- `GET /api/asteroids/stats/summary` - Get asteroid statistics

### Query Parameters
- `threatLevel`: Filter by threat level (low, moderate, high, critical)
- `size`: Filter by size (small, medium, large, massive)
- `limit`: Number of results per page (default: 50)
- `page`: Page number (default: 1)

## 🎯 Asteroid Model

```typescript
interface Asteroid {
  _id?: string;
  trajectory: {
    x: number;      // X coordinate
    y: number;      // Y coordinate
    z: number;      // Z coordinate
    direction: number; // Direction in degrees (0-360)
  };
  velocity: number;           // Speed (0-1000)
  size: 'small' | 'medium' | 'large' | 'massive';
  threatLevel: 'low' | 'moderate' | 'high' | 'critical';
  discovered?: Date;          // Discovery timestamp
  name?: string;              // Optional asteroid name
  mass?: number;              // Optional mass value
}
```

## 🎨 UI Features

### Color-Coded Threat Levels
- **Low**: Green background
- **Moderate**: Yellow background
- **High**: Orange background
- **Critical**: Red background

### Interactive Components
- Sortable and filterable asteroid table
- Modal forms with validation
- Real-time statistics cards
- Responsive design for all screen sizes

## 🧪 Development

### Available Scripts

```bash
# Root level
npm run dev              # Start both client and server
npm run install:all      # Install all dependencies
npm run client:dev       # Start only frontend
npm run server:dev       # Start only backend
npm run client:build     # Build frontend for production

# Client (from client/ directory)
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Server (from server/ directory)
npm run dev              # Start with nodemon (auto-reload)
npm start                # Start production server
```

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- shadcn/ui component library
- React Hook Form for form handling
- Axios for API communication
- Lucide React for icons

**Backend:**
- Express.js web framework
- Mongoose ODM for MongoDB
- CORS middleware
- Morgan for request logging
- Nodemon for development

## 🚀 Deployment

### Frontend Deployment
```bash
cd client
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment
The backend is ready for deployment to platforms like:
- Heroku
- Railway
- Render
- DigitalOcean App Platform

Make sure to set the appropriate environment variables in your deployment platform.

### Docker Support
```bash
# Build and run with Docker (if Dockerfile is added)
docker build -t asteroid-sheep-server ./server
docker run -p 3000:3000 asteroid-sheep-server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- Real-time updates with WebSockets
- Advanced trajectory calculations and collision prediction
- 3D visualization of asteroid positions
- Integration with space agency APIs
- User authentication and role-based access
- Export functionality for asteroid data
- Mobile app companion
- VR/AR visualization modes

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or check your connection string
   - Verify network connectivity for cloud databases

2. **CORS Issues**
   - The Vite proxy should handle this in development
   - For production, ensure CORS is properly configured

3. **Port Conflicts**
   - Backend runs on port 3000, frontend on 5173
   - Change ports in respective configuration files if needed

4. **Dependencies Issues**
   - Run `npm run install:all` to ensure all packages are installed
   - Clear node_modules and reinstall if needed

For more help, please open an issue in the repository.
