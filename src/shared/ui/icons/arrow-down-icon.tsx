import { IIconProps } from './utils';

export const ArrowDownIcon = ({ size = '24', ...props }: IIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <path
      fill="#818C99"
      d="M12 14.198 6.64 9.732a1 1 0 0 0-1.28 1.536l6 5a1 1 0 0 0 1.28 0l6-5a1 1 0 1 0-1.28-1.536L12 14.198Z"
    />
  </svg>
);
