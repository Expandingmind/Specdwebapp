import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUser } from '@/lib/db';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const registerWithEmail = async (
    email: string,
    password: string,
    name: string
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      // Create the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      // Update the user profile with the name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      // Create a user document in Firestore
      await createUser({
        name,
        email,
        image: userCredential.user.photoURL || undefined,
      });
      
      // Sign in with NextAuth
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/'
      });
      
      return userCredential.user;
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/'
      });
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await signIn('google', { callbackUrl: '/' });
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred during Google login');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    await signOut({ callbackUrl: '/' });
  };
  
  return {
    user: session?.user,
    loading,
    error,
    isAuthenticated: !!session?.user,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout
  };
}; 