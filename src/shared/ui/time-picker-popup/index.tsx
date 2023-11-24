import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Button } from '../button';
import styles from './styles.module.css';
import { LightPopup } from '../light-popup';
import { useOutsideClick } from 'shared/hooks/use-outside-click';
import './styles.css';

interface ITimePickerPopup {
  isPopupOpen: boolean;
  buttonRef: RefObject<HTMLElement> | undefined;
  setIsOpenClockElement: React.Dispatch<React.SetStateAction<boolean>>;
  handleAcceptTime: () => void;
  startTime?: string;
  setStartTime?: React.Dispatch<React.SetStateAction<string>>;
  endTime?: string;
  setEndTime?: React.Dispatch<React.SetStateAction<string>>;
}

export function TimePickerPopup({
  isPopupOpen,
  buttonRef,
  setIsOpenClockElement,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: ITimePickerPopup) {
  const hourWheelRef = useRef(null);
  const minuteWheelRef = useRef(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [wheelHour, setWheelHour] = useState('00');
  const [wheelMinute, setWheelMinute] = useState('00');

  const handleClosePopup = () => {
    setIsOpenClockElement(false);
    buttonRef?.current?.blur();
  };

  useOutsideClick({
    elementRef: modalRef,
    triggerRef: buttonRef,
    onOutsideClick: handleClosePopup,
    enabled: isPopupOpen,
  });

  function handleAcceptTime() {
    if (startTime && setStartTime) {
      setStartTime(`${wheelHour}:${wheelMinute}`);
    } else if (endTime && setEndTime) {
      setEndTime(`${wheelHour}:${wheelMinute}`);
    }
    handleClosePopup();
  }

  function formatTime(time: string) {
    return time.length === 1 ? `0${time}` : `${time}`;
  }

  function onChangeTime(entry: any) {
    let formattedTime = '';
    if (entry.target.closest('ul').id === 'time-hour') {
      formattedTime = `${formatTime(entry?.target?.textContent)}`;
      setWheelHour(formattedTime);
    } else if (entry.target.closest('ul').id === 'time-minutes') {
      formattedTime = `${formatTime(entry.target.textContent)}`;
      setWheelMinute(formattedTime);
    }
  }

  function onIntersectionChange(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry && entry.isIntersecting) {
        entry.target.classList.add('highlighted');
        onChangeTime(entry);
      } else {
        entry.target.classList.remove('highlighted');
      }
    });
  }

  useEffect(() => {
    const hourWheelElements = Array.from(
      document.getElementsByClassName('time__hour')
    );
    const listHour = hourWheelElements[0];

    let hourObserver: IntersectionObserver | null = new IntersectionObserver(
      onIntersectionChange,
      {
        root: listHour,
        rootMargin: '-100px 0px -60px 0px',
        threshold: 0,
      }
    );

    if (listHour) {
      const listItems = listHour.children;
      for (let i = 0; i < listItems.length; i++) {
        hourObserver.observe(listItems[i]);
      }
    }

    const minuteWheelElements = Array.from(
      document.getElementsByClassName('time__minutes')
    );
    const listMinute = minuteWheelElements[0];

    let minuteObserver: IntersectionObserver | null = new IntersectionObserver(
      onIntersectionChange,
      {
        root: listMinute,
        rootMargin: '-100px 0px -60px 0px',
        threshold: 0,
      }
    );

    if (listMinute) {
      const listItems = listMinute.children;
      for (let i = 0; i < listItems.length; i++) {
        minuteObserver.observe(listItems[i]);
      }
    }
    return () => {
      hourObserver = null;
      minuteObserver = null;
    };
  }, [onIntersectionChange]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeydown);
    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, []);

  const handleEscKeydown = (e: KeyboardEvent) => {
    e.key === 'Escape' && handleClosePopup();
  };

  return (
    <LightPopup isPopupOpen={isPopupOpen} onClickExit={handleClosePopup}>
      <div ref={modalRef} id="clock-element" className={styles.timePickerPopup}>
        <p className={styles.timePickerPopup__header}>Время</p>
        <hr className={styles.timePickerPopup__line} />
        <div className={styles.timePickerPopup__container}>
          <ul
            ref={hourWheelRef}
            id="time-hour"
            className={`${styles.timePickerPopup__wheel} time__hour`}
          >
            <li className={`${styles.timePickerPopup__item} `}>&#x200b;</li>
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
            <li className={styles.timePickerPopup__item}>22</li>
            <li className={styles.timePickerPopup__item}>23</li>
            <li className={`${styles.timePickerPopup__item}`}>&#x200b;</li>
          </ul>
          <ul
            id="time-minutes"
            ref={minuteWheelRef}
            className={`${styles.timePickerPopup__wheel} time__minutes`}
          >
            <li className={`${styles.timePickerPopup__item}`}>&#x200b;</li>
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
            <li className={`${styles.timePickerPopup__item}`}>&#x200b;</li>
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
    </LightPopup>
  );
}
