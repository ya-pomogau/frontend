import { useCallback, useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
// import { fetchActiveTasks } from 'entities/task/model';
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
  const [taskCancelDialog, setTaskCancelDialog] = useState(false);
  const [taskCancelReasonDialog, setTaskCancelReasonDialog] = useState(false);

  const toggleDialog = (type: string) => {
    switch (type) {
      case 'taskStartedDialog':
        setTaskStartedDialog(!taskStartedDialog);
        break;
      case 'taskCancelReasonDialog':
        setTaskCancelReasonDialog(!taskCancelReasonDialog);
        break;
      case 'taskCancelDialog':
        setTaskCancelDialog(!taskCancelDialog);
        break;
      default:
        break;
    }
  };

  const isMobile = useMediaQuery('(max-width:1150px)');

  const { isPopupOpen } = useAppSelector((store) => store.createRequest);
  const isMobileForPopup = useMediaQuery('(max-width:735px)');

  useEffect(() => {
    // dispatch(fetchActiveTasks());
  }, []);

  // const [dialogPosition, setDialogPosition] = useState({
  //   top: `${0}px`,
  //   right: `${0}px`,
  // });

  // const calculateDialogPosition = useCallback(() => {
  //   const buttonRect = buttonRef?.current?.getBoundingClientRect();

  //   if (buttonRect) {
  //     setDialogPosition({
  //       top: `${buttonRect?.bottom}px`,
  //       right: `${window.innerWidth - buttonRect?.right - 10}px`,
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   calculateDialogPosition();
  //   window.addEventListener('resize', calculateDialogPosition);
  //   window.addEventListener('scroll', calculateDialogPosition);
  //   if (tasksRef?.current) {
  //     tasksRef.current.addEventListener('scroll', calculateDialogPosition);
  //   }
  //   console.log(dialogPosition);

  //   return () => {
  //     window.removeEventListener('resize', calculateDialogPosition);
  //     window.removeEventListener('scroll', calculateDialogPosition);
  //   };
  // }, []);

  // useEffect(() => {
  //   document.addEventListener('keydown', handleEscKeydown);
  //   return () => {
  //     document.removeEventListener('keydown', handleEscKeydown);
  //   };
  // }, []);

  // const handleEscKeydown = (e: { key: string }) => {
  //   e.key === 'Escape' && toggleDialog('');
  // };

  const buttonRef = useRef<HTMLButtonElement>(null);
  // const buttonRef = useRef<any>(null);
  const tasksRef = useRef<HTMLDivElement>(null);

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

      {isLoading ? (
        <Loader />
      ) : (
        <div ref={tasksRef}>
          <TaskList
            buttonRef={buttonRef}
            userRole={role}
            isMobile={isMobile}
            handleClickCloseButton={() =>
              toggleDialog('taskCancelReasonDialog')
            }
            handleClickConfirmButton={() => toggleDialog('taskStartedDialog')}
            handleClickConflictButton={() => toggleDialog('taskCancelDialog')}
            handleClickEditButton={() => toggleDialog('')}
            handleClickMessageButton={() => 5}
            handleClickPnoneButton={() => 6}
            handleClickAddTaskButton={() => dispatch(openPopup())}
            isStatusActive={true}
            tasks={tasks}
            isLoading={isLoading}
          />
        </div>
      )}

      {taskStartedDialog && (
        <Dialog
          isExitButton={true}
          buttonRef={buttonRef}
          tasksRef={tasksRef}
          title="Благодарим за отзывчивость"
          text="Мы ждем ответ реципиента"
          isTaskStarted
          changeVisible={() => toggleDialog('taskStartedDialog')}
          isMobile={isMobileForPopup}
        />
      )}
      {taskCancelReasonDialog && (
        <Dialog
          isExitButton={true}
          isGroupButton={true}
          title="Укажите причину отмены"
          isTaskCancelationReason
          isContent
          isMobile={isMobileForPopup}
          changeVisible={() => toggleDialog('taskCancelReasonDialog')}
        />
      )}
      {taskCancelDialog && (
        <Dialog
          isExitButton={true}
          isGroupButton={true}
          title="Подтвердите, что заявка не выполнена"
          isTaskCancelation
          isContent
          isMobile={isMobileForPopup}
          changeVisible={() => toggleDialog('taskCancelDialog')}
        />
      )}

      {isPopupOpen && <Request isMobile={isMobileForPopup} />}
    </>
  );
}
