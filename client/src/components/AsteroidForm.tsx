import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Asteroid } from '../types/asteroid';

interface AsteroidFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (asteroid: Omit<Asteroid, '_id' | 'createdAt' | 'updatedAt'>) => void;
  asteroid?: Asteroid;
  isLoading?: boolean;
}

export function AsteroidForm({ isOpen, onClose, onSubmit, asteroid, isLoading }: AsteroidFormProps) {
  const form = useForm({
    defaultValues: {
      name: asteroid?.name || '',
      trajectory: {
        x: asteroid?.trajectory.x || 0,
        y: asteroid?.trajectory.y || 0,
        z: asteroid?.trajectory.z || 0,
        direction: asteroid?.trajectory.direction || 0,
      },
      velocity: asteroid?.velocity || 0,
      size: asteroid?.size || 'medium',
      mass: asteroid?.mass || 0,
    },
  });

  const handleSubmit = (data: any) => {
    onSubmit({
      name: data.name,
      trajectory: data.trajectory,
      velocity: Number(data.velocity),
      size: data.size,
      mass: data.mass ? Number(data.mass) : undefined,
      threatLevel: 'low',
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{asteroid ? 'Edit Asteroid' : 'Add New Asteroid'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Asteroid name (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="trajectory.x"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>X Coordinate</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trajectory.y"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Y Coordinate</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="trajectory.z"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Z Coordinate</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trajectory.direction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Direction (°)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" min="0" max="360" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="velocity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Velocity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" min="0" max="1000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="massive">Massive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mass (optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : asteroid ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
