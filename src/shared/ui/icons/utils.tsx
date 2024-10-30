type TIconColor = 'blue' | 'white' | 'orange' | '#9798C9' | 'red';

export const getColor = (color: TIconColor) => {
  switch (color) {
    case 'blue':
      return '#2E3192';
    case 'white':
      return '#ffffff';
    case 'orange':
      return '#F37920';
    case '#9798C9':
      return '#9798C9';
    case 'red':
      return '#FF0000';
    default:
      return '#212226';
  }
};

export interface IIconProps<T = '24'> {
  color: TIconColor;
  size?: T | '14' | '20' | '24' | '32' | '46' | '48' | '54' | '101' | '196';
  width?: string;
  height?: string;
  className?: string;
  onClick?:
    | (() => void)
    | ((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void);
}
