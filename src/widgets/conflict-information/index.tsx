import { ConflictCard } from 'shared/ui/conflict-card';
import styles from './styles.module.css';
import React from 'react';
import { Icon } from 'shared/ui/icons';
import { CategoriesBackground } from 'shared/ui/categories-background';
import cn from 'classnames';

export interface IConflict {
  specialization: 'valanter' | 'recipient';
  option: 'conflict' | 'confirm';
  name: string;
  image: string;
  id: string;
}

interface IInfoConflict {
  date: string;
  time: string;
  address: string;
  message: string;
}

export interface PropsInfoConflict {
  conflict?: IConflict[];
  infoConflict?: IInfoConflict;
}

export const InfoConflict: React.FC<PropsInfoConflict> = (props) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles['box-cards']}>
        {props.conflict &&
          props.conflict.map((i) => (
            <ConflictCard
              key={i.id}
              id={i.id}
              optionCard={i.option}
              specialization={i.specialization}
              name={i.name}
              image={i.image}
            />
          ))}
      </div>
      {props.infoConflict && (
        <div className={styles['box-info']}>
          <p className={cn('text', 'm-0', styles.text)}>
            <Icon color="blue" icon="CalendarIcon" size="14" />
            {` ${props.infoConflict.date} `}
            <Icon color="blue" icon="ClockIcon" size="14" />
            {` ${props.infoConflict.time}`}
          </p>
          <p className={cn('text', 'm-0', styles.text)}>
            <Icon color="blue" icon="LocationIcon" size="14" />
            {` ${props.infoConflict.address}`}
          </p>
          <CategoriesBackground
            theme="primary"
            size="medium"
            content="Сопровождение"
          />
          <p className={cn('text', 'm-0')}>{props.infoConflict.message}</p>
        </div>
      )}
    </article>
  );
};
