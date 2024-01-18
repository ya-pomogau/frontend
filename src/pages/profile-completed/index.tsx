import { useAppSelector } from 'app/hooks';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';

import { Filter } from 'features/filter';
import { useGetTasksByStatusQuery } from 'services/tasks-api';
import { Loader } from 'shared/ui/loader';
import { CONFIRMED } from 'shared/libs/statuses';

export function ProfileCompletedPage() {
  const isMobile = useMediaQuery('(max-width:1150px)');
  const { data: tasks, isLoading } = useGetTasksByStatusQuery('completed');
  const { role, data } = useAppSelector((state) => state.user);
  const isConfirmed = data?.status === CONFIRMED;
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
          ) : isConfirmed ? (
            <Filter
              items={{
                sort: true,
                categories: true,
                radius: false,
                date: false,
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
          userRole="volunteer"
          isMobile={isMobile}
          isStatusActive={false}
          tasks={isConfirmed ? tasks : []}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
