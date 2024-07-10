import { useNavigate, useParams } from 'react-router-dom';

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';

import styles from './styles.module.css';

import { Tabs, UserRole } from '../../shared/types/common.types';
import { UserCardForTasks } from 'widgets/user-card-for-tasks';
import SearchButton from 'shared/ui/search-button';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { openPopup } from 'features/create-request/model';

// удалить импорт моковых данных после настройки сервера
import { mockedUsers } from '../tasks';
import { Task, TaskStatus, TaskReport } from 'entities/task/types';
import { Request } from 'features/create-request';

interface TaskListProps {
  incomeTab: string;
  handleClickAddTaskButton?: () => void;
  isStatusActive?: boolean;
  userRole?: string;
}

// удалить моковые данные после настройки сервера
const mockedTasks: Task[] = [
  {
    _id: '1',
    description:
      'Помочь убрать мусор в парке, только созданная задача (без волонтера)',
    address: 'Улица Парковая, 123',
    location: { type: 'Point', coordinates: [55.699788, 37.557059] },
    status: TaskStatus.ACCEPTED,
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
      role: UserRole.RECIPIENT,
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
    status: TaskStatus.COMPLETED,
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
      role: UserRole.RECIPIENT,
      _id: '9',
    },
    recipientReport: null,
    volunteer: {
      name: 'Смирнов Иван Павлович',
      phone: '+7 (111) 222-22-22',
      avatar: 'https://i.pravatar.cc/300',
      address: 'Москва, Ленинский проспект, 15',
      vkId: '123789',
      role: UserRole.VOLUNTEER,
      _id: '5',
    },
    volunteerReport: null,
    adminResolve: null,
    isPendingChanges: false,
    moderator: null,
  },
  {
    _id: '3',
    description: 'Посадить дерево в сквере, таска  взята волонтером',
    address: 'Улица Деревенская, 30',
    location: { type: 'Point', coordinates: [59.699788, 41.557059] },
    status: TaskStatus.ACCEPTED,
    category: {
      _id: '3',
      title: 'Покупка продуктов',
      points: 1,
      accessLevel: 1,
    },
    date: '2024-02-13T16:45:00Z',
    recipient: {
      name: 'Елена Сидорова',
      phone: '+7 555 666 7777',
      avatar: 'https://tengu.ucoz.net/novosti/morio-higaonna.jpg',
      address: 'Улица Садовая, 10',
      vkId: '123456789',
      role: UserRole.RECIPIENT,
      _id: '8',
    },
    recipientReport: TaskReport.FULFILLED,
    volunteer: {
      name: 'Иванов Иван Иванович',
      phone: '+7 (111) 222-22-22',
      avatar: 'https://i.pravatar.cc/300',
      address: 'Москва, Ленинский проспект, 65к1',
      vkId: '123456',
      role: UserRole.VOLUNTEER,
      _id: '1',
    },
    volunteerReport: null,
    adminResolve: null,
    isPendingChanges: false,
    moderator: null,
  },
  {
    _id: '4',
    description: 'Посадить дерево в сквере, таска  взята волонтером',
    address: 'Улица Деревенская, 30',
    location: { type: 'Point', coordinates: [59.699788, 41.557059] },
    status: TaskStatus.ACCEPTED,
    category: {
      _id: '4',
      title: 'Покупка продуктов',
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
      role: UserRole.RECIPIENT,
      _id: '2',
    },
    recipientReport: TaskReport.FULFILLED,
    volunteer: {
      name: 'Смирнов Иван Павлович',
      phone: '+7 (111) 222-22-22',
      avatar: 'https://i.pravatar.cc/300',
      address: 'Москва, Ленинский проспект, 15',
      vkId: '123789',
      role: UserRole.VOLUNTEER,
      _id: '5',
    },
    volunteerReport: null,
    adminResolve: null,
    isPendingChanges: true,
    moderator: null,
  },
];

export function TasksProfilePage({ incomeTab }: TaskListProps) {
  const { userId } = useParams<{ userId: string }>();
  // после добавления бэка раскоментировать 2 строчки (user userTasks)
  // const { data: user } = useGetUserByIdQuery(userId);
  // const { data: userTasks } = useGetTaskActiveQuery(userId);
  const navigate = useNavigate();
  const isMobileForPopup = useMediaQuery('(max-width:735px)');

  const dispatch = useAppDispatch();
  const { isPopupOpen } = useAppSelector((store) => store.createRequest);

  // удалить строки (user userTasks) после настройки бэка
  const user = mockedUsers.find((u) => u._id === userId);
  const userTasks = mockedTasks.filter((task) => {
    if (incomeTab === Tabs.RECIPIENTS) {
      return (
        task.status === TaskStatus.ACCEPTED && task.recipient._id === userId
      );
    } else if (incomeTab === Tabs.VOLUNTEERS) {
      return (
        task.status === TaskStatus.ACCEPTED &&
        task.volunteer &&
        task.volunteer._id === userId
      );
    }
    return false;
  });

  //удалить после настройки бэка
  const handleClickAddTaskButton = () => {
    if (user) {
      dispatch(openPopup());
      const newTask: Task = {
        _id: String(mockedTasks.length + 1),
        description: 'Новая задача для ' + user.name,
        address: user.address,
        status: TaskStatus.ACCEPTED,
        recipient: {
          _id: user._id,
          name: user.name,
          phone: user.phone,
          avatar: user.avatar,
          address: user.address,
          vkId: user.vkId,
          role: user.role,
        },
        volunteer: null,
        adminResolve: null,
        isPendingChanges: false,
        location: { type: 'Point', coordinates: [0, 0] },
        category: { _id: '', title: '', points: 0, accessLevel: 0 },
        date: null,
        recipientReport: null,
        volunteerReport: null,
        moderator: null,
      };
      mockedTasks.push(newTask);
    } else {
      console.error('Пользователь не найден для создания задачи');
    }
  };

  const handleClick = () => {
    navigate(-1);
  };

  const isMobile = useMediaQuery('(max-width:1150px)');

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
            incomeTab === Tabs.RECIPIENTS
              ? UserRole.RECIPIENT
              : UserRole.VOLUNTEER
          }
          isMobile={isMobile}
          // удалить
          handleClickAddTaskButton={handleClickAddTaskButton}
          // раскоментировать
          // handleClickAddTaskButton={openPopup()}
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
