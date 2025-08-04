import axios from 'axios';
import { Asteroid, AsteroidStats, AsteroidResponse } from '../types/asteroid';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const asteroidApi = {
  getAllAsteroids: async (params?: {
    threatLevel?: string;
    size?: string;
    limit?: number;
    page?: number;
  }): Promise<AsteroidResponse> => {
    const response = await api.get('/asteroids', { params });
    return response.data;
  },

  getAsteroid: async (id: string): Promise<Asteroid> => {
    const response = await api.get(`/asteroids/${id}`);
    return response.data;
  },

  createAsteroid: async (asteroid: Omit<Asteroid, '_id' | 'createdAt' | 'updatedAt'>): Promise<Asteroid> => {
    const response = await api.post('/asteroids', asteroid);
    return response.data;
  },

  updateAsteroid: async (id: string, asteroid: Partial<Asteroid>): Promise<Asteroid> => {
    const response = await api.put(`/asteroids/${id}`, asteroid);
    return response.data;
  },

  deleteAsteroid: async (id: string): Promise<void> => {
    await api.delete(`/asteroids/${id}`);
  },

  getAsteroidStats: async (): Promise<AsteroidStats> => {
    const response = await api.get('/asteroids/stats/summary');
    return response.data;
  },
};
