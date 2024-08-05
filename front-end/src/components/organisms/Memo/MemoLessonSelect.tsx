import DashedButton from '@/components/atoms/Button/DashedButton';
import {useEffect, useState} from 'react';
import ModalPortal from '../Modal/ModalPortal';
import Modal from '../Modal/Modal';
import Input from '@/components/atoms/Input/Input';
import CheckListItem from '../Check/CheckListItem';
import {memoState} from '@/recoil/atoms/memo/memo';
import {useRecoilState} from 'recoil';
import {getLessonInfomation} from '@/apis/memo/getLessonInfomation';
import {useQuery} from '@tanstack/react-query';
import dayjs from 'dayjs';
import type {Lesson} from '@/types/memo/Lesson';
import ScheduleInfoItem from '@/components/organisms/Schedule/ScheduleInfoItem';

interface CheckedLesson {
  lesson: Lesson;
  isChecked: boolean;
}

const MemoLessonSelect = () => {
  const [memo, setMemo] = useRecoilState(memoState);

  const [lessons, setLessons] = useState<CheckedLesson[]>();

  const [filteredLessons, setFilteredLessons] = useState<CheckedLesson[]>();

  const [input, setInput] = useState('');

  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);

  const {data} = useQuery({
    queryKey: ['lessons', 0],
    queryFn: () => getLessonInfomation(1, dayjs('2024-04-10')),
  });

  useEffect(() => {
    setLessons(
      data?.map(value => {
        return {lesson: value, isChecked: false};
      })
    );
  }, [data]);

  useEffect(() => {
    if (lessons === undefined) {
      return;
    }
    if (input === '') {
      setFilteredLessons([...lessons]);
    } else {
      setFilteredLessons(
        [...lessons].filter(lesson => lesson.lesson.content.includes(input))
      );
    }
  }, [lessons, input, data]);

  const handleCloseLessonModal = () => {
    setIsLessonModalOpen(false);
  };

  const handleOpenLessonModal = () => {
    setIsLessonModalOpen(true);
  };

  const handleChange = (value: string) => {
    setInput(value);
  };

  const handleClickItem = (value: string) => {
    const find = lessons?.find(lesson => lesson.lesson.content === value);
    if (find !== undefined) {
      setMemo({
        ...memo,
        lesson: find.lesson.content,
      });
    }
    setLessons(
      lessons?.map(lesson =>
        lesson.lesson.content === value
          ? {...lesson, isChecked: true}
          : {...lesson, isChecked: false}
      )
    );
    setIsLessonModalOpen(false);
  };

  return (
    <>
      <p className="text-sm">수업 선택</p>
      <div
        onClick={handleOpenLessonModal}
        className="flex items-center justify-center h-10"
      >
        {memo.lesson ? (
          <ScheduleInfoItem
            tag="수업"
            text="블럭 쌓으세요"
            isShowMore={false}
          />
        ) : (
          <DashedButton label="+" onClick={handleOpenLessonModal} />
        )}
      </div>
      <p className="text-sm">메모</p>
      <ModalPortal>
        <Modal isOpen={isLessonModalOpen}>
          <Modal.Header title="수업 선택" />
          <Modal.Body>
            <div className="flex flex-col items-center justify-center w-full h-full gap-6 py-6">
              <div className="box-border w-full px-6 h-fit">
                <Input
                  placeholder="수업 이름 입력"
                  value={input}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full overflow-y-auto h-72">
                {filteredLessons &&
                  filteredLessons.map((lesson, idx) => (
                    <CheckListItem
                      key={idx}
                      text={lesson.lesson.content}
                      isChecked={lesson.isChecked}
                      onClick={() => handleClickItem(lesson.lesson.content)}
                    />
                  ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.BottomButton
            label="취소"
            onClick={handleCloseLessonModal}
            variant="negative"
            round="small"
            size="large"
          ></Modal.BottomButton>
          <Modal.Background onClick={handleCloseLessonModal} />
        </Modal>
      </ModalPortal>
    </>
  );
};

export default MemoLessonSelect;