import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { SideMenuForAuthorized } from 'widgets/side-menu';
import { UserInfo } from 'entities/user';
import { fetchActiveTasks } from 'entities/task/model';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { ContentLayout } from 'shared/ui/content-layout';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Filter } from 'features/filter';

import styles from './styles.module.css';
import { Dialog } from 'shared/ui/dialog';

export function ProfileActivePage() {
  const dispatch = useAppDispatch();

  const { tasks } = useAppSelector((store) => store.tasks);
  const { role } = useAppSelector((state) => state.user);

  const isMobile = useMediaQuery('(max-width:1150px)');

  useEffect(() => {
    dispatch(fetchActiveTasks());
  }, []);

  return (
    <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo />
          </div>

          <SideMenuForAuthorized />
        </>
      }
      content={
        <ContentLayout
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
          <TaskList
            userRole={role}
            isMobile={isMobile}
            handleClickCloseButton={() => 2}
            handleClickConfirmButton={() => 3}
            handleClickMessageButton={() => 5}
            handleClickPnoneButton={() => 6}
            isStatusActive
            tasks={tasks}
          />

          {/* Примеры всех диалоговых окон */}
          <Dialog
            isExitButton={true}
            title="Благодарим за отзывчивость"
            text="Мы ждем ответ реципиента"
            isSuccessfulyClosed
          />
          <Dialog
            isExitButton={true}
            title="Благодарю за отзывчивость"
            isTaskResponseIcon
            isContent
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            title="Вы точно хотите отменить заявку?"
            isTaskClosingBeforePublicationRecipient
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            title="До начала заявки менее 24 часа"
            text="Вы не можете отменить заявку самостоятельно."
            isTaskResponse
            isContent
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            title="На заявку откликнулись"
            text="Вы не можете отменить или отредактировать заявку самостоятельно."
            isTaskResponse
            isContent
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            title="Подтвердите, что заявка не выполнена"
            isTaskCancelation
            isContent
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            title="Укажите причину отмены"
            isTaskCancelationReason
            isContent
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            text="Закрыть окно сейчас и удалить ранее внесенную информацию?"
            isTaskClosingBeforePublicationRecipient
            isContent
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            text="При закрытии чат будет завершен и станет доступен всем администраторам"
            isTaskClosingBeforePublicationMaster
            isContent
          />
          <Dialog
            isExitButton={true}
            isGroupButton={true}
            text="Удалить публикацию?"
            isDeletePublication
            isContent
          />
          <Dialog
            isExitButton={true}
            text="Такая заявка уже существует. Дождитесь ее выполнения."
            isTaskOnMap
          />
          <Dialog
            isExitButton={true}
            title="Смена пароля"
            isContent
            isGroupButton
            isChangePassword
          />
          <Dialog
            isExitButton={true}
            title="Как закрыть заявку?"
            isContent
            isTaskClose
          />
        </ContentLayout>
      }
    />
  );
}
