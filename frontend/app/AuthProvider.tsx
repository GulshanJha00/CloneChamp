"use client";
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from './store/store'; // Zustand store
import Loading from './loading';
import app from '@/lib/firebaseConfig';
import MainNav from '@/components/Landing/main-nav';
import Footer from '@/components/Landing/footer';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn); // Using Zustand with hook

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, [setIsLoggedIn]);

  if (loading) {
    return <Loading/>;
  }

  return <>
  <MainNav/>
  {children}
  <Footer/>
  </>;
};
