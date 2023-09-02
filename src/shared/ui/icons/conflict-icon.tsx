import { getColor, IIconProps } from './utils';

export const ConflictIcon = ({ color, size = '24', ...props }: IIconProps) => (
  <svg
    width="6"
    height="23"
    viewBox="0 0 6 23"
    fill={getColor(color)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.611954 17.9228L0 0.598249C0.000305653 0.274666 0.273308 0.00474018 0.600581 0.00443776L5.40054 2.54358e-07C5.72781 -0.000302172 6.00031 0.269119 6 0.592703L5.33552 17.9228H0.611954ZM5.61816 0.646972L5.02453 17.0842L1.21155 17.0813L0.545455 0.597744L5.50916 0.539205L5.61816 0.646972Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.611936 23H5.6407V19.5212H0.611936V23ZM1.21153 20.1304V22.1585H5.02451L5.02449 20.1304H1.21153Z"
    />
  </svg>
);
