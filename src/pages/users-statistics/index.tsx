import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import styles from './styles.module.css';
import { PageSubMenuAdminStatistics } from 'widgets/page-sub-menu/components/page-sub-menu-admin-statistics/page-sub-menu-admin-statistics';
import { Accordion } from 'shared/ui/accordion';
import { Button } from 'shared/ui/button';
import Fieldset from 'shared/ui/fieldset';
import { fieldsetView } from 'shared/ui/fieldset/utils';
import { buttonsNameForStatisticsPage } from 'pages/application-statistics';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface IUsersRoleOptions {
  value: 'Volunteer' | 'Recipient';
  label: 'Волонтер' | 'Реципиент';
}

interface IUsersStatusOptions {
  value: 'new' | 'activ' | 'notActive' | 'blocked';
  label: 'Новый' | 'Активный' | 'Не активный' | 'Заблокированный';
}

interface IFormInput {
  usersRoleOptions: string;
  usersStatusOptions: string;
}

export const usersRoleOptions: Array<IUsersRoleOptions> = [
  { value: 'Volunteer', label: 'Волонтер' },
  { value: 'Recipient', label: 'Реципиент' },
];

export const usersStatusOptions: Array<IUsersStatusOptions> = [
  { value: 'new', label: 'Новый' },
  { value: 'activ', label: 'Активный' },
  { value: 'notActive', label: 'Не активный' },
  { value: 'blocked', label: 'Заблокированный' },
];

export const UsersStatisticsPage = () => {
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formData = {
      userStatus: watch('usersStatusOptions'),
      userRole: watch('usersRoleOptions'),
    };
  };

  const { control, handleSubmit, watch } = useForm<IFormInput>({
    defaultValues: {
      usersRoleOptions: '',
      usersStatusOptions: '',
    },
  });

  const disabledButton =
    !watch('usersStatusOptions') || !watch('usersRoleOptions');
  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="StatisticIcon" size="54" />}
        text="Статистика"
      />
      <PageSubMenuAdminStatistics />
      <form
        id="applicationStatisticForm"
        name="applicationStatisticForm"
        className={styles.wrapper}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.role}>
          <Fieldset title="Роль" view={fieldsetView.ROW}>
            <div className={styles.role__fields}>
              <Controller
                name="usersRoleOptions"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Accordion
                    name="user_role"
                    arrayOptions={usersRoleOptions}
                    onChange={onChange}
                    placeholder={String(
                      usersRoleOptions.find((n) => n.value === value)?.label ||
                        'Выберите роль'
                    )}
                  />
                )}
              />
            </div>
          </Fieldset>
        </div>
        <div className={styles.status}>
          <Fieldset title="Статус" view={fieldsetView.COLUMN}>
            <div className={styles.status_fields}>
              <Controller
                name="usersStatusOptions"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Accordion
                    name="user_status"
                    arrayOptions={usersStatusOptions}
                    onChange={onChange}
                    placeholder={String(
                      usersStatusOptions.find((n) => n.value === value)
                        ?.label || 'Выберите статус'
                    )}
                  />
                )}
              />
            </div>
          </Fieldset>
        </div>
        <div className={styles.buttons_container}>
          <Button
            buttonType="primary"
            label="Сформировать отчет"
            actionType="submit"
            id={buttonsNameForStatisticsPage.generateReport}
            name={buttonsNameForStatisticsPage.generateReport}
            disabled={disabledButton}
          />
          <Button
            buttonType="secondary"
            label="Скачать отчет"
            actionType="submit"
            id={buttonsNameForStatisticsPage.downloadReport}
            name={buttonsNameForStatisticsPage.downloadReport}
            disabled={disabledButton}
            customIcon={<Icon color="blue" icon="ExcelIcon" />}
          />
        </div>
      </form>
    </>
  );
};
