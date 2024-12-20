import axiosInstance from '@/apis/axiosInstance';
import type {GetUserInfo} from '@/types/user/GetUserInfo';

export const getUserInfo = async (): Promise<GetUserInfo> => {
  const result = await axiosInstance.get('members/profile');
  return result.data;
};
