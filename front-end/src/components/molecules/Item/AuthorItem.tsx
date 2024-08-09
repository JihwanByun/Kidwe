import ProfileImage from '@/components/atoms/Image/ProfileImage';
import MoreButton from '@/components/molecules/DropdownButton/MoreButton';

interface AuthorItemProps {
  profile?: string;
  writer: string;
  date: string;
}

const AuthorItem = ({profile, writer, date}: AuthorItemProps) => {
  return (
    <div className="flex items-center justify-between w-full px-8 py-5 border-b">
      <div className="flex items-center justify-between space-x-5 ">
        <ProfileImage src={profile || ''} size="2rem" />
        <div className="flex flex-row items-end space-x-3">
          <p className="text-tiny">{writer}</p>
          <p className="text-gray-200 text-2xs">{date}</p>
        </div>
      </div>
      {/* 본인 글에만 떠야 함 */}
      <MoreButton align="vertical" />
    </div>
  );
};

export default AuthorItem;