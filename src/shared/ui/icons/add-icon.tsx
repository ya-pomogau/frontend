import { getColor, IIconProps } from './utils';

export const AddIcon = ({ color, size = '24', ...props }: IIconProps<'66'>) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill={getColor(color)}
    stroke={getColor(color)}
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="0.5"
    {...props}
  >
    <path d="M2 32.25H30.75V35.75H2C1.0335 35.75 0.25 34.9665 0.25 34C0.25 33.0335 1.0335 32.25 2 32.25ZM31.25 35.75V32.25H34.75V35.75H31.25ZM34.75 31.75H31.25V2C31.25 1.0335 32.0335 0.25 33 0.25C33.9665 0.25 34.75 1.0335 34.75 2V31.75ZM35.25 35.75V32.25H64C64.9665 32.25 65.75 33.0335 65.75 34C65.75 34.9665 64.9665 35.75 64 35.75H35.25ZM31.25 36.25H34.75V64C34.75 64.9665 33.9665 65.75 33 65.75C32.0335 65.75 31.25 64.9665 31.25 64V36.25Z" />
  </svg>
);
