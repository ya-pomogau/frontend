import { IIconProps } from './utils';

export const UndoneIcon = ({ color, size = '24', ...props }: IIconProps) => (
  <svg
    width={42}
    height={44}
    viewBox="0 0 28 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 4.875L30.5 0L32 32.5H0V4.875Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.612 23.9228L13 6.59825C13.0003 6.27467 13.2733 6.00474 13.6006 6.00444L18.4005 6C18.7278 5.9997 19.0003 6.26912 19 6.5927L18.3355 23.9228H13.612ZM18.6182 6.64697L18.0245 23.0842L14.2116 23.0813L13.5455 6.59774L18.5092 6.53921L18.6182 6.64697Z"
      fill="#FBFDFF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6119 29H18.6407V25.5212H13.6119V29ZM14.2115 26.1304V28.1585H18.0245L18.0245 26.1304H14.2115Z"
      fill="#FBFDFF"
    />
  </svg>
);
