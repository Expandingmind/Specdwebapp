'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiMessageSquare } from 'react-icons/fi';
import { Car } from '@/lib/db';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={car.images[0] || '/images/placeholder-car.jpg'}
          alt={`${car.make} ${car.model}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {car.title}
          </h3>
          <div className="flex items-center gap-1">
            <FiHeart className="text-gray-500" />
            <span className="text-sm text-gray-500">{car.likes}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          {car.year} {car.make} {car.model}
        </p>
        <p className="text-sm text-gray-700 line-clamp-2 mb-4">
          {car.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {car.modifications.slice(0, 2).map((mod, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 rounded-full px-2 py-1 text-gray-600"
              >
                {mod}
              </span>
            ))}
            {car.modifications.length > 2 && (
              <span className="text-xs bg-gray-100 rounded-full px-2 py-1 text-gray-600">
                +{car.modifications.length - 2} more
              </span>
            )}
          </div>
          <Link href={`/cars/${car.id}`} className="text-primary font-medium text-sm hover:underline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard; 