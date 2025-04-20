'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiEdit, FiUser } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { getUserCars } from '@/lib/db';
import CarsGrid from '@/components/cars/CarsGrid';
import Button from '@/components/ui/Button';
import { Car } from '@/lib/db';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [userCars, setUserCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push('/auth/signin?redirect=/profile');
      return;
    }
    
    const fetchUserCars = async () => {
      try {
        if (user?.id) {
          const cars = await getUserCars(user.id);
          setUserCars(cars);
        }
      } catch (error) {
        console.error('Error fetching user cars:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserCars();
  }, [isAuthenticated, router, user]);
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">
            Please sign in to view your profile
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'User'}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                ) : (
                  <FiUser size={40} className="text-gray-500" />
                )}
              </div>
              
              <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2">
                <FiEdit size={16} />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-2xl font-bold mb-1">{user?.name || 'User'}</h1>
              <p className="text-gray-500 mb-4">{user?.email}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button
                  onClick={() => router.push('/upload')}
                  variant="primary"
                >
                  Share New Build
                </Button>
                
                <Button
                  onClick={() => router.push('/profile/settings')}
                  variant="outline"
                >
                  Edit Profile
                </Button>
                
                <Button
                  onClick={() => logout()}
                  variant="ghost"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">My Builds</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <p>Loading...</p>
          </div>
        ) : (
          <CarsGrid 
            cars={userCars} 
            emptyMessage="You haven't shared any builds yet. Share your first build now!"
          />
        )}
      </div>
    </div>
  );
} 