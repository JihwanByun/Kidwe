import {useQuery} from '@tanstack/react-query';
import {
  getDailyNoteByTeacher,
  getDailyNoteByParent,
} from '@/apis/daily-note/getDailyNoteList';
import {DailyNoteList} from '@/types/daily-note/DailyNoteList';
import {RoleItem} from '@/enum/roleItem';

export const useDailyNoteList = (
  id: number,
  memberId: number,
  year: number,
  month: string,
  role: RoleItem
) => {
  return useQuery<DailyNoteList, Error>({
    queryKey: ['dailyNoteList', id, memberId, year, month, role],
    queryFn: async () => {
      if (role === RoleItem.Director || role === RoleItem.Teacher) {
        return getDailyNoteByTeacher(id, memberId, year, month);
      } else if (role === RoleItem.Guardian) {
        return getDailyNoteByParent(id, memberId, year, month);
      } else {
        throw new Error('Invalid role');
      }
    },
  });
};