import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Filter } from 'features/filter';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { openPopup } from 'features/create-request/model';
import { Request } from 'features/create-request';
import { useGetTasksByStatusQuery } from 'services/tasks-api';
import { Loader } from 'shared/ui/loader';
import { useEffect, useState } from 'react';
import { IFilterValues } from 'features/filter/types';
import { Task } from 'entities/task/types';
import { handleFilterTasks } from 'shared/libs/utils';
import { defaultObjFilteres } from 'features/filter/consts';
import { UserStatus } from 'shared/types/common.types';

export function ProfileActivePage() {
  const dispatch = useAppDispatch();
  const { data: tasks, isLoading } = useGetTasksByStatusQuery('active');
  const { role, data } = useAppSelector((state) => state.user);
  const isUnConfirmed = data?.status === UserStatus.UNCONFIRMED;
  const isMobile = useMediaQuery('(max-width:1150px)');
  const { isPopupOpen } = useAppSelector((store) => store.createRequest);
  const isMobileForPopup = useMediaQuery('(max-width:735px)');
  const [infoFilterTasks, setInfoFilterTasks] =
    useState<IFilterValues>(defaultObjFilteres);
  const [filterTasks, setFilterTasks] = useState<Task[]>([]);
  useEffect(() => {
    handleFilterTasks(tasks, setFilterTasks, infoFilterTasks);
    // eslint-disable-next-line
  }, [tasks, infoFilterTasks.sortBy, infoFilterTasks.categories]);

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
          isStatusActive={!isUnConfirmed ? false : true}
          tasks={!isUnConfirmed ? filterTasks : []}
          isLoading={isLoading}
        />
      )}
      {isPopupOpen && <Request isMobile={isMobileForPopup} />}
    </>
  );
}
