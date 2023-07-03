import { useEffect, useState } from "react";
import classnames from "classnames";
import { format, parseISO } from "date-fns";
import { DatePicker } from "shared/ui/date-picker";
import { CategoriesBlock } from "../../categories-block";
import styles from "../../styles.module.css";
import { TVolunteerFilter } from "../../types";
import { RadiusBlock } from "../../radius-block";

interface Props {
  filter: TVolunteerFilter;
  onChange: (name: string, value: string[] | string) => void;
  modeOfProfile: string;
}
  
export const MapMode = ({ filter, onChange, modeOfProfile }: Props) => {
  const [isCalenderMobil, setIsCalenderMobil] = useState(false);

  const handleDateChange = (date: Date) => {
    const formatedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
    onChange("date", formatedDate);
  };

  // определение того, в каком виде должен быть календарь: десктопном или мобильном, в том числе
  // для случаев, когда изменение размера экрана происходит из-за изменения размера браузера
  const setTypeCalender = () => {
    if (window.innerWidth <= 768) {
      setIsCalenderMobil(true);
    } else {
      setIsCalenderMobil(false);
    }
  };
  // получение текущей даты (без времени внутри суток)
  function getNewDate() {
    const newDate = new Date();
    return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
  }
  useEffect(() => {
    setTypeCalender();
    window.addEventListener('resize', setTypeCalender);
    return () => {window.removeEventListener('resize', setTypeCalender)};
  }, []);

  return (
    <>
      <CategoriesBlock filter={filter.categories} onChange={onChange} />
      <RadiusBlock filter={filter.searchRadius} onChange={onChange} modeOfProfile={modeOfProfile}/>    
      
      <div className={styles.filterBlock}>
        <div
          className={classnames(
            styles.filterBlockTitle,
            "text",
            "text_size_small",
            "text_type_bold"
          )}
        >
          Дата и время
        </div>
        <div>
          <DatePicker
            value={filter.date ? parseISO(filter.date) : getNewDate()}
            isMobile={isCalenderMobil}
            onChangeValue={handleDateChange}
          />
        </div>
      </div>
    </>
  );
};
  