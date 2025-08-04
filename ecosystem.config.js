module.exports = {
  apps: [{
    name: 'asteroidsheep-api',
    script: './server/server.js',
    cwd: '/home/ubuntu/AsteroidSheep',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3100,
      MONGODB_URI: 'mongodb://localhost:27017/asteroid-sheep'
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 3100,
      MONGODB_URI: 'mongodb://localhost:27017/asteroid-sheep-dev'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
