'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import UploadForm from './components/UploadForm';
import { useAuth } from '@/hooks/useAuth';

export default function UploadPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin?redirect=/upload');
    }
  }, [isAuthenticated, router]);
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">
            Please sign in to share your build
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Share Your Build</h1>
        <p className="text-gray-600 mt-2">
          Showcase your custom car with the community
        </p>
      </div>
      
      <UploadForm userId={user?.id} />
    </div>
  );
} 