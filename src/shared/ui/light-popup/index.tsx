import { OverlayingPopup } from 'shared/ui/overlaying-popup';
import { CloseCrossIcon } from '../icons/close-cross-icon';
import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './light-popup.module.css';

interface LightPopupProps {
  onClickExit: () => void;
  children: ReactNode;
  isPopupOpen: boolean;
  extClassName?: string;
  hasClosedButton?: boolean;
}

export const LightPopup = ({
  children,
  isPopupOpen,
  onClickExit,
  extClassName,
  hasClosedButton,
}: LightPopupProps) => {
  return (
    <OverlayingPopup
      isOpened={isPopupOpen}
      onClose={onClickExit}
      extClassName="overlay"
    >
      <div className={classNames(styles.container, extClassName, 'text')}>
        {hasClosedButton && (
          <button className={styles.closeButton} onClick={onClickExit}>
            <CloseCrossIcon color={'blue'} />
          </button>
        )}
        {children}
      </div>
    </OverlayingPopup>
  );
};
