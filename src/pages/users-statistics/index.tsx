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

interface IUsersRoleOptions {
  value: 'volunteer' | 'recipient';
  label: 'Волонтер' | 'Реципиент';
}

interface IUsersStatusOptions {
  value: 'new' | 'activ' | 'notActive' | 'blocked';
  label: 'Новый' | 'Активный' | 'Не активный' | 'Заблокированный';
}

export const usersRoleOptions: Array<IUsersRoleOptions> = [
  { value: 'volunteer', label: 'Волонтер' },
  { value: 'recipient', label: 'Реципиент' },
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
  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    const buttonName = e.nativeEvent.submitter as HTMLButtonElement;
    const formData = {
      userStatus: statusAccordion,
      userRole: roleAccordion,
    };
    if (buttonName.name === ButtonsNameForStatisticsPage.downloadReport) {
      console.log(formData);
    }
    if (buttonName.name === ButtonsNameForStatisticsPage.generateReport) {
      console.log(formData);
    }
  };

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
        onSubmit={handleSubmit}
      >
        <div className={styles.role}>
          <Fieldset title="Роль" view={FieldsetView.ROW}>
            <div className={styles.role__fields}>
              <Accordion
                name="user_role"
                arrayOptions={usersRoleOptions}
                onChange={handleRoleAccordion}
                placeholder="Выберите роль"
              />
            </div>
          </Fieldset>
        </div>
        <div className={styles.status}>
          <Fieldset title="Статус" view={FieldsetView.COLUMN}>
            <div className={styles.status_fields}>
              <Accordion
                name="user_status"
                arrayOptions={usersStatusOptions}
                onChange={handleStatusAccordion}
                placeholder="Выберите статус"
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
