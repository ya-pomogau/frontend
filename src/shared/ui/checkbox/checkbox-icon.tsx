interface DefaultCheckboxIconProps {
  color?: string;
  size?: string;
}

export const DefaultCheckboxIcon = ({
  color = 'var(--colors-interface-background)',
  size = '16',
}: DefaultCheckboxIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3657 5.36569C13.6781 5.05327 13.6781 4.54673 13.3657 4.23431C13.0533 3.9219 12.5467 3.9219 12.2343 4.23431L6.80001 9.66863L4.5657 7.43431C4.25328 7.12189 3.74675 7.12189 3.43433 7.43431C3.12191 7.74673 3.12191 8.25327 3.43433 8.56569L6.23433 11.3657C6.54675 11.6781 7.05328 11.6781 7.3657 11.3657L13.3657 5.36569Z"
      fill={color}
    />
  </svg>
);
