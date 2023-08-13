import { useRef, useState } from 'react';
import styles from './styles.module.css';
import { TimePicker } from 'react-time-picker';
import { Button } from '../button';

export interface ITimePickerElement {
  isMobile?: boolean;
}

export function TimePickerElement({ isMobile }: ITimePickerElement) {
  const [time, setTime] = useState('00:00');
  const [isOpenClockElement, setIsOpenClockElement] = useState(false);

  const handleFocus = () => {
    setIsOpenClockElement(true);
  };

  const handleSetTime = (value: any) => {
    setTime(value);
  };

  const handleAcceptTime = () => {
    setIsOpenClockElement(!isOpenClockElement);
  };

  const hourWheelRef = useRef(null);
  const minuteWheelRef = useRef(null);

  // useEffect(() => {
  //   const parentPos = document
  //     .getElementById('time-hour')!
  //     .getBoundingClientRect();
  //   const searchedElem = document.elementFromPoint(
  //     parentPos.left,
  //     parentPos.top + 64
  //   );
  //   console.log(searchedElem);
  //   // const relativePos = { top: 0, right: 0, bottom: 0, left: 0 };
  //   // if (searchedElem) {
  //   //   console.log(searchedElem);
  //   //   relativePos.top = searchedElem?.top - parentPos.top;
  //   //   relativePos.right = searchedElem?.right - parentPos.right;
  //   //   relativePos.bottom = searchedElem?.bottom - parentPos.bottom;
  //   //   relativePos.left = searchedElem?.left - parentPos.left;
  //   // }
  // }, [isOpenClockElement]);

  return (
    <div className={styles.timePickerContainer}>
      {isMobile && (
        <TimePicker
          value={time !== '00:00' ? time : null}
          onChange={(value) => handleSetTime(value)}
          clearIcon={null}
          clockIcon={null}
          format="HH:mm"
          hourPlaceholder="_ _"
          minutePlaceholder="_ _"
          minTime="00:00"
          maxTime="23:59"
          maxDetail="minute"
          className={[styles.timePicker]}
          onFocus={handleFocus}
          // autoFocus={true}
          disableClock={false}
          closeClock={false}
          isOpen={false}
          shouldOpenClock={({ reason }) => reason !== 'focus'}
          shouldCloseClock={({ reason }) =>
            reason !== 'outsideAction' && reason !== 'escape'
          }
          portalContainer={document.getElementById('clock-element')}
        />
      )}

      {!isMobile && (
        <TimePicker
          value={time !== '00:00' ? time : null}
          onChange={(value) => handleSetTime(value)}
          clearIcon={null}
          clockIcon={null}
          format="HH:mm"
          hourPlaceholder="_ _"
          minutePlaceholder="_ _"
          minTime="00:00"
          maxTime="23:59"
          maxDetail="minute"
          className={[styles.timePicker]}
          disableClock={true}
        />
      )}

      {isOpenClockElement && (
        <div id="clock-element" className={styles.timePickerPopup}>
          <p className={styles.timePickerPopup__header}>Время</p>
          <hr className={styles.timePickerPopup__line} />
          <div className={styles.timePickerPopup__container}>
            <ul
              ref={hourWheelRef}
              id="time-hour"
              className={styles.timePickerPopup__wheel}
            >
              <li className={styles.timePickerPopup__item}>&#x200b;</li>
              <li className={styles.timePickerPopup__item}>0</li>
              <li className={styles.timePickerPopup__item}>1</li>
              <li className={styles.timePickerPopup__item}>2</li>
              <li className={styles.timePickerPopup__item}>3</li>
              <li className={styles.timePickerPopup__item}>4</li>
              <li className={styles.timePickerPopup__item}>5</li>
              <li className={styles.timePickerPopup__item}>6</li>
              <li className={styles.timePickerPopup__item}>7</li>
              <li className={styles.timePickerPopup__item}>8</li>
              <li className={styles.timePickerPopup__item}>9</li>
              <li className={styles.timePickerPopup__item}>10</li>
              <li className={styles.timePickerPopup__item}>11</li>
              <li className={styles.timePickerPopup__item}>12</li>
              <li className={styles.timePickerPopup__item}>13</li>
              <li className={styles.timePickerPopup__item}>14</li>
              <li className={styles.timePickerPopup__item}>15</li>
              <li className={styles.timePickerPopup__item}>16</li>
              <li className={styles.timePickerPopup__item}>17</li>
              <li className={styles.timePickerPopup__item}>18</li>
              <li className={styles.timePickerPopup__item}>19</li>
              <li className={styles.timePickerPopup__item}>20</li>
              <li className={styles.timePickerPopup__item}>21</li>
              <li className={styles.timePickerPopup__item}>21</li>
              <li className={styles.timePickerPopup__item}>22</li>
              <li className={styles.timePickerPopup__item}>23</li>
              <li className={styles.timePickerPopup__item}>&#x200b;</li>
            </ul>
            <ul
              id="time-minutes"
              ref={minuteWheelRef}
              className={styles.timePickerPopup__wheel}
            >
              <li className={styles.timePickerPopup__item}>&#x200b;</li>
              <li className={styles.timePickerPopup__item}>0</li>
              <li className={styles.timePickerPopup__item}>5</li>
              <li className={styles.timePickerPopup__item}>10</li>
              <li className={styles.timePickerPopup__item}>15</li>
              <li className={styles.timePickerPopup__item}>20</li>
              <li className={styles.timePickerPopup__item}>25</li>
              <li className={styles.timePickerPopup__item}>30</li>
              <li className={styles.timePickerPopup__item}>35</li>
              <li className={styles.timePickerPopup__item}>40</li>
              <li className={styles.timePickerPopup__item}>45</li>
              <li className={styles.timePickerPopup__item}>50</li>
              <li className={styles.timePickerPopup__item}>55</li>
              <li className={styles.timePickerPopup__item}>&#x200b;</li>
            </ul>
          </div>

          <Button
            label="Применить"
            buttonType="primary"
            size="medium"
            actionType="button"
            onClick={handleAcceptTime}
          />
        </div>
      )}
    </div>
  );
}
