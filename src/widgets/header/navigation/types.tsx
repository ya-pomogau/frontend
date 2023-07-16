export interface ISideBarElementPosition {
  flexDirection: 'row' | 'column' | 'row-reverse';
  justifyContent: 'flex-start' | 'center' | 'flex-end';
  gap: number;
  textAlign: 'center' | 'right' | 'left';
}
export interface ISideBarElementProps {
  title: string;
  to: string;
  icon?: any;
  position?: ISideBarElementPosition;
}
export interface ISideBarPosition {
  ulflexDirection: 'row' | 'column' | 'row-reverse';
  ulgap: number;
  element: ISideBarElementPosition;
}
export interface ISideBarProps {
  links: ISideBarElementProps[];
  position: ISideBarPosition;
}
