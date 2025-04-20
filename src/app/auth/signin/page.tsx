import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SignInForm from './components/SignInForm';

export const metadata: Metadata = {
  title: 'Sign In - SpecdR',
  description: 'Sign in to your SpecdR account and join the car enthusiast community',
};

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-600 mt-2">
          Sign in to continue your journey with the car enthusiast community
        </p>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <SignInForm />
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 