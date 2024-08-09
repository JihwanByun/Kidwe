import Divider from '@/components/atoms/Divider/Divider';
import Input from '@/components/atoms/Input/Input';
import Tag from '@/components/atoms/Tag/Tag';
import {useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';
import type {Tag as MemoTag} from '@/types/memo/Tag';
import NoResult from '@/components/atoms/NoResult';
import Button from '@/components/atoms/Button/Button';
import {useGetTags} from '@/hooks/memo/useGetTags';
import {memoTagsSelector} from '@/recoil/selectors/memo/memoTags';

const teacherId = 1;

const MemoTagSelect = () => {
  const [filteredTags, setFilteredTags] = useState<MemoTag[] | undefined>();
  const [memoTags, setMemoTags] = useRecoilState<MemoTag[]>(memoTagsSelector);
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const {data: tagDatas} = useGetTags(teacherId);

  useEffect(() => {
    if (tagDatas) {
      setFilteredTags(tagDatas);
    }
  }, [tagDatas]);

  useEffect(() => {
    if (input === '') {
      setFilteredTags(tagDatas);
      setIsValid(false);
    } else {
      setFilteredTags(tagDatas?.filter(tag => tag.content.includes(input)));
      setIsValid(true);
    }
  }, [input, tagDatas]);

  const handleInputClick = () => {
    inputRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleTagClick = (value: string) => {
    const isAlreadySelected = memoTags.find(tag => tag.content === value);
    if (isAlreadySelected === undefined) {
      setMemoTags([
        ...memoTags,
        {
          id: '',
          teacherId,
          content: value,
        },
      ]);
    }
  };

  const handleSelectedTagClick = (value: string) => {
    const isSelected = memoTags.find(tag => tag.content === value);
    if (isSelected !== undefined) {
      setMemoTags([...memoTags].filter(tag => tag.content !== value));
    }
  };

  const handleTagAdd = () => {
    const find = memoTags.find(tag => tag.content === input);
    if (find === undefined) {
      const newTag: MemoTag = {
        teacherId,
        content: input,
      };
      setMemoTags([...memoTags, newTag]);
    }

    setInput('');
  };

  return (
    <div className="space-y-3 text-gray-300">
      <p className="mb-1 text-2xl font-semibold cursor-default">태그 선택</p>
      <p className="text-sm">태그</p>
      <Input
        ref={inputRef}
        onClick={handleInputClick}
        placeholder="태그 입력"
        value={input}
        onChange={handleInputChange}
      />
      <div className="box-border h-40 px-2 py-3 overflow-y-auto border border-gray-200 rounded-md text-wrap">
        {/* tag 받아오는 영역 */}
        {filteredTags && filteredTags.length !== 0 ? (
          <div className="inline-block m-1">
            {filteredTags.map((tag, idx) => (
              <Tag key={idx} text={tag.content} onClick={handleTagClick} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <NoResult text="등록된 태그가 없어요" />
            <Button
              label="태그 추가"
              disabled={!isValid}
              variant="negative"
              onClick={() => handleTagAdd()}
            />
          </div>
        )}
      </div>
      <div className="flex flex-wrap w-full gap-2 h-fit">
        {memoTags &&
          memoTags.map((tag, idx) => (
            <Tag
              key={idx}
              text={tag.content}
              onClick={handleSelectedTagClick}
              backgroundColor="#FFDFDF"
            />
          ))}
      </div>
      <Divider />
    </div>
  );
};

export default MemoTagSelect;