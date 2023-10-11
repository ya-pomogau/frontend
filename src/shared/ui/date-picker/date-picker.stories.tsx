import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { DatePicker } from '.';

const meta: Meta<typeof DatePicker> = {
  title: 'uikit/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Выбранная дата',
      control: 'date',
    },
    onChangeValue: {
      description: 'Обработчик события изменения даты',
    },
    isMobile: {
      description: 'Переключение версии календаря',
      control: 'boolean',
    },
    minDate: {
      description:
        "Необязательный параметр. Позволяет установить минимальную дату, которую возможно выбрать. Более ранние даты будут недоступны. По умолчанию значение данного параметра - текущий день. Если передать значение 'null', то данное ограничение отменяется.",
      control: 'date',
    },
    inline: {
      description:
        "Необязательный параметр. Позволяет определить модификацтю календаря: 'true' - обычный календарь; 'false' - кнопка, отражающая дату, при нажати на которую вызывается календарь для выбора даты.",
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface IApplyDatePickerInEnvironment {
  inline: boolean;
  isMobile: boolean;
}

const ApplyDatePickerInEnvironment = ({
  inline,
  isMobile,
}: IApplyDatePickerInEnvironment) => {
  function getNewDate() {
    return parseISO(format(new Date(), 'yyyy-MM-dd'));
  }
  const [dateValue, setDateValue] = useState(getNewDate());
  const handleDateChange = (date: Date) => {
    const formatedDate = format(date, 'yyyy-MM-dd');
    setDateValue(parseISO(formatedDate));
  };
  return (
    <>
      <p style={{ height: '50px' }}>
        Выбраная дата - {format(dateValue, 'yyyy-MM-dd')}
      </p>
      <div style={{ height: '300px' }}>
        <DatePicker
          value={dateValue}
          onChangeValue={handleDateChange}
          inline={inline}
          isMobile={isMobile}
        />
      </div>
    </>
  );
};

export const Primary: Story = {
  /**
   * Пример использования: 
     
     
     import { useState } from "react";
     import { format, parseISO } from "date-fns";
     import { DatePicker } from "./date-picker";
     
     () => {
       function getNewDate() {
         return parseISO(format(new Date(), "yyyy-MM-dd"));
       }
       const [ dateValue, setDateValue] = useState(getNewDate());
       const handleDateChange = (date: Date) => {
         const formatedDate = format(date, "yyyy-MM-dd");
         setDateValue(parseISO(formatedDate));
       };
       return (
         <DatePicker value={dateValue} onChangeValue={handleDateChange}/>
       )
     };
   */
  render: () => <ApplyDatePickerInEnvironment inline isMobile={false} />,
};

export const Mobile: Story = {
  /**
   * Пример использования: 
     
     
     import { useState } from "react";
     import { format, parseISO } from "date-fns";
     import { DatePicker } from "./date-picker";
     
     () => {
       function getNewDate() {
         return parseISO(format(new Date(), "yyyy-MM-dd"));
       }
       const [ dateValue, setDateValue] = useState(getNewDate());
       const handleDateChange = (date: Date) => {
         const formatedDate = format(date, "yyyy-MM-dd");
         setDateValue(parseISO(formatedDate));
       };
       return (
         <DatePicker value={dateValue} onChangeValue={handleDateChange} isMobile/>
       )
     };
   */
  render: () => <ApplyDatePickerInEnvironment inline isMobile />,
};

export const MobileTypeButton: Story = {
  /**
   * Пример использования: 
     
     
     import { useState } from "react";
     import { format, parseISO } from "date-fns";
     import { DatePicker } from "./date-picker";
     
     () => {
       function getNewDate() {
         return parseISO(format(new Date(), "yyyy-MM-dd"));
       }
       const [ dateValue, setDateValue] = useState(getNewDate());
       const handleDateChange = (date: Date) => {
         const formatedDate = format(date, "yyyy-MM-dd");
         setDateValue(parseISO(formatedDate));
       };
       return (
         <DatePicker value={dateValue} onChangeValue={handleDateChange} inline={false} isMobile/>
       )
     };
   */
  render: () => <ApplyDatePickerInEnvironment inline={false} isMobile />,
};
