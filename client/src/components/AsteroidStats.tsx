import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AsteroidStats } from '../types/asteroid';
import { getThreatLevelColor, getSizeColor } from '../utils/threatLevel';

interface AsteroidStatsProps {
  stats: AsteroidStats;
  isLoading?: boolean;
}

export function AsteroidStatsComponent({ stats, isLoading }: AsteroidStatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Asteroids</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Velocity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgVelocity}</div>
          <p className="text-xs text-muted-foreground">units/time</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Threat Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {Object.entries(stats.threatDistribution).map(([level, count]) => (
              <Badge key={level} variant="outline" className={getThreatLevelColor(level)}>
                {level}: {count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Size Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {Object.entries(stats.sizeDistribution).map(([size, count]) => (
              <Badge key={size} variant="outline" className={getSizeColor(size)}>
                {size}: {count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
