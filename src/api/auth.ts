import axios from 'axios';
import { LoginCredentials, SignupCredentials, AuthResponse } from '../types/auth';

const API_URL = 'your-api-url'; // Replace with your actual API URL

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, credentials);
      return response.data;
    } catch (error) {
      throw new Error('Signup failed. Please try again.');
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      throw new Error('Logout failed.');
    }
  }
};