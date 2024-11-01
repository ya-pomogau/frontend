import cn from 'classnames';
import { ReactElement, ReactNode, FC } from 'react';
import styles from './styles.module.css';
import { useMediaQuery } from 'shared/hooks';
import { Icon } from 'shared/ui/icons';
import { GradientDivider } from 'shared/ui/gradient-divider';
import { UserProfile } from 'entities/user/types';
import { Breakpoints } from 'shared/config';
import { Typography } from 'shared/ui';

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
  const isMobile = useMediaQuery(Breakpoints.S);

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
            <Typography
              tag={'h3'}
              variant={'titleResize'}
              fontFamily={'secondaryFont'}
              content={`${props.chatmateInfo?.name}`}
              extraClass={styles.name}
            />
            <Typography
              color={'ID-text'}
              variant={'servicesText'}
              content={`ID ${props.chatmateInfo?._id}`}
              extraClass={styles['display-none']}
            />
            <div className={cn(styles.phone, styles['display-none'])}>
              <Typography
                fontFamily={'secondaryFont'}
                variant={'paragraph-bold'}
                content={'Тел.:'}
              />
              <Typography
                fontFamily={'secondaryFont'}
                content={`${props.chatmateInfo?.phone}`}
              />
            </div>
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
          <Typography
            tag={'h4'}
            fontFamily={'secondaryFont'}
            variant={'title'}
            content={'Конфликт'}
          />
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
