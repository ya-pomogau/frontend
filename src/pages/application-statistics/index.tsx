import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { PageSubMenuAdminStatistics } from 'widgets/page-sub-menu/components/page-sub-menu-admin-statistics/page-sub-menu-admin-statistics';
import styles from './styles.module.css';
import Fieldset from 'shared/ui/fieldset';
import { fieldsetView } from 'shared/ui/fieldset/utils';
import { Accordion } from 'shared/ui/accordion';
import Checkbox from 'shared/ui/checkbox';
import { Button } from 'shared/ui/button';
import DatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-duplicates
import { ru } from 'date-fns/locale';
// eslint-disable-next-line import/no-duplicates
import { addYears } from 'date-fns';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { customHeader } from 'shared/ui/date-picker';
import { ValueOf } from 'shared/types/common.types';

interface IStatusApplicationOptions {
  value: 'open' | 'atWork' | 'close';
  label: 'Открытые' | 'В работе' | 'Закрытые';
}

export const buttonsNameForStatisticsPage = {
  generateReport: 'generateReport',
  downloadReport: 'downloadReport',
} as const;

export type ButtonsNameForStatisticsPage = ValueOf<
  typeof buttonsNameForStatisticsPage
>;

export const fieldsName = {
  to: 'to',
  from: 'from',
} as const;

export type FieldsName = ValueOf<typeof fieldsName>;

interface IFormInput {
  period: {
    from: Date | null;
    to: Date | null;
  };
  statusApplication: string;
  currentStatusApplication?: boolean;
}

const statusApplicationOptions: Array<IStatusApplicationOptions> = [
  { value: 'open', label: 'Открытые' },
  { value: 'atWork', label: 'В работе' },
  { value: 'close', label: 'Закрытые' },
];
const templateDatePeriod = 'дд.мм.гггг';
const templateDateFormat = 'dd.MM.yyyy';

export const ApplicationsStatisticsPage = () => {
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(`this is data ===>`, data);
  };

  const { control, watch, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      period: {
        from: null,
        to: null,
      },
      statusApplication: '',
      currentStatusApplication: false,
    },
  });

  const disabledButton =
    !watch('period.from') || !watch('period.to') || !watch('statusApplication');

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
        <div className={styles.period}>
          <Fieldset title="Период" view={fieldsetView.ROW}>
            <div className={styles.period__fields}>
              <p className={styles.period__points}>от</p>
              <Controller
                name="period.from"
                control={control}
                render={({ field: { value, name, onChange } }) => (
                  <DatePicker
                    dateFormat={templateDateFormat}
                    selected={value}
                    name={name}
                    onChange={onChange}
                    placeholderText={templateDatePeriod}
                    maxDate={watch('period.to') || new Date()}
                    minDate={addYears(new Date(), -2)}
                    className={styles.period__input_field}
                    renderCustomHeader={customHeader}
                    locale={ru}
                    calendarClassName={styles.dataPicker__calendar}
                  />
                )}
              />
              <p className={styles.period__points}>до</p>
              <Controller
                name="period.to"
                control={control}
                render={({ field: { value, name, onChange } }) => (
                  <DatePicker
                    dateFormat={templateDateFormat}
                    selected={value}
                    name={name}
                    onChange={onChange}
                    placeholderText={templateDatePeriod}
                    maxDate={new Date()}
                    minDate={watch('period.from') || addYears(new Date(), -2)}
                    className={styles.period__input_field}
                    renderCustomHeader={customHeader}
                    calendarClassName={styles.dataPicker__calendar}
                    locale={ru}
                  />
                )}
              />
            </div>
          </Fieldset>
        </div>
        <div className={styles.status_application}>
          <Fieldset title="Статус заявки" view={fieldsetView.COLUMN}>
            <Controller
              name="statusApplication"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Accordion
                  name="status_application"
                  arrayOptions={statusApplicationOptions}
                  onChange={onChange}
                  placeholder={String(
                    statusApplicationOptions.find((n) => n.value === value)
                      ?.label || 'Выберите статус заявки'
                  )}
                />
              )}
            />
          </Fieldset>
        </div>
        <Controller
          name="currentStatusApplication"
          control={control}
          render={({ field: { onChange } }) => (
            <Checkbox
              label="Статус на данный момент"
              name="currentStatusApplication"
              id="currentStatusApplication"
              extClassName={styles.current_status_application_checkbox}
              onChange={onChange}
            />
          )}
        />
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
            customIcon={<Icon icon="ExcelIcon" color="blue" />}
          />
        </div>
      </form>
    </>
  );
};
