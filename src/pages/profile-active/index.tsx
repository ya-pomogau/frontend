import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Icon, Loader, SmartHeader } from 'shared/ui';
import { useMediaQuery } from 'shared/hooks';
import { isUnConfirmedSelector, TaskList } from 'entities';
import { Breakpoints } from 'shared/config';
import { Task } from '../../entities/task/types';
import { IFilterValues } from '../../features/filter/types';
import { defaultObjFilteres } from '../../features/filter/consts';
import { openPopup } from '../../features/create-request/model';
import { Request } from '../../features/create-request';
import { useGetTaskActiveQuery } from '../../services/user-task-api';
import { startSocketConnection } from '../../services/system-slice';
import { getRoleForRequest, handleFilterTasks } from '../../shared/libs/utils';

import { Filter } from '../../features/filter';

export function ProfileActivePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.data);

  const [infoFilterTasks, setInfoFilterTasks] =
    useState<IFilterValues>(defaultObjFilteres);
  const [filterTasks, setFilterTasks] = useState<Task[]>([]);
  const isMobile = useMediaQuery(Breakpoints.XL);
  const isMobileForPopup = useMediaQuery(Breakpoints.M);

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
                sortBy: true,
                categories: true,
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
