import { ConflictCard } from 'shared/ui/conflict-card';
import styles from './styles.module.css';
import { FC } from 'react';
import { Icon } from 'shared/ui/icons';
import { CategoriesBackground } from 'shared/ui/categories-background';
import cn from 'classnames';
import { TaskConflict, TaskReport } from 'entities/task/types';
import { format } from 'date-fns';
import { ConflictChatsTupleMetaInterface } from 'shared/types/chat.types';

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
  info: ConflictChatsTupleMetaInterface;
}

export const InfoConflict: FC<PropsInfoConflict> = (props) => {
  const infoVolonter: IUser = {
    user: props.info.meta[0].volunteer,
    role: 'volunteer',
    report: props.info.volunteerReport,
  };
  const infoRecepient: IUser = {
    user: props.info.meta[1].recipient,
    role: 'recipient',
    report: props.info.recipientReport,
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
      {props && (
        <div className={styles.boxInfo}>
          <p className={cn('text', 'm-0', styles.text)}>
            <Icon color="blue" icon="CalendarIcon" size="14" />
            {` ${
              props.info.date
                ? format(new Date(props.info.date), 'dd.MM.yyyy')
                : 'бессрочно'
            } `}
            {props.info.date && (
              <>
                <Icon color="blue" icon="ClockIcon" size="14" />
                {` ${format(new Date(props.info.date), 'HH.MM')}`}
              </>
            )}
          </p>
          <p className={cn('text', 'm-0', styles.text)}>
            <Icon color="blue" icon="LocationIcon" size="14" />
            {` ${props.info.address}`}
          </p>
          <CategoriesBackground
            theme="primary"
            size="medium"
            content={props.info.category.title}
          />
          <p className={cn('text', 'm-0')}>{props.info.description}</p>
        </div>
      )}
    </article>
  );
};
