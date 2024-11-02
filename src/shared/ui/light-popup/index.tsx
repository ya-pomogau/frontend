import { OverlayingPopup } from 'shared/ui/overlaying-popup';
import { Icon } from 'shared/ui';
import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './light-popup.module.css';

interface LightPopupProps {
  onClickExit: () => void;
  children: ReactNode;
  isPopupOpen: boolean;
  extClassName?: string;
  hasCloseButton?: boolean;
}

export const LightPopup = ({
  children,
  isPopupOpen,
  onClickExit,
  extClassName,
  hasCloseButton,
}: LightPopupProps) => {
  return (
    <OverlayingPopup
      isOpened={isPopupOpen}
      onClose={onClickExit}
      extClassName="overlay"
    >
      <div className={classNames(styles.container, extClassName, 'text')}>
        {hasCloseButton && (
          <button className={styles.closeButton} onClick={onClickExit}>
            <Icon icon="CloseCrossIcon" color={'blue'} />
          </button>
        )}
        {children}
      </div>
    </OverlayingPopup>
  );
};
