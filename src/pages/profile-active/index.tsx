import { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Filter } from 'features/filter';
import { fetchActiveTasks } from 'entities/task/model';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Filter } from 'features/filter';

import styles from './styles.module.css';
import { PageLayout } from 'shared/ui/page-layout';
import { SideMenuForAuthorized } from 'widgets/side-menu';
import { ContentLayout } from 'shared/ui/content-layout';
import { Dialog } from 'shared/ui/dialog';
import { CancelationReasonIds } from 'shared/ui/dialog/consts';
import { openPopup } from 'features/create-request/model';
import { Request } from 'features/create-request';
import { useGetTasksByStatusQuery } from 'services/tasks-api';
import { Loader } from 'shared/ui/loader';

export function ProfileActivePage() {
  const dispatch = useAppDispatch();
  const { data: tasks, isLoading } = useGetTasksByStatusQuery('active');
  const { role } = useAppSelector((state) => state.user);

  const [taskStartedDialog, setTaskStartedDialog] = useState(false);

  const toggleDialog = () => {
    setTaskStartedDialog(!taskStartedDialog);
  };

  const isMobile = useMediaQuery('(max-width:1150px)');

  const { isPopupOpen } = useAppSelector((store) => store.createRequest);
  const isMobileForPopup = useMediaQuery('(max-width:735px)');

  useEffect(() => {
    dispatch(fetchActiveTasks());
  }, []);

  return (
    <>
      <SmartHeader
        text="Активные заявки"
        icon={<Icon color="blue" icon="ActiveApplicationIcon" size="54" />}
        filter={
          role === 'volunteer' ? (
            <Filter
              items={{
                sort: true,
                categories: true,
                radius: true,
                date: false,
                time: true,
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
        userRole={role}
        isMobile={isMobile}
        handleClickCloseButton={() => 2}
        handleClickConfirmButton={() => 3}
        handleClickMessageButton={() => 5}
        handleClickPnoneButton={() => 6}
        handleClickAddTaskButton={() => dispatch(openPopup())}
        isStatusActive
        tasks={tasks}
      />

      {isPopupOpen && <Request isMobile={isMobileForPopup} />}
    </>
  );
}
