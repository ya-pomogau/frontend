import { getColor, IIconProps } from './utils';

export const ArrowDownIcon = ({ color, size = '24', ...props }: IIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 29 14"
    fill={getColor(color)}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14.5 14L1.94263 3.5H27.0574L14.5 14Z" fill="#2E3192" />
    <path
      d="M20.2816 5.07275C20.0112 5.07275 19.7409 5.07271 19.7409 5.24833L14.6025 9.81448L9.46421 5.24833C9.19377 5.07271 8.65284 4.89713 8.3824 5.07275C8.11197 5.24838 7.8416 5.59956 8.11203 5.77518L13.7911 10.8683C14.0615 11.0439 14.8728 11.0439 15.1433 10.8683L20.8223 5.77518C21.0928 5.59956 21.0928 5.24838 20.552 5.07275H20.2816Z"
      fill="#FBFDFF"
    />
  </svg>
);
