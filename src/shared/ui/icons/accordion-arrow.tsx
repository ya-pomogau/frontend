type TIconArrow = {
  className?: string;
};

export const AccordionIconArrow = ({ className }: TIconArrow) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#818C99"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 14.1983L6.64021 9.7318C6.21593 9.37824 5.58537 9.43556 5.2318 9.85984C4.87824 10.2841 4.93556 10.9147 5.35984 11.2682L11.3598 16.2682C11.7307 16.5773 12.2694 16.5773 12.6402 16.2682L18.6402 11.2682C19.0645 10.9147 19.1218 10.2841 18.7682 9.85984C18.4147 9.43556 17.7841 9.37824 17.3598 9.7318L12 14.1983Z" />
  </svg>
);
