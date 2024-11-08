import { FC } from 'react';
import { format } from 'date-fns';

import {
  ConflictCard,
  Typography,
  Icon,
  CategoriesBackground,
} from 'shared/ui';

import { TaskConflict, TaskReport } from 'entities/task/types';

import styles from './styles.module.css';

interface IUser {
  user: {
    _id: string;
    address: string;
    avatar: string;
    name: string;
    phone: string;
    vkId: string;
  };
  role: 'recipient' | 'volunteer';
  report: TaskReport;
}

export interface PropsInfoConflict {
  info: TaskConflict;
}

export const InfoConflict: FC<PropsInfoConflict> = ({ info }) => {
  const infoVolonter: IUser = {
    user: info.volunteer,
    role: 'volunteer',
    report: info.volunteerReport,
  };
  const infoRecepient: IUser = {
    user: info.recipient,
    role: 'recipient',
    report: info.recipientReport,
  };
  const users: IUser[] = [infoVolonter, infoRecepient];

  return (
    <article className={styles.wrapper}>
      <div className={styles.boxCards}>
        {users.map((i) => (
          <ConflictCard
            key={i.user._id}
            user={i.user}
            role={i.role}
            status={i.report}
          />
        ))}
      </div>
      {info && (
        <div className={styles.boxInfo}>
          <Typography color={'primary'} variant={'paragraph-bold'}>
            <Icon color="blue" icon="CalendarIcon" size="14" />
            {info.date
              ? format(new Date(info.date), 'dd.MM.yyyy')
              : 'бессрочно'}
            {info.date && (
              <>
                <Icon color="blue" icon="ClockIcon" size="14" />
                {` ${format(new Date(info.date), 'HH.MM')}`}
              </>
            )}
          </Typography>
          <Typography color={'primary'} variant={'paragraph-bold'}>
            <Icon color="blue" icon="LocationIcon" size="14" />
            {info.address}
          </Typography>
          <CategoriesBackground
            theme="primary"
            size="medium"
            content={info.category.title}
          />
          <Typography content={info.description} />
        </div>
      )}
    </article>
  );
};
