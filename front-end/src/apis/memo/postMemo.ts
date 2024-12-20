import noSqlInstance from '@/apis/noSqlInstance';
import {PostMemo} from '@/types/memo/PostMemo';

export const postMemo = async (teacherId: number, memo: PostMemo) => {
  const result = await noSqlInstance.post(`/memos/${teacherId}`, {
    ...memo,
    updatedTime: memo.updatedTime.format('YYYY-MM-DD HH:mm'),
  });
  return result.data;
};
