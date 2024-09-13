import { useNavigate } from 'react-router-dom';
// import { skipToken } from '@reduxjs/toolkit/query/react';

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';

import styles from './styles.module.css';

import { tabs, userRole } from '../../shared/types/common.types';
// import { useGetUserByIdQuery } from 'services/user-api';
// import { useGetTaskActiveQuery } from 'services/user-task-api';
import { UserCardForTasks } from 'widgets/user-card-for-tasks';
import SearchButton from 'shared/ui/search-button';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { openPopup } from 'features/create-request/model';

import { Request } from 'features/create-request';
import { taskReport, taskStatus } from 'entities/task/types';
import { Breakpoints } from 'shared/config';

// Моковые данные (удалить)
const mockedUser = {
  _id: '1',
  name: 'Иванов Иван Иванович',
  phone: '+7 (123) 456-78-90',
  avatar: 'https://i.pravatar.cc/300',
  address: 'Улица Лесная, 12',
  vkId: '123456',
  role: userRole.VOLUNTEER,
};

const mockedTasks = [
  {
    _id: '1',
    description:
      'Помочь убрать мусор в парке, только созданная задача (без волонтера)',
    address: 'Улица Парковая, 123',
    location: { type: 'Point', coordinates: [55.699788, 37.557059] },
    status: taskStatus.ACCEPTED,
    category: {
      _id: '1',
      title: 'Сопровождение',
      points: 1,
      accessLevel: 1,
    },
    date: null,
    recipient: {
      name: 'Молчанов Егор Артёмович',
      phone: '+7 (111) 222-22-22',
      avatar: 'https://i.pravatar.cc/300',
      address: 'Улица Садовая, 10',
      vkId: '654321',
      role: userRole.RECIPIENT,
      _id: '2',
    },
    recipientReport: null,
    volunteer: null,
    volunteerReport: null,
    adminResolve: null,
    isPendingChanges: false,
    moderator: null,
  },
  {
    _id: '2',
    description: 'Помочь перенести мебель, таска взята волонтером',
    address: 'Улица Мебельная, 77',
    location: { type: 'Point', coordinates: [60.699788, 40.557059] },
    status: taskStatus.COMPLETED,
    category: {
      _id: '2',
      title: 'Перевозка в личном транспорте',
      points: 1,
      accessLevel: 1,
    },
    date: '2024-02-11T18:00:00Z',
    recipient: {
      name: 'Александр Петров Сергеевич',
      phone: '+7 987 654 3210',
      avatar: '',
      address: 'Улица Мебельная, 77',
      vkId: '123456789',
      role: userRole.RECIPIENT,
      _id: '9',
    },
    recipientReport: taskReport.FULFILLED,
    volunteer: {
      name: 'Смирнов Иван Павлович',
      phone: '+7 (111) 222-22-22',
      avatar: 'https://i.pravatar.cc/300',
      address: 'Москва, Ленинский проспект, 15',
      vkId: '123789',
      role: userRole.VOLUNTEER,
      _id: '5',
    },
    volunteerReport: taskReport.REJECTED,
    adminResolve: null,
    isPendingChanges: false,
    moderator: null,
  },
];

interface TaskListProps {
  incomeTab: string;
}

export function TasksProfilePage({ incomeTab }: TaskListProps) {
  // const { userId } = useParams<{ userId: string }>();
  // TODO: user userTasks
  // const { data: user } = useGetUserByIdQuery(userId ?? skipToken);
  // const { data: userTasks } = useGetTaskActiveQuery(userId ?? skipToken);
  // удалить
  const user = mockedUser;
  const userTasks = mockedTasks;

  const navigate = useNavigate();
  const isMobileForPopup = useMediaQuery(Breakpoints.M);

  const dispatch = useAppDispatch();
  const { isPopupOpen } = useAppSelector((store) => store.createRequest);

  const handleClick = () => {
    navigate(-1);
  };

  const isMobile = useMediaQuery(Breakpoints.XL);

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="SettingsIcon" size="54" />}
        text="Создание / Редактирование заявки"
        // filter={<Filter items={{ userCategories: true }} />}
      />
      <SearchButton text="Поиск" onClick={handleClick} />
      <div className={styles.userCards}>
        {user && <UserCardForTasks user={user} />}
      </div>
      <div className={styles.taskContainer}>
        <TaskList
          userRole={
            incomeTab === tabs.RECIPIENTS
              ? userRole.RECIPIENT
              : userRole.VOLUNTEER
          }
          isMobile={isMobile}
          handleClickAddTaskButton={() => dispatch(openPopup())}
          isStatusActive
          tasks={userTasks || []}
          isLoading={false}
          isTabPage
        />
        {isPopupOpen && <Request isMobile={isMobileForPopup} />}
      </div>
    </>
  );
}
