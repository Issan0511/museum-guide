"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { UserProfile, AgeGroup, UserLanguage } from "@/types/types";

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  clearUserProfile: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = "museum-guide-user-profile";

export function UserProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);

  // Load user profile from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserProfileState(parsed);
      } catch (e) {
        console.error("Failed to parse stored user profile:", e);
      }
    }
  }, []);

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
  };

  const clearUserProfile = () => {
    setUserProfileState(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, clearUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
