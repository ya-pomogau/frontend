import type { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

import { ListIcon } from '../icons/list-icon';
import { TilesIcon } from '../icons/tiles-icon';

import styles from './styles.module.css';

interface ViewModeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  onClick?: () => void;
  modeIcon: 'list' | 'tiles';
  selected: boolean;
}

const iconMap = {
  list: <ListIcon color="blue" />,
  tiles: <TilesIcon color="blue" />,
};

export const ViewModeButton = ({
  extClassName,
  modeIcon,
  selected = false,
  ...props
}: ViewModeButtonProps) => (
  <button
    type="button"
    className={classnames(
      selected && styles.selected,
      styles['view-mode-button'],
      extClassName,
      'p-0'
    )}
    {...props}
  >
    {iconMap[modeIcon]}
  </button>
);
