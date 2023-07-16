import { FC, HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';

import { FieldsetView } from './utils';

import styles from './styles.module.css';

interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
  title: string;
  view: FieldsetView;
  children: ReactNode;
}
const Fieldset: FC<FieldsetProps> = ({
  title,
  view = FieldsetView.COLUMN,
  children,
  ...props
}) => (
  <fieldset {...props} className={styles.fieldset}>
    <legend
      className={classnames(
        styles.legend,
        'text',
        'text_size_small',
        'text_type_bold'
      )}
    >
      {title}
    </legend>
    <div className={styles.content} data-view={view}>
      {children}
    </div>
  </fieldset>
);
export default Fieldset;
