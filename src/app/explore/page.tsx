import React from 'react';
import { Metadata } from 'next';
import { getRecentCars } from '@/lib/db';
import CarsGrid from '@/components/cars/CarsGrid';

export const metadata: Metadata = {
  title: 'Explore Custom Car Builds - SpecdR',
  description: 'Browse and discover amazing custom car builds from enthusiasts around the world',
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // In a real application, you would use the searchParams to filter results
  // For demo purposes, we're just getting recent cars
  const cars = await getRecentCars(12);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Explore Custom Builds</h1>
        <p className="text-gray-600 mt-2">
          Discover amazing custom cars from enthusiasts around the world
        </p>
      </div>
      
      {/* Filters (simplified for demo) */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-auto">
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
              Make
            </label>
            <select
              id="make"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option value="">All Makes</option>
              <option value="toyota">Toyota</option>
              <option value="honda">Honda</option>
              <option value="ford">Ford</option>
              <option value="bmw">BMW</option>
              <option value="nissan">Nissan</option>
            </select>
          </div>
          
          <div className="w-full md:w-auto">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              id="sort"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          
          <div className="w-full md:w-auto md:ml-auto self-end">
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition duration-200">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Results */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Showing {cars.length} results
        </h2>
        <CarsGrid cars={cars} />
      </div>
    </div>
  );
} 