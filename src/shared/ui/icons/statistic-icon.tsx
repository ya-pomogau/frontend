import { getColor, IIconProps } from "./utils";

export const StatisticIcon = ({ color, ...props }: IIconProps) => (
  <svg
    width="54"
    height="54"
    viewBox="0 0 54 54"
    fill={getColor(color)}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.72849 49.9999H46.4253C46.6169 49.9999 46.8084 49.801 47 49.4029V9.59707C47 9.19901 46.8085 8.99989 46.4253 8.99989H23.2251V10.194H45.8506V48.8058H8.11165V13.3927H7.15381V49.4029C7.15381 49.801 7.34535 49.9999 7.72849 49.9999Z"
    />
    <path d="M31.2346 29.7841H23.9679C23.6586 29.7841 23.5041 29.9299 23.5041 30.2216V44.2232C23.5041 44.5149 23.6586 44.6609 23.9679 44.6609H31.2346C31.5438 44.6609 31.6984 44.5149 31.6984 44.2232V30.2216C31.6984 29.9299 31.3892 29.7841 31.2346 29.7841ZM30.7707 43.7857H24.4317V30.5133H30.7707V43.7857Z" />
    <path d="M43.1392 22.3446H35.8725C35.5633 22.3446 35.4086 22.4905 35.4086 22.7822V44.2222C35.4086 44.5139 35.5633 44.6599 35.8725 44.6599H43.1392C43.4484 44.6599 43.6031 44.5139 43.6031 44.2222V22.7822C43.6031 22.4905 43.2938 22.3446 43.1392 22.3446ZM42.6755 43.7847H36.3363V23.2198H42.6755V43.7847Z" />
    <path d="M19.6392 22.3446H12.3724C12.0632 22.3446 11.9086 22.4905 11.9086 22.7822V44.2222C11.9086 44.5139 12.0632 44.6599 12.3724 44.6599H19.6392C19.9484 44.6599 20.103 44.5139 20.103 44.2222V22.7822C20.103 22.4905 19.9484 22.3446 19.6392 22.3446ZM19.33 43.7847H12.9908V23.2198H19.33V43.7847Z" />
    <path d="M14.5161 15.4337C14.6707 15.5795 14.6707 15.5795 14.8253 15.5795C14.9799 15.5795 15.1346 15.4337 15.1346 15.4337L22.4013 5.51572L22.8651 8.14111C22.8651 8.28696 23.0197 8.43274 23.3289 8.43274C23.3289 8.43274 23.3289 8.43274 23.4835 8.43274C23.7927 8.43274 23.9474 8.14106 23.7928 7.99521L23.1744 4.34893C23.1744 4.05723 22.8651 3.91136 22.7105 4.05721L18.8452 4.64065C18.5359 4.64065 18.3814 4.93234 18.536 5.07819C18.536 5.36989 18.8452 5.51576 18.9998 5.36991L21.7828 4.93237L14.8253 14.4127L5.73435 6.7712C5.57973 6.62535 5.27058 6.62535 5.11596 6.7712C4.96135 6.91705 4.96135 7.20879 5.11596 7.35464L14.5161 15.4337Z" />
  </svg>
);
