import { useState, useEffect } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AsteroidTable } from './AsteroidTable';
import { AsteroidForm } from './AsteroidForm';
import { AsteroidStatsComponent } from './AsteroidStats';
import { asteroidApi } from '../services/asteroidApi';
import { Asteroid, AsteroidStats } from '../types/asteroid';

export function AsteroidDashboard() {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [stats, setStats] = useState<AsteroidStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAsteroid, setEditingAsteroid] = useState<Asteroid | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchAsteroids = async () => {
    try {
      setIsLoading(true);
      const response = await asteroidApi.getAllAsteroids();
      setAsteroids(response.asteroids);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch asteroids',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await asteroidApi.getAsteroidStats();
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    fetchAsteroids();
    fetchStats();
  }, []);

  const handleCreateAsteroid = async (asteroidData: Omit<Asteroid, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsSubmitting(true);
      await asteroidApi.createAsteroid(asteroidData);
      toast({
        title: 'Success',
        description: 'Asteroid created successfully',
      });
      fetchAsteroids();
      fetchStats();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create asteroid',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateAsteroid = async (asteroidData: Omit<Asteroid, '_id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingAsteroid?._id) return;
    
    try {
      setIsSubmitting(true);
      await asteroidApi.updateAsteroid(editingAsteroid._id, asteroidData);
      toast({
        title: 'Success',
        description: 'Asteroid updated successfully',
      });
      fetchAsteroids();
      fetchStats();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update asteroid',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAsteroid = async (id: string) => {
    try {
      await asteroidApi.deleteAsteroid(id);
      toast({
        title: 'Success',
        description: 'Asteroid deleted successfully',
      });
      fetchAsteroids();
      fetchStats();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete asteroid',
        variant: 'destructive',
      });
    }
  };

  const handleEditAsteroid = (asteroid: Asteroid) => {
    setEditingAsteroid(asteroid);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAsteroid(undefined);
  };

  const handleSubmitForm = (asteroidData: Omit<Asteroid, '_id' | 'createdAt' | 'updatedAt'>) => {
    if (editingAsteroid) {
      handleUpdateAsteroid(asteroidData);
    } else {
      handleCreateAsteroid(asteroidData);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AsteroidSheep Dashboard</h1>
          <p className="text-gray-600">Monitor and manage asteroid threats</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { fetchAsteroids(); fetchStats(); }}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Asteroid
          </Button>
        </div>
      </div>

      {stats && <AsteroidStatsComponent stats={stats} isLoading={!stats} />}

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Asteroid Catalog</h2>
        <AsteroidTable
          asteroids={asteroids}
          onEdit={handleEditAsteroid}
          onDelete={handleDeleteAsteroid}
          isLoading={isLoading}
        />
      </div>

      <AsteroidForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        asteroid={editingAsteroid}
        isLoading={isSubmitting}
      />
    </div>
  );
}
