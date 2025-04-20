import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SignUpForm from './components/SignUpForm';

export const metadata: Metadata = {
  title: 'Sign Up - SpecdR',
  description: 'Create your SpecdR account and join the car enthusiast community',
};

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Join the Community</h1>
        <p className="text-gray-600 mt-2">
          Create your account to start sharing your car builds
        </p>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <SignUpForm />
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 