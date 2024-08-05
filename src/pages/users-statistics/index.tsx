import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import styles from './styles.module.css';
import { PageSubMenuAdminStatistics } from 'widgets/page-sub-menu/components/page-sub-menu-admin-statistics/page-sub-menu-admin-statistics';
import { Accordion } from 'shared/ui/accordion';
import { Button } from 'shared/ui/button';
import Fieldset from 'shared/ui/fieldset';
import { FieldsetView } from 'shared/ui/fieldset/utils';
import { ButtonsNameForStatisticsPage } from 'pages/application-statistics';
import { useState } from 'react';
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
  const [statusAccordion, setStatusAccordion] = useState<string | null>(null);
  const [roleAccordion, setRoleAccordion] = useState<string | null>(null);

  const handleStatusAccordion = (value: string) => {
    setStatusAccordion(value);
  };

  const handleRoleAccordion = (value: string) => {
    setRoleAccordion(value);
  };
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formData = {
      userStatus: statusAccordion,
      userRole: roleAccordion,
    };
  };

  const { control, handleSubmit } = useForm<IFormInput>();

  const disabledButton = !statusAccordion || !roleAccordion;
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
          <Fieldset title="Роль" view={FieldsetView.ROW}>
            <div className={styles.role__fields}>
              <Controller
                name="usersRoleOptions"
                control={control}
                render={() => (
                  <Accordion
                    name="user_role"
                    arrayOptions={usersRoleOptions}
                    onChange={handleRoleAccordion}
                    placeholder={String(
                      usersRoleOptions.find((n) => n.value === roleAccordion)
                        ?.label || 'Выберите роль'
                    )}
                  />
                )}
              />
            </div>
          </Fieldset>
        </div>
        <div className={styles.status}>
          <Fieldset title="Статус" view={FieldsetView.COLUMN}>
            <div className={styles.status_fields}>
              <Controller
                name="usersStatusOptions"
                control={control}
                render={() => (
                  <Accordion
                    name="user_status"
                    arrayOptions={usersStatusOptions}
                    onChange={handleStatusAccordion}
                    placeholder={String(
                      usersStatusOptions.find(
                        (n) => n.value === statusAccordion
                      )?.label || 'Выберите статус'
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
            id={ButtonsNameForStatisticsPage.generateReport}
            name={ButtonsNameForStatisticsPage.generateReport}
            disabled={disabledButton}
          />
          <Button
            buttonType="secondary"
            label="Скачать отчет"
            actionType="submit"
            id={ButtonsNameForStatisticsPage.downloadReport}
            name={ButtonsNameForStatisticsPage.downloadReport}
            disabled={disabledButton}
            customIcon={<Icon color="blue" icon="ExcelIcon" />}
          />
        </div>
      </form>
    </>
  );
};
