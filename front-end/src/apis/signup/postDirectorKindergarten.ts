import axiosInstance from '@/apis/axiosInstance';
import {Kindergarten} from '@/types/signup/Kindergarten';

export const postDirectorKindergarten = async (
  data: Kindergarten
): Promise<string> => {
  console.log('우선 data 형태를 볼게요:', data);

  try {
    const response = await axiosInstance.post('/directors/kindergarten', data);
    console.log('서버의 응답 :', response);

    if (response.status === 200) {
      return '성공';
    } else if (response.status === 409) {
      return '실패';
    } else {
      return `에러 발생: ${response.statusText}`;
    }
  } catch (error) {
    console.debug(`postSignup 전송 Error!!!: ${error}`);
    throw error;
  }
};
