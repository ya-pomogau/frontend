import { getColor, IIconProps } from './utils';

export const ExclamationIcon = ({ color }: IIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="23"
    fill={getColor(color)}
    viewBox="0 0 6 24"
  >
    <path
      fill={getColor(color)}
      fillRule="evenodd"
      d="M.612 17.923 0 .598C0 .275.273.005.6.004L5.4 0a.6.6 0 0 1 .6.593l-.664 17.33H.612ZM5.618.647l-.593 16.437-3.813-.003L.545.598 5.51.539l.11.108ZM.612 23H5.64v-3.479H.61V23Zm.6-2.87v2.029h3.813V20.13H1.211Z"
      clipRule="evenodd"
    />
  </svg>
);
