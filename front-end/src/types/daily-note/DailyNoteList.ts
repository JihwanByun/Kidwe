import {RoleItem} from '@/enum/roleItem';

export interface DailyNoteItem {
  id: number;
  banName: string;
  kidName: string;
  writerRle: RoleItem;
  sendTime: string;
}

export interface DailyNoteList {
  dailyNoteListItemResponseDtos: Record<string, DailyNoteItem[]>;
}
