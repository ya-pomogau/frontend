import { RefObject, useRef, useState } from 'react';
import styles from './styles.module.css';
import { TimePickerPopup } from '../time-picker-popup';

export interface ITimePickerElement {
  isMobile?: boolean;
  buttonRef: RefObject<HTMLElement> | undefined;
  // startTime?: string;
  // setStartTime?: React.Dispatch<React.SetStateAction<string>>;
  // endTime?: string;
  // setEndTime?: React.Dispatch<React.SetStateAction<string>>;
  variant: 'start' | 'end';
  times: string[];
  setTimes: React.Dispatch<React.SetStateAction<string[]>>;
}

export function TimePickerElement({
  isMobile,
  variant,
  times,
  setTimes,
}: // startTime,
// setStartTime,
// endTime,
// setEndTime,

ITimePickerElement) {
  const buttonRef = useRef<HTMLInputElement>(null);
  const [isOpenClockElement, setIsOpenClockElement] = useState(false);

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.type = 'time';
    setIsOpenClockElement(true);
  };

  if (times) {
    console.log(`startTime ${times[0]}`);
    console.log(`endTime ${times[1]}`);
  }

  const handleSetTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (variant === 'start') {
      setTimes([e.target.value, ...times.slice(0, 1)]);
    } else if (variant === 'end') {
      setTimes([...times.slice(0, 1), e.target.value]);
    }

    // if (startTime && setStartTime) {
    //   setStartTime(e.target.value);
    // } else if (endTime && setEndTime) {
    //   setEndTime(e.target.value);
    // }
  };

  const handleAcceptTime = () => {
    setIsOpenClockElement(false);
  };

  return (
    <div className={styles.timePickerContainer}>
      <input
        value={variant === 'start' ? times[0] : times[1]}
        onChange={handleSetTime}
        type="text"
        id="timepicker"
        className={styles.timePickerContainer__input}
        placeholder="00:00"
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
          {/* <TimePickerPopup
            isPopupOpen={isOpenClockElement}
            buttonRef={buttonRef}
            setIsOpenClockElement={setIsOpenClockElement}
            handleAcceptTime={handleAcceptTime}
            startTime={times[0]}
            setStartTime={setStartTime}
            endTime={times[1]}
            setEndTime={setEndTime}
          /> */}
        </div>
      )}
    </div>
  );
}
