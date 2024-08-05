import ProfileImage from '@/components/atoms/Image/ProfileImage';
import MoreButton from '@/components/molecules/DropdownButton/MoreButton';
import BracketButton from '@/components/atoms/Button/BracketButton';

interface UserCardItemProps {
  profile: string;
  userName: string;
  banName?: string;
  cardType: 'basic' | 'detail' | 'status' | 'check' | 'arrow';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  options?: string[];
}

const UserCardItem = ({
  profile,
  userName,
  banName,
  cardType,
  onClick,
  options,
}: UserCardItemProps) => {
  const arrowClass = cardType === 'arrow' ? 'rounded-lg' : 'border-b';

  return (
    <div
      className={`flex justify-between items-center py-5 px-8 bg-white ${arrowClass}`}
    >
      <div className="flex items-center space-x-3">
        <ProfileImage src={profile} size="2.9rem" />
        <span className="text-lg font-medium">{userName}</span>
        {banName && <span className="text-sm font-medium">{banName}</span>}
      </div>
      {cardType === 'detail' && <MoreButton options={options} />}
      {cardType === 'arrow' && (
        <BracketButton onClick={onClick || (() => {})} direction="right" />
      )}
    </div>
  );
};

export default UserCardItem;