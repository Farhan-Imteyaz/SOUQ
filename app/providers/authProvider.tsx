"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getCurrentUser } from "../actions/auth/userAuth";
import axios from "axios";
import Loading from "../loading";
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
  logout: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    user: null as User | null,
    loading: true,
  });

  const refreshUser = async () => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    try {
      const data = await getCurrentUser();
      setAuthState({ ...data, loading: false });
    } catch {
      setAuthState({ isLoggedIn: false, user: null, loading: false });
    }
  };

  const logout = async () => {
    await axios.post("/api/user/auth/logout");

    setAuthState({
      isLoggedIn: false,
      user: null,
      loading: false,
    });
  };
  const login = async (data: { email: string; password: string }) => {
    await axios.post("/api/user/auth/login", data, {
      withCredentials: true,
    });

    // 🔥 fetch user immediately after login
    const userData = await getCurrentUser();

    setAuthState({
      ...userData,
      loading: false,
    });
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        refreshUser,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
