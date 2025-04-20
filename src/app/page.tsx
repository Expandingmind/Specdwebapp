import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentCars } from '@/lib/db';
import CarsGrid from '@/components/cars/CarsGrid';
import Button from '@/components/ui/Button';
import { FiArrowRight } from 'react-icons/fi';

export default async function HomePage() {
  // Get recent cars
  const recentCars = await getRecentCars(6);
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-secondary text-white rounded-xl overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <Image
            src="/images/hero-bg.jpg"
            alt="Custom car background"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="relative z-10 py-16 px-8 md:px-16 lg:px-24 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Share Your Custom Car Builds
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Connect with fellow car enthusiasts, showcase your projects, and discover amazing builds from around the world.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/auth/signup">
              <Button size="lg">Join Community</Button>
            </Link>
            <Link href="/explore">
              <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                Explore Builds
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Recent Builds Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Builds</h2>
          <Link href="/explore" className="flex items-center text-primary font-medium hover:underline">
            View All <FiArrowRight className="ml-1" />
          </Link>
        </div>
        <CarsGrid cars={recentCars} />
      </section>
      
      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-primary">🚗</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Share Your Builds</h3>
          <p className="text-gray-600">
            Showcase your custom cars with detailed specs and high-quality photos.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-primary">👥</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Connect with Enthusiasts</h3>
          <p className="text-gray-600">
            Engage with like-minded car enthusiasts and grow your network.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-primary">💡</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Get Inspired</h3>
          <p className="text-gray-600">
            Discover new ideas, parts, and techniques for your next build.
          </p>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary/5 rounded-xl p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to showcase your custom build?</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Join our community of car enthusiasts and share your projects with the world.
        </p>
        <Link href="/auth/signup">
          <Button size="lg">Get Started Now</Button>
        </Link>
      </section>
    </div>
  );
} 