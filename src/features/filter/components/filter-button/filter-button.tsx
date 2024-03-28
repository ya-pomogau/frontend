/* eslint-disable react/display-name */

import classnames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { Icon } from 'shared/ui/icons';

import styles from './filter-button.module.css';

type FilterButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ ...buttonProps }, ref) => {
    return (
      <button
        className={styles.filterButton}
        type="button"
        ref={ref}
        {...buttonProps}
      >
        <p
          className={classnames(
            styles.filterText,
            'text',
            'text_size_medium',
            'm-0',
            'p-0'
          )}
        >
          Фильтр
        </p>

        <Icon color="blue" icon="FilterIcon" size="54" />
      </button>
    );
  }
);
