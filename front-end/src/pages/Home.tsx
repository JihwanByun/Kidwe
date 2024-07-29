import NotificationButton from '@/components/atoms/Button/NotificationButton';
import KindergartenCard from '@/components/atoms/KindergartenCard';
import UsercardItem from '@/components/molecules/Item/UserCardItem';
import HomeMenu from '@/components/organisms/Content/HomeMenu';
import MemoShortcut from '@/components/organisms/Content/MemoShortcut';
import NavigationBar from '@/components/organisms/Navigation/NavigationBar';

const Home = () => {
  const userInfo = {
    profile:
      'https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG',
    userName: '강혁준',
    role: '선생님',
  };

  return (
    <div>
      <div className="min-h-screen px-5 space-y-3 border-t bg-secondary">
        <div className="flex justify-between pt-7">
          {/* 서비스명 & 로고 */}
          <div></div>
          <NotificationButton />
        </div>
        <div className="">
          <KindergartenCard kindergartenName="싸피 유치원" />
        </div>
        <UsercardItem
          profile={userInfo.profile}
          userName={`${userInfo.userName} ${userInfo.role}`}
          cardType="arrow"
        />
        <HomeMenu />
        <MemoShortcut />
      </div>
      <NavigationBar />
    </div>
  );
};

export default Home;