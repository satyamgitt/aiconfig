import axios from 'axios';
import { Room } from '../store/types';

const API_URL = 'your-backend-url';

export const saveHouseConfig = async (userId: string, rooms: Room[]) => {
  try {
    const response = await axios.post(`${API_URL}/house-config`, {
      userId,
      rooms
    });
    return response.data;
  } catch (error) {
    console.error('Error saving house configuration:', error);
    throw error;
  }
};