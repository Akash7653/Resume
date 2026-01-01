import axiosInstance from './axios.ts';

export interface LoginCredentials {
  email: string;
  password: string;
  username?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  [key: string]: any;
}

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/register', {
    name: userData.name,
    email: userData.email,
    password: userData.password
  });
  return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const formData = new FormData();
  formData.append('username', credentials.email || credentials.username || '');
  formData.append('password', credentials.password);

  const response = await axiosInstance.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  theme?: 'light' | 'dark';
}

export interface PasswordUpdateData {
  current_password: string;
  new_password: string;
}

export const updateProfile = async (profileData: ProfileUpdateData): Promise<{ message: string; user: UserProfile }> => {
  const response = await axiosInstance.put('/auth/profile', profileData);
  return response.data;
};

export const updatePassword = async (passwordData: PasswordUpdateData): Promise<{ message: string }> => {
  const response = await axiosInstance.put('/auth/password', passwordData);
  return response.data;
};
