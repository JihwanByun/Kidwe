import MemoTimeSelect from '@/components/organisms/Memo/MemoTimeSelect';
import MemoTagSelect from '@/components/organisms/Memo/MemoTagSelect';
import KindergartenInfomationSelect from '@/components/organisms/Memo/KindergartenInfomationSelect';
import Header from '@/components/organisms/Navigation/Header';
import ButtonBar from '@/components/organisms/Navigation/ButtonBar';
import {containerHeaderClass} from '@/styles/styles';
import {useRecoilState} from 'recoil';
import {memoState} from '@/recoil/atoms/memo/memo';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import dayjs from 'dayjs';
import Spinner from '@/components/atoms/Loader/Spinner';
import {useQueryString} from '@/hooks/useQueryString';
import {useGetDailyMemoById} from '@/hooks/memo/useGetDailyMemoById';
import {useWriteDailyMemo} from '@/hooks/memo/useWriteDailyMemo';
import {PostMemo} from '@/types/memo/PostMemo';
import {usePutDailyMemo} from '@/hooks/memo/usePutDailyMemo';

const teacherId = 1;

const MemoWrite = () => {
  const navigate = useNavigate();

  const [memo, setMemo] = useRecoilState<PostMemo>(memoState);
  const memoId = useQueryString().get('id');
  // const date = useQueryString().get('date');

  const {data} = useGetDailyMemoById(teacherId, memoId);
  const writeMutate = useWriteDailyMemo();
  const putMutate = usePutDailyMemo();

  useEffect(() => {
    if (data !== undefined) {
      setMemo({...data, updatedTime: dayjs(data.updatedTime)});
    } else {
      setMemo({
        ...memo,
        lesson: '',
        kids: [],
        tags: [],
        content: '',
      });
    }
  }, [data, setMemo]);

  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(
      memo.content !== '' ||
        memo.kids.length !== 0 ||
        memo.lesson !== '' ||
        memo.tags.length !== 0
    );
  }, [memo]);

  const handleClick = () => {
    if (memoId !== null) {
      putMutate.mutate(
        {teacherId, memoId, memo},
        {
          onSuccess: handleSuccess,
        }
      );
    } else {
      writeMutate.mutate(
        {teacherId, memo},
        {
          onSuccess: handleSuccess,
        }
      );
    }
  };

  const handleSuccess = () => {
    navigate('/kindergarten/memo');
  };

  return (
    <>
      {writeMutate && writeMutate.status === 'pending' ? <Spinner /> : null}
      <div className={`${containerHeaderClass} flex flex-col h-full bg-white`}>
        <Header title="관찰 메모 작성" buttonType="back" />
        <div className="flex-grow px-5 py-5 space-y-8 overflow-y-scroll">
          <MemoTimeSelect />
          <MemoTagSelect />
          <KindergartenInfomationSelect />
        </div>
        <ButtonBar
          label={memoId ? '메모 수정하기' : '메모 작성하기'}
          variant={isValid ? 'positive' : 'negative'}
          disabled={!isValid}
          onClick={handleClick}
        />
      </div>
    </>
  );
};

export default MemoWrite;