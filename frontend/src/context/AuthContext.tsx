import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken, removeToken, getToken } from '../utils/token';
import { login as loginApi, register as registerApi, getProfile, updateProfile as updateProfileApi, updatePassword as updatePasswordApi, ProfileUpdateData, PasswordUpdateData } from '../api/auth.api';

interface User {
  id: string;
  email: string;
  name: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  register: (userData: { email: string; password: string; name: string }) => Promise<any>;
  logout: () => void;
  updateUser: (userData: ProfileUpdateData | PasswordUpdateData) => Promise<any>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await getProfile();
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          removeToken();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const data = await loginApi(credentials);
    setToken(data.access_token);
    const userData = await getProfile();
    setUser(userData);
    return data;
  };

  const register = async (userData: { email: string; password: string; name: string }) => {
    const data = await registerApi(userData);
    setToken(data.access_token);
    const profile = await getProfile();
    setUser(profile);
    return data;
  };

  const updateUser = async (userData: ProfileUpdateData | PasswordUpdateData) => {
    try {
      let result;
      if ('current_password' in userData) {
        // Password update
        result = await updatePasswordApi(userData as PasswordUpdateData);
      } else {
        // Profile update
        result = await updateProfileApi(userData as ProfileUpdateData);
        // Update user state with new profile data
        if (result.user) {
          setUser(result.user);
        }
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Clear auth state immediately
    removeToken();
    setUser(null);
    
    // Use setTimeout to ensure state updates before navigation
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 0);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
