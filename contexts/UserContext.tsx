"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { UserProfile } from "@/types/types";

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  clearUserProfile: () => void;
  visitId: string | null;
  initializeVisit: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = "museum-guide-user-profile";

export function UserProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [visitId, setVisitId] = useState<string | null>(null);
  const pathname = usePathname();
  const hasLoggedVisit = useRef<string | null>(null);

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

  const initializeVisit = () => {
    if (!visitId) {
      setVisitId(crypto.randomUUID());
    }
  };

  // Auto-initialize visit if not on lang page and have profile
  useEffect(() => {
    if (userProfile && !visitId && pathname && !pathname.startsWith('/lang')) {
      initializeVisit();
    }
  }, [userProfile, visitId, pathname]);

  // Log visit when visitId is set
  useEffect(() => {
    if (userProfile && visitId && hasLoggedVisit.current !== visitId) {
      const ageBucketMap: Record<number, string> = {
        9: "under_10",
        16: "10s",
        20: "20s",
        30: "30s",
        40: "40s",
        50: "50s",
        60: "60s",
        70: "70s",
        80: "80s_plus",
      };

      const visitData = {
        id: visitId,
        // ts is handled by default now()
        user_id_hash: null,
        lang: userProfile.language,
        age_bucket: ageBucketMap[userProfile.age] || "unknown",
      };

      supabase.from('visits').insert(visitData).then(({ error }) => {
        if (error) {
          console.error('Error logging visit:', error);
        } else {
          console.log('Visit logged:', visitData);
        }
      });

      hasLoggedVisit.current = visitId;
    }
  }, [userProfile, visitId]);

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
  };

  const clearUserProfile = () => {
    setUserProfileState(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    setVisitId(null);
    hasLoggedVisit.current = null;
  };

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, clearUserProfile, visitId, initializeVisit }}>
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
