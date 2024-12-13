import axios from 'axios';
import { UserProfile } from '../types/profile';

const API_URL = 'your-api-url'; // Replace with your actual API URL

export const profileApi = {
  updateProfile: async (profile: UserProfile): Promise<UserProfile> => {
    try {
      const response = await axios.post(`${API_URL}/profile/update`, profile);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update profile.');
    }
  },

  getProfile: async (userId: string): Promise<UserProfile> => {
    try {
      const response = await axios.get(`${API_URL}/profile/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch profile.');
    }
  }
};