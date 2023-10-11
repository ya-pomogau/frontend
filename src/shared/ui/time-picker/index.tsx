import { RefObject, useRef, useState } from 'react';
import styles from './styles.module.css';
import { TimePickerPopup } from '../time-picker-popup';

export interface ITimePickerElement {
  isMobile?: boolean;
  buttonRef: RefObject<HTMLElement> | undefined;
  startTime?: string;
  setStartTime?: React.Dispatch<React.SetStateAction<string>>;
  endTime?: string;
  setEndTime?: React.Dispatch<React.SetStateAction<string>>;
}

export function TimePickerElement({
  isMobile,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: ITimePickerElement) {
  const buttonRef = useRef<HTMLInputElement>(null);
  const [isOpenClockElement, setIsOpenClockElement] = useState(false);

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.type = 'time';
    setIsOpenClockElement(true);
  };

  const handleSetTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (startTime && setStartTime) {
      setStartTime(e.target.value);
    } else if (endTime && setEndTime) {
      setEndTime(e.target.value);
    }
  };

  const handleAcceptTime = () => {
    setIsOpenClockElement(false);
  };

  return (
    <div className={styles.timePickerContainer}>
      <input
        value={startTime ? startTime : endTime}
        onChange={handleSetTime}
        type="text"
        id="timepicker"
        className={styles.timePickerContainer__input}
        placeholder="_ _ : _ _"
        onFocus={(e) => handleFocus(e)}
        onBlur={(e) => (e.target.type = 'text')}
        minLength={2}
        maxLength={2}
        min={0}
        max={23}
        required
        ref={buttonRef}
      />
      {isMobile && isOpenClockElement && (
        <div>
          <TimePickerPopup
            isPopupOpen={isOpenClockElement}
            buttonRef={buttonRef}
            setIsOpenClockElement={setIsOpenClockElement}
            handleAcceptTime={handleAcceptTime}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        </div>
      )}
    </div>
  );
}
