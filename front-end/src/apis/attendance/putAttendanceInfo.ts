import axiosInstance from '@/apis/axiosInstance';
import {PutAttendance} from '@/types/attendance/PutAttendance';

export const putAttendanceInfo = async (
  year: number,
  month: number,
  day: number,
  kidIds: number[],
  attendedToday: 'NOTHING' | 'ATTENDANCE' | 'ABSENCE',
  reason: string
) => {
  try {
    const body: PutAttendance = {
      year,
      month,
      day,
      kidIds,
      attendedToday,
      reason,
    };
    const result = await axiosInstance.put(`/attendance`, body);
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};