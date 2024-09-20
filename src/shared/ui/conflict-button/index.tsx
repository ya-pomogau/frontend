import { ConflictIcon } from '../icons/conflict-icon';
import classnames from 'classnames';
import styles from './styles.module.css';

type TConflictRootAdminButtonProps = {
  onClick: () => void;
  extClassName?: string;
  disabledColor?: boolean;
};
export const ConflictRootAdminButton = (
  props: TConflictRootAdminButtonProps
) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={classnames(
        styles.button,
        props.extClassName,
        props.disabledColor && styles.disabledColor
      )}
    >
      <div className={styles.buttonIcon}>
        <ConflictIcon color="red" />
      </div>
    </button>
  );
};
