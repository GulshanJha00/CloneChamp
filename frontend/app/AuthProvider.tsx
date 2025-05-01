"use client"
import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from './store/store'; // Zustand store

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setIsLoggedIn = useAuthStore.getState().setIsLoggedIn;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); 
      console.log('Auth state changed. User:', user);
    });

    return () => unsubscribe();
  }, [setIsLoggedIn]);

  return <>{children}</>;
};
