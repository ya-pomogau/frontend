import { getColor, IIconProps } from './utils';

export const ProgressIcon = ({ color, size = '24', ...props }: IIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <circle cx="16" cy="16" r="15.5" stroke={getColor(color)} />
    </g>

    <svg
      width="29"
      height="32"
      viewBox="0 0 29 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      x="2"
    >
      <path
        d="M13 0C15.6863 3.20335e-08 18.3293 0.67634 20.6854 1.96666C23.0415 3.25697 25.0348 5.11972 26.4815 7.38315C27.9282 9.64658 28.7817 12.2378 28.9634 14.9179C29.145 17.5981 28.649 20.2808 27.521 22.7187C26.3929 25.1567 24.6693 27.2714 22.5088 28.8679C20.3484 30.4643 17.8209 31.4911 15.1592 31.8536C12.4975 32.2161 9.78732 31.9027 7.27867 30.9421C4.77001 29.9815 2.54358 28.4048 0.804667 26.3573L13 16V0Z"
        fill={getColor(color)}
      />
    </svg>
  </svg>
);
