import { ChangeEvent, useState } from 'react';
import { sortMessages } from '../Chat/libs/utils';
import styles from './styles.module.css';
import classnames from 'classnames';
import { Avatar } from '../../../../shared/ui/avatar';
import { CloseCrossIcon } from '../../../../shared/ui/icons/close-cross-icon';
import { Message } from '../../../../shared/ui/message';
import { KeyIcon } from '../../../../shared/ui/icons/key-icon';
import { Input } from '../../../../shared/ui/input';
import { PinIcon } from '../../../../shared/ui/icons/pin-icon';
import { Button } from '../../../../shared/ui/button';
import { SendIcon } from '../../../../shared/ui/icons/send-icon';
import { EmptyMessageIcon } from '../../../../shared/ui/icons/empty-message-icon';
import { IChatmateInfo } from '../Chat/types';

interface IConflictProps {
  extClassName?: string;
}

export const Conflict = ({ extClassName }: IConflictProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={classnames('text', 'text_size_large', styles.heading)}>
        Конфликт
        <CloseCrossIcon color={'blue'} />
      </div>
      <div className={styles.conflict}></div>
    </div>
  );
};
