import cn from 'classnames';
import { ReactElement, ReactNode, FC } from 'react';
import styles from './styles.module.css';
import { useMediaQuery } from 'shared/hooks';
import { Icon } from 'shared/ui/icons';
import { GradientDivider } from 'shared/ui/gradient-divider';
import { UserProfile } from 'entities/user/types';
import { Breakpoints } from 'shared/config';

interface IWindowInteractionUsers {
  option: 'conflict' | 'chat';
  isOpen: boolean;
  onClick?: (text: string) => void;
  children: ReactNode;
  chatmateInfo?: UserProfile;
  boxButton: ReactElement;
  closeConflict: () => void;
}

export const WindowInteractionUsers: FC<IWindowInteractionUsers> = (props) => {
  const isMobile = useMediaQuery(Breakpoints.IS_MOBILE_CHAT);

  const handleClick = () => {
    props.closeConflict();
  };

  return (
    <article className={cn(styles.box, { [styles.box_action]: props.isOpen })}>
      {props.option === 'chat' ? (
        <div className={styles['user-info']}>
          {isMobile && (
            <Icon
              onClick={handleClick}
              className={styles.cursor}
              color="#9798C9"
              icon="ArrowIcon"
              size="32"
            />
          )}
          <img
            className={styles.img}
            src={props.chatmateInfo?.avatar}
            alt="фото"
          />
          <div className={styles.container}>
            <p
              className={cn(
                'text-inter',
                'm-0',
                'text_size_large',
                'text_type_regular',
                styles.name
              )}
            >
              {props.chatmateInfo?.name}
            </p>
            <p
              className={cn(
                'text',
                'm-0',
                'text_type_regular',
                styles.id,
                styles['display-none']
              )}
            >{`ID ${props.chatmateInfo?._id}`}</p>
            <p
              className={cn(
                'text-inter',
                'm-0',
                'text_size_medium',
                'text_type_regular',
                styles['display-none'],
                styles.phone
              )}
            >
              <span
                className={cn(
                  'text_size_medium',
                  'text-inter',
                  'text_type_bold',
                  styles['display-none'],
                  styles.span
                )}
              >
                Тел.:
              </span>
              {props.chatmateInfo?.phone}
            </p>
          </div>
          {isMobile && (
            <GradientDivider extClassName={styles['gradient-divider']} />
          )}
        </div>
      ) : (
        <div className={styles['container-mobile']}>
          {isMobile && (
            <Icon
              onClick={handleClick}
              className={cn(styles.arrow, styles.cursor)}
              color="#9798C9"
              icon="ArrowIcon"
              size="32"
            />
          )}
          <h4
            className={cn(
              'm-0',
              'text-inter',
              'text_size_large',
              'text_type_regular'
            )}
          >
            Конфликт
          </h4>
          {isMobile && (
            <GradientDivider extClassName={styles['gradient-divider']} />
          )}
        </div>
      )}
      <div className={styles['content-container']}>{props.children}</div>
      {!isMobile && (
        <Icon
          onClick={handleClick}
          className={cn(styles['btn-close'], styles.cursor)}
          color="#9798C9"
          icon="CloseCrossIcon"
          size="14"
        />
      )}
      {isMobile && <GradientDivider />}
      <div className={styles.isMobile}>{props.boxButton}</div>
    </article>
  );
};
