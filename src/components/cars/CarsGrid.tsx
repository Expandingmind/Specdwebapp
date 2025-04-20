import React from 'react';
import CarCard from './CarCard';
import { Car } from '@/lib/db';

interface CarsGridProps {
  cars: Car[];
  emptyMessage?: string;
}

const CarsGrid: React.FC<CarsGridProps> = ({ 
  cars,
  emptyMessage = 'No cars found. Be the first to share your build!' 
}) => {
  if (!cars || cars.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarsGrid; 