import { CAROTTE_API_URL } from '@/lib/env';
import { User } from '@/types';
import React, { createContext, useState, FC, useEffect } from 'react';
import axios from 'axios';
import { handleError } from '@/handler/errorHandler';

interface AuthContextType {
  user: User | null;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${CAROTTE_API_URL}/users/me`, { withCredentials: true });

        setUser(response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.status !== 404) {
          handleError(err, setError);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${CAROTTE_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      const { user } = response.data;
      setUser(user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.get(`${CAROTTE_API_URL}/auth/logout`, { withCredentials: true });
      setUser(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
