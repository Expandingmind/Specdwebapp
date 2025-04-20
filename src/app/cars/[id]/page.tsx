import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FiHeart, FiShare2, FiMessageSquare, FiUser } from 'react-icons/fi';
import { getCarById, getUserById, getCarComments } from '@/lib/db';
import CommentSection from './components/CommentSection';

interface CarDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: CarDetailPageProps): Promise<Metadata> {
  const car = await getCarById(params.id);
  
  if (!car) {
    return {
      title: 'Build Not Found - SpecdR',
      description: 'The requested car build could not be found',
    };
  }
  
  return {
    title: `${car.title} - SpecdR`,
    description: car.description.substring(0, 160),
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const car = await getCarById(params.id);
  
  if (!car) {
    notFound();
  }
  
  const owner = await getUserById(car.userId);
  const comments = await getCarComments(car.id);
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-96 md:h-[500px] w-full">
          <Image
            src={car.images[0] || '/images/placeholder-car.jpg'}
            alt={car.title}
            fill
            priority
            className="object-cover"
          />
        </div>
        
        <div className="p-6">
          {/* Header with title and actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{car.title}</h1>
            
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200">
                <FiHeart className="text-gray-500" />
                <span>{car.likes}</span>
              </button>
              
              <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200">
                <FiShare2 className="text-gray-500" />
                <span>Share</span>
              </button>
              
              <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200">
                <FiMessageSquare className="text-gray-500" />
                <span>{comments.length}</span>
              </button>
            </div>
          </div>
          
          {/* Car specs */}
          <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Make</h3>
              <p className="text-lg font-semibold">{car.make}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Model</h3>
              <p className="text-lg font-semibold">{car.model}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Year</h3>
              <p className="text-lg font-semibold">{car.year}</p>
            </div>
          </div>
          
          {/* Owner info */}
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
              {owner?.image ? (
                <Image
                  src={owner.image}
                  alt={owner.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <FiUser size={20} className="text-gray-500" />
              )}
            </div>
            <div>
              <p className="font-medium">{owner?.name || 'Unknown User'}</p>
              <p className="text-sm text-gray-500">
                {new Date(car.createdAt.seconds * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">About this build</h2>
            <p className="text-gray-700 whitespace-pre-line">{car.description}</p>
          </div>
          
          {/* Modifications */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Modifications</h2>
            {car.modifications.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {car.modifications.map((mod, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-gray-700"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No modifications listed</p>
            )}
          </div>
          
          {/* More Images */}
          {car.images.length > 1 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">More Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {car.images.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                    <Image
                      src={image}
                      alt={`${car.title} image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Comments Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Comments ({comments.length})</h2>
            <CommentSection carId={car.id} comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
} 