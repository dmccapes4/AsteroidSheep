export interface Asteroid {
  _id?: string;
  trajectory: {
    x: number;
    y: number;
    z: number;
    direction: number;
  };
  velocity: number;
  size: 'small' | 'medium' | 'large' | 'massive';
  threatLevel: 'low' | 'moderate' | 'high' | 'critical';
  discovered?: Date;
  name?: string;
  mass?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AsteroidStats {
  total: number;
  avgVelocity: number;
  threatDistribution: Record<string, number>;
  sizeDistribution: Record<string, number>;
}

export interface AsteroidResponse {
  asteroids: Asteroid[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
