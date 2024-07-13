import { getColor, IIconProps } from './utils';

export const PlusFilledIcon = ({ color, ...props }: IIconProps) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill={getColor(color)}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="30"
      cy="30"
      r="29.75"
      fill="#2E3192"
      stroke="#FBFDFF"
      strokeWidth="0.5"
    />
    <rect
      x="6.83496"
      y="28.7861"
      width="47.061"
      height="1.69512"
      rx="0.847561"
      fill="#FBFDFF"
      stroke="#FBFDFF"
      strokeWidth="0.5"
    />
    <rect
      x="29.5186"
      y="53.165"
      width="47.061"
      height="1.69512"
      rx="0.847561"
      transform="rotate(-90 29.5186 53.165)"
      fill="#FBFDFF"
      stroke="#FBFDFF"
      strokeWidth="0.5"
    />
  </svg>
);
