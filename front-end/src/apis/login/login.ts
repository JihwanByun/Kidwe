import axiosInstance from '@/apis/axiosInstance';
import {LoginResponse} from '@/types/login/LoginResponse';

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/login', {email, password});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
