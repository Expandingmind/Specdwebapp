import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  createdAt: Timestamp;
}

export interface Car {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  title: string;
  description: string;
  modifications: string[];
  images: string[];
  likes: number;
  createdAt: Timestamp;
}

export interface Comment {
  id: string;
  carId: string;
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
  createdAt: Timestamp;
}

// User functions
export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>) => {
  return await addDoc(collection(db, 'users'), {
    ...userData,
    createdAt: serverTimestamp(),
  });
};

export const getUserById = async (userId: string) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } as User : null;
};

// Car functions
export const createCar = async (carData: Omit<Car, 'id' | 'likes' | 'createdAt'>) => {
  return await addDoc(collection(db, 'cars'), {
    ...carData,
    likes: 0,
    createdAt: serverTimestamp(),
  });
};

export const getCarById = async (carId: string) => {
  const carDoc = await getDoc(doc(db, 'cars', carId));
  return carDoc.exists() ? { id: carDoc.id, ...carDoc.data() } as Car : null;
};

export const getUserCars = async (userId: string) => {
  const carsQuery = query(
    collection(db, 'cars'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const carsSnapshot = await getDocs(carsQuery);
  return carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Car);
};

export const getRecentCars = async (count = 10) => {
  const carsQuery = query(
    collection(db, 'cars'),
    orderBy('createdAt', 'desc'),
    limit(count)
  );
  
  const carsSnapshot = await getDocs(carsQuery);
  return carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Car);
};

// Comment functions
export const addComment = async (commentData: Omit<Comment, 'id' | 'createdAt'>) => {
  return await addDoc(collection(db, 'comments'), {
    ...commentData,
    createdAt: serverTimestamp(),
  });
};

export const getCarComments = async (carId: string) => {
  const commentsQuery = query(
    collection(db, 'comments'),
    where('carId', '==', carId),
    orderBy('createdAt', 'desc')
  );
  
  const commentsSnapshot = await getDocs(commentsQuery);
  return commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Comment);
}; 