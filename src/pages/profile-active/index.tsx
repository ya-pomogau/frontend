import { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
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

export function ProfileActivePage() {
  const dispatch = useAppDispatch();

  const { tasks } = useAppSelector((store) => store.tasks);
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

  const buttonRef = useRef<HTMLButtonElement>(null);
  const tasksRef = useRef<HTMLDivElement>(null);

  return (
    <PageLayout
      content={
        <ContentLayout
          componentRef={tasksRef}
          heading={
            <SmartHeader
              text="Активные заявки"
              icon={
                <Icon color="blue" icon="ActiveApplicationIcon" size="54" />
              }
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
          }
        >
          <div ref={tasksRef}>
            <TaskList
              buttonRef={buttonRef}
              userRole={role}
              isMobile={isMobile}
              handleClickCloseButton={() => 2}
              handleClickConfirmButton={() => {
                toggleDialog();
              }}
              handleClickMessageButton={() => 5}
              handleClickPnoneButton={() => 6}
              isStatusActive
              tasks={tasks}
            />
          </div>

          {taskStartedDialog && (
            <Dialog
              isExitButton={true}
              buttonRef={buttonRef}
              tasksRef={tasksRef}
              title="Благодарим за отзывчивость"
              text="Мы ждем ответ реципиента"
              isTaskStarted
              changeVisible={toggleDialog}
              isMobile={isMobileForPopup}
            />
          )}

          {/* Примеры всех диалоговых окон пока без колбэков */}

          {/* <Dialog
            isExitButton={true}
            title="Благодарю за отзывчивость"
            isTaskResponseIcon
            isContent
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            title="Вы точно хотите отменить заявку?"
            isTaskClosingBeforePublicationRecipient
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            title="До начала заявки менее 24 часа"
            text="Вы не можете отменить заявку самостоятельно."
            isTaskResponse
            isContent
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            title="На заявку откликнулись"
            text="Вы не можете отменить или отредактировать заявку самостоятельно."
            isTaskResponse
            isContent
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            title="Подтвердите, что заявка не выполнена"
            isTaskCancelation
            isContent
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            title="Укажите причину отмены"
            isTaskCancelationReason
            isContent
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            text="Закрыть окно сейчас и удалить ранее внесенную информацию?"
            isTaskClosingBeforePublicationRecipient
            isContent
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            text="При закрытии чат будет завершен и станет доступен всем администраторам"
            isTaskClosingBeforePublicationMaster
            isContent
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            text="Удалить публикацию?"
            isDeletePublication
            isContent
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            text="Такая заявка уже существует. Дождитесь ее выполнения."
            isTaskOnMap
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            title="Смена пароля"
            isContent
            isGroupButton
            isChangePassword
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            title="Как закрыть заявку?"
            isContent
            isTaskClose
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            title="Не выполнена"
            text={`Причина: ${CancelationReasonIds.CANT_COME_IN}`}
            isContent
            isTaskUndone
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          />
          <Dialog
            isExitButton={true}
            title="Извините"
            text={`Эту заявку взяли в работу и откликнуться уже нельзя`}
            isContent
            isTaskTaken
            isMobile={isMobileForPopup}
            changeVisible={toggleDialog}
          /> */}
        </ContentLayout>
      }
    />
  );
}
