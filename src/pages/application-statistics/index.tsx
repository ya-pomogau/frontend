import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { PageSubMenuAdminStatistics } from 'widgets/page-sub-menu/components/page-sub-menu-admin-statistics/page-sub-menu-admin-statistics';
import styles from './styles.module.css';
import Fieldset from 'shared/ui/fieldset';
import { FieldsetView } from 'shared/ui/fieldset/utils';
import { Accordion } from 'shared/ui/accordion';
import Checkbox from 'shared/ui/checkbox';
import { Button } from 'shared/ui/button';
import { ReactNode, useState } from 'react';
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { addYears } from 'date-fns';
import { StepButton } from 'shared/ui/step-button';
import { getMonth } from 'shared/ui/date-picker/lib';
import ru from 'date-fns/locale/ru';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface IStatusApplicationOptions {
  value: 'open' | 'atWork' | 'close';
  label: 'Открытые' | 'В работе' | 'Закрытые';
}

export enum ButtonsNameForStatisticsPage {
  generateReport = 'generateReport',
  downloadReport = 'downloadReport',
}

export enum FieldsName {
  to = 'to',
  from = 'from',
}

interface IFormInput {
  period: {
    from: Date;
    to: Date;
  };
  statusApplication: string;
  currentStatusApplication?: boolean;
}

function customHeader({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps): ReactNode {
  const month = getMonth(date);

  return (
    <div className={styles.datePicker__calendarHeader}>
      <StepButton
        direction="left"
        onClick={decreaseMonth}
        type="button"
        disabled={prevMonthButtonDisabled}
      />
      <div>
        <span className={styles.datePicker__headerMonth}>{month}</span>
      </div>
      <StepButton
        direction="right"
        onClick={increaseMonth}
        type="button"
        disabled={nextMonthButtonDisabled}
      />
    </div>
  );
}

const statusApplicationOptions: Array<IStatusApplicationOptions> = [
  { value: 'open', label: 'Открытые' },
  { value: 'atWork', label: 'В работе' },
  { value: 'close', label: 'Закрытые' },
];
const templateDatePeriod = 'дд.мм.гггг';
const templateDateFormat = 'dd.MM.yyyy';

export const ApplicationsStatisticsPage = () => {
  const [selectedCategoryFromAccordion, setSelectedCategoryFromAccordion] =
    useState<string | null>(null);

  const [period, setPeriod] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });

  const [
    currentStatusApplicationCheckbox,
    setCurrentStatusApplicationCheckbox,
  ] = useState<boolean>(false);

  const handleFormAccordion = (value: string) => {
    setSelectedCategoryFromAccordion(value);
  };

  const handleInputDate = (
    periodField: string,
    date: Date,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    switch (periodField) {
      case 'from':
        setPeriod({ ...period, from: date });
        break;
      case 'to':
        setPeriod({ ...period, to: date });
        break;
      default:
        return;
    }
  };

  const handleCurrentStatusApplicationCheckbox = () => {
    setCurrentStatusApplicationCheckbox(!currentStatusApplicationCheckbox);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formData = {
      period: {
        from: watch('period.from'),
        to: watch('period.to'),
      },
      statusApplication: selectedCategoryFromAccordion,
      currentStatusApplication: currentStatusApplicationCheckbox,
    };
    console.log(data)
  };

  const { control, handleSubmit, watch } = useForm<IFormInput>();

  const disabledButton =
    !selectedCategoryFromAccordion || !period.from || !period.to;

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
          <Fieldset title="Период" view={FieldsetView.ROW}>
            <div className={styles.period__fields}>
              <p className={styles.period__points}>от</p>
              <Controller
                name="period.from"
                control={control}
                render={() => (
                  <DatePicker
                    dateFormat={templateDateFormat}
                    selected={period.from}
                    name={FieldsName.from}
                    onChange={(
                      date: Date,
                      e: React.SyntheticEvent<HTMLInputElement, Event>
                    ) => {
                      handleInputDate(FieldsName.from, date, e);
                    }}
                    placeholderText={templateDatePeriod}
                    maxDate={period.to || new Date()}
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
                render={() => (
                  <DatePicker
                    dateFormat={templateDateFormat}
                    selected={period.to}
                    name={FieldsName.to}
                    onChange={(
                      date: Date,
                      e: React.SyntheticEvent<HTMLInputElement, Event>
                    ) => {
                      handleInputDate(FieldsName.to, date, e);
                    }}
                    placeholderText={templateDatePeriod}
                    maxDate={new Date()}
                    minDate={period.from || addYears(new Date(), -2)}
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
          <Fieldset title="Статус заявки" view={FieldsetView.COLUMN}>
            <Accordion
              name="status_application"
              arrayOptions={statusApplicationOptions}
              onChange={handleFormAccordion}
              placeholder={String(statusApplicationOptions.find(n => n.value === selectedCategoryFromAccordion)?.label || 'Выберите статус заявки')}
            />
          </Fieldset>
        </div>
        <Checkbox
          label="Статус на данный момент"
          name="currentStatusApplication"
          id="currentStatusApplication"
          extClassName={styles.current_status_application_checkbox}
          onChange={handleCurrentStatusApplicationCheckbox}
        />
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
            customIcon={<Icon icon="ExcelIcon" color="blue" />}
          />
        </div>
      </form>
    </>
  );
};
