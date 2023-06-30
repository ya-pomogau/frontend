import { getColor, IIconProps } from './utils';

export const UnionIcon = ({ color, ...props }: IIconProps) => (
  <svg
    width="25"
    height="20"
    viewBox="0 0 25 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0V20H0.958277V0H0Z" fill={getColor(color)} />
    <path
      d="M3.91791 6.35206C3.72698 6.60104 3.91791 7 3.91791 7L4.29993 7.34804L14.2285 15.8133C14.4195 16.0622 14.6105 16.0622 14.8014 15.8133L24.73 7.34804C24.9209 7.09906 25.1118 6.60104 24.9209 6.35206C24.8869 6.30834 24.859 6.26457 24.8328 6.22353C24.7118 6.03406 24.628 5.90278 24.1571 6.10314L14.4194 14.3194L4.68171 6.10314C4.49077 5.85416 4.10885 6.10308 3.91791 6.35206Z"
      fill={getColor(color)}
    />
  </svg>
);
