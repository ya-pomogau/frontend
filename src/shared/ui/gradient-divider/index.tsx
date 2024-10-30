import cn from 'classnames';
import styles from './styles.module.css';

interface PropsGradientDivider {
  extClassName?: string;
}

export const GradientDivider = ({ extClassName }: PropsGradientDivider) => {
  return <div className={cn(extClassName, styles.border)} />;
};
