import axiosInstance from '@/apis/noSqlInstance';
import {GetMemo} from '@/types/memo/GetMemo';

export const getMemoById = async (
  teacherId: number,
  memoId: string
): Promise<GetMemo> => {
  try {
    const result = await axiosInstance.get(`/memo/${teacherId}/${memoId}`);
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};