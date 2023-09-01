import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchCompletedTasks } from 'entities/task/model';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

import { Filter } from 'features/filter';

export function ProfileCompletedPage() {
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery('(max-width:1150px)');

  const { tasks } = useAppSelector((store) => store.tasks);
  const { role } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCompletedTasks());
  }, []);

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="CompletedApplicationIcon" size="54" />}
        text="Завершенные заявки"
        filter={
          role === 'volunteer' ? (
            <Filter
              items={{
                sort: true,
                categories: false,
                radius: false,
                date: false,
              }}
            />
          ) : (
            <Filter
              items={{
                sort: true,
                categories: true,
                radius: false,
                date: false,
              }}
            />
          )
        }
      />
      <TaskList
        userRole="volunteer"
        isMobile={isMobile}
        handleClickCloseButton={() => 2}
        handleClickConfirmButton={() => 3}
        handleClickMessageButton={() => 5}
        handleClickPnoneButton={() => 6}
        isStatusActive={false}
        tasks={tasks}
      />
    </>
  );
}
