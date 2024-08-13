import Tag from '@/components/atoms/Tag/Tag';
import MoreButton from '@/components/molecules/DropdownButton/MoreButton';
import type {GetSchedule} from '@/types/schedule/GetSchedule';
import {Dayjs} from 'dayjs';
import {useDeleteSchedule} from '@/hooks/schedule/useDeleteSchedule';
import {getKindergartenId} from '@/utils/userData';
import {toast} from 'react-toastify';

interface ScheduleInfoItem {
  schedule: GetSchedule;
  backgroundColor?: string;
  textColor?: 'black' | 'white';
  isShowMore?: boolean;
  date?: Dayjs;
}

const ScheduleInfoItem = ({
  schedule,
  backgroundColor,
  textColor,
  isShowMore = false,
  date,
}: ScheduleInfoItem) => {
  const deleteMutate = useDeleteSchedule(
    getKindergartenId()!,
    date!.format('YYYY-MM-DD')
  );

  const handleClickDelete = () => {
    const scheduleId = schedule.scheduleId;
    deleteMutate.mutate(
      {scheduleId: scheduleId},
      {
        onSuccess: () => {
          toast.info('삭제 완료되었습니다.');
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <Tag
          text={schedule.keyWord}
          backgroundColor={backgroundColor}
          textColor={textColor}
        />
        <p className="text-xs">{schedule.content}</p>
      </div>
      {isShowMore ? (
        <MoreButton align="vertical">
          <MoreButton.Option text="삭제" onClick={handleClickDelete} />
        </MoreButton>
      ) : null}
    </div>
  );
};

export default ScheduleInfoItem;