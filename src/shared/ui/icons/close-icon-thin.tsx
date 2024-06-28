import { getColor, IIconProps } from './utils';

export const CloseIconThin = ({ color, size = '14', ...props }: IIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill={getColor(color)}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13.8174 0.188341C13.5739 -0.0627803 13.0869 -0.0627803 12.8434 0.188341L7 5.9641L1.15644 0.188341C0.912958 -0.0627803 0.426089 -0.0627803 0.182609 0.188341C-0.0608698 0.439462 -0.0608698 0.941765 0.182609 1.19289L5.7826 6.96864L0.182609 12.7444C-0.0608698 12.9955 -0.0608698 13.4978 0.182609 13.7489C0.426089 14.0001 0.42597 14 0.669449 14C0.912928 14 0.912958 14.0001 1.15644 13.7489L7 7.97319L12.8434 13.7489C13.0869 14.0001 13.0869 14 13.3304 14C13.5739 14 13.5739 14.0001 13.8174 13.7489C14.0609 13.4978 14.0609 12.9955 13.8174 12.7444L8.2174 6.96864L13.8174 1.19289C14.0609 0.941765 14.0609 0.439462 13.8174 0.188341Z" />
  </svg>
);
