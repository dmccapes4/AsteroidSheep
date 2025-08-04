import { Trash2, Edit, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Asteroid } from '../types/asteroid';
import { getThreatLevelColor, getSizeColor } from '../utils/threatLevel';

interface AsteroidTableProps {
  asteroids: Asteroid[];
  onEdit: (asteroid: Asteroid) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export function AsteroidTable({ asteroids, onEdit, onDelete, isLoading }: AsteroidTableProps) {

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const formatCoordinates = (trajectory: Asteroid['trajectory']) => {
    return `(${trajectory.x}, ${trajectory.y}, ${trajectory.z})`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading asteroids...</div>
      </div>
    );
  }

  if (asteroids.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold">No asteroids found</h3>
          <p className="text-gray-500">Add your first asteroid to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Coordinates</TableHead>
            <TableHead>Velocity</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Threat Level</TableHead>
            <TableHead>Direction</TableHead>
            <TableHead>Discovered</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {asteroids.map((asteroid) => (
            <TableRow key={asteroid._id}>
              <TableCell className="font-medium">
                {asteroid.name || 'Unnamed'}
              </TableCell>
              <TableCell className="font-mono text-sm">
                {formatCoordinates(asteroid.trajectory)}
              </TableCell>
              <TableCell>{asteroid.velocity}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getSizeColor(asteroid.size)}>
                  {asteroid.size}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getThreatLevelColor(asteroid.threatLevel)}>
                  {asteroid.threatLevel}
                </Badge>
              </TableCell>
              <TableCell>{asteroid.trajectory.direction}°</TableCell>
              <TableCell>{formatDate(asteroid.discovered)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.log('View asteroid:', asteroid)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(asteroid)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => asteroid._id && onDelete(asteroid._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
