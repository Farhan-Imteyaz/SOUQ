"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getCurrentUser } from "../actions/auth/userAuth";

type User = {
  id: string;
  email: string;
  firstName: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<{
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
  }>({
    isLoggedIn: false,
    user: null,
    loading: true,
  });

  const refreshUser = async () => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    const data = await getCurrentUser();
    setAuthState({ ...data, loading: false });
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
