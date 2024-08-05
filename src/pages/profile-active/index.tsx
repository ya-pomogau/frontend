import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Filter } from '../../features/filter';
import { IFilterValues } from '../../features/filter/types';
import { defaultObjFilteres } from '../../features/filter/consts';
import { openPopup } from '../../features/create-request/model';
import { Request } from '../../features/create-request';
import { TaskList } from '../../entities/task/ui/task-list';
import { Task } from '../../entities/task/types';
import { isUnConfirmedSelector } from '../../entities/user/model';
import { useMediaQuery } from '../../shared/hooks';
import { getRoleForRequest, handleFilterTasks } from '../../shared/libs/utils';
import { SmartHeader } from '../../shared/ui/smart-header';
import { Icon } from '../../shared/ui/icons';
import { Loader } from '../../shared/ui/loader';
import { useGetTaskActiveQuery } from '../../services/user-task-api';
import { startSocketConnection } from '../../services/system-slice';

export function ProfileActivePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.data);

  const [infoFilterTasks, setInfoFilterTasks] =
    useState<IFilterValues>(defaultObjFilteres);
  const [filterTasks, setFilterTasks] = useState<Task[]>([]);
  const isMobile = useMediaQuery('(max-width:1150px)');
  const isMobileForPopup = useMediaQuery('(max-width:735px)');

  const { role } = useAppSelector((state) => state.user);
  const isUnConfirmed = useAppSelector(isUnConfirmedSelector);
  const { isPopupOpen } = useAppSelector((store) => store.createRequest);

  const { data: tasks, isLoading } = useGetTaskActiveQuery(
    getRoleForRequest(role),
    {
      skip: isUnConfirmed,
    }
  );

  useEffect(() => {
    tasks && handleFilterTasks(tasks, setFilterTasks, infoFilterTasks);
  }, [tasks, infoFilterTasks.sortBy, infoFilterTasks.categories]);

  useEffect(() => {
    if (user) {
      dispatch(startSocketConnection());
    }
  }, [user]);

  return (
    <>
      <SmartHeader
        text="Активные заявки"
        icon={<Icon color="blue" icon="ActiveApplicationIcon" size="54" />}
        filter={
          !isUnConfirmed ? (
            <Filter
              items={{
                sort: true,
                categories: true,
                radius: false,
                date: false,
              }}
              setFilteres={setInfoFilterTasks}
            />
          ) : (
            <></>
          )
        }
      />
      {isLoading ? (
        <Loader />
      ) : (
        <TaskList
          userRole={role}
          isMobile={isMobile}
          handleClickAddTaskButton={() => dispatch(openPopup())}
          isStatusActive={isUnConfirmed}
          tasks={!isUnConfirmed ? filterTasks : []}
          isLoading={isLoading}
        />
      )}
      {isPopupOpen && <Request isMobile={isMobileForPopup} />}
    </>
  );
}
