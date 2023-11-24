import { getColor, IIconProps } from './utils';

export const ExclamationPMark = ({ color, ...props }: IIconProps) => (
  <svg
    width="20"
    height="40"
    viewBox="0 0 11 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.12192 31.1701L0 1.04043C0.00056076 0.477679 0.501065 0.0082438 1.10106 0.00771784L9.90099 4.42362e-07C10.501 -0.000525516 11.0006 0.468033 11 1.03079L9.78178 31.1701L1.12192 31.1701ZM10.3 1.12517L9.21164 29.7117L2.22118 29.7065L1 1.03956L10.1001 0.937748L10.3 1.12517Z"
      fill="#F37920"
    />
    <path
      d="M1.12188 40H10.3413V33.9498H1.12188V40ZM2.22114 35.0094V38.5364H9.21161L9.21157 35.0094H2.22114Z"
      fill="#F37920"
    />
  </svg>
);
