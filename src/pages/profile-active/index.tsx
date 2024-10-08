import { useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Icon, Loader, SmartHeader } from 'shared/ui';
import { useMediaQuery } from 'shared/hooks';
import { isUnConfirmedSelector, TaskList } from 'entities';
import { Breakpoints } from 'shared/config';
import { Task } from '../../entities/task/types';
import { openPopup } from '../../features/create-request/model';
import { Request } from '../../features/create-request';
import { useGetTaskActiveQuery } from '../../services/user-task-api';
import { startSocketConnection } from '../../services/system-slice';
import { getRoleForRequest, handleFilterTasks } from '../../shared/libs/utils';

import { Filter } from '../../features/filter';
import { filterDataSelector } from '../../features/filter/model';

export function ProfileActivePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.data);

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

  const { sortBy, categories } = useAppSelector(filterDataSelector);

  const currentTask: Task[] = useMemo(() => {
    if (Boolean(sortBy) || Boolean(categories.length)) {
      if (tasks)
        return handleFilterTasks(tasks, {
          sortBy,
          categories,
        });
    }
    return tasks;
  }, [sortBy, categories, tasks]);

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
          tasks={!isUnConfirmed ? currentTask : []}
          isLoading={isLoading}
        />
      )}
      {isPopupOpen && <Request isMobile={isMobileForPopup} />}
    </>
  );
}
