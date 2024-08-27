import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import dayjs from 'dayjs';

import {groupByDate} from '@/utils/groupByDate';
import {useMedicationList} from '@/hooks/medication/useMedicationList';
import type {MedicationItem} from '@/types/medication/MedicationItem';
import {RoleItem} from '@/enum/roleItem';
import {containerNavigatorClass} from '@/styles/styles';
import {isGuardian} from '@/utils/auth/isGuardian';
import {getMemberRole, getKidId, getBanId} from '@/utils/userData';
import {getFullImageSource} from '@/utils/getFullImageSource';

import Spinner from '@/components/atoms/Loader/Spinner';
import Header from '@/components/organisms/Navigation/Header';
import DateNavigator from '@/components/organisms/Navigation/DateNavigator';
import NoResult from '@/components/atoms/NoResult';
import MonthDivider from '@/components/atoms/Divider/MonthDivider';
import UserCardItem from '@/components/molecules/Item/UserCardItem';
import WriteButton from '@/components/atoms/Button/WriteButton';
import NavigationBar from '@/components/organisms/Navigation/NavigationBar';
import DirectorSelectItem from '@/components/organisms/Medication/DirectorSelectItem';

const MedicationListView = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const navigate = useNavigate();

  const memberRole = getMemberRole() as RoleItem;

  const [id, setId] = useState<number | null>(null);
  const handleIdChange = (value: number) => {
    setId(value);
  };

  useEffect(() => {
    if (memberRole === RoleItem.Guardian) {
      setId(getKidId());
    } else if (memberRole === RoleItem.Teacher) {
      setId(getBanId());
    }
  }, [memberRole]);

  const {data, isLoading} = useMedicationList(
    id,
    currentMonth.year(),
    currentMonth.month() + 1,
    memberRole
  );

  const handleLeftClick = () => {
    setCurrentMonth(prev => prev.subtract(1, 'month').startOf('month'));
  };

  const handleRightClick = () => {
    setCurrentMonth(prev => prev.add(1, 'month').startOf('month'));
  };

  const handleUserItemClick = (medicationId: number, item: MedicationItem) => {
    navigate(`/medications/${medicationId}`, {
      state: {
        kidName: item.kidName,
        banName: item.banName,
      },
    });
  };

  const handleWriteButtonClick = () => {
    navigate('/medications/write');
  };

  const groupedData = groupByDate(data ?? []);

  return (
    <div className="relative flex flex-col h-screen">
      {isLoading && <Spinner />}
      <Header title="투약의뢰서" buttonType="close" />
      <DateNavigator
        title={currentMonth.format('YY년 M월')}
        onClickLeft={handleLeftClick}
        onClickRight={handleRightClick}
      />
      <div className={`${containerNavigatorClass} pt-[6.5rem] flex flex-col`}>
        <div className="w-full px-3">
          <DirectorSelectItem
            memberRole={memberRole}
            onBanChange={handleIdChange}
          />
        </div>
        {(data && data.length === 0) || !id ? (
          <div className="flex items-center justify-center flex-grow">
            <NoResult text="등록된 의뢰서가 없어요" />
          </div>
        ) : (
          Object.keys(groupedData).map(date => (
            <div key={date}>
              <MonthDivider text={`${dayjs(date).date()}일`} color="gray" />
              {groupedData[date].map(item => (
                <div
                  key={item.medicationId}
                  onClick={() => handleUserItemClick(item.medicationId, item)}
                >
                  <UserCardItem
                    profile={getFullImageSource(item?.kidPicture)}
                    userName={item.kidName}
                    banName={item.banName}
                    cardType="basic"
                  />
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      {isGuardian() && <WriteButton onClick={handleWriteButtonClick} />}
      <NavigationBar />
    </div>
  );
};

export default MedicationListView;
