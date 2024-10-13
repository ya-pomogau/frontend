import cn from 'classnames'
import styles from './errorText.module.css'

export interface ErrorTextProp {
    error?: string;
    extClassName?: string;
}

export const ErrorText: React.FC<ErrorTextProp> = ({ error }) => (
    <span className={cn(styles.error, 'text')}>
        {error === ' ' ? <span>&nbsp;</span> : error}
    </span>
)
