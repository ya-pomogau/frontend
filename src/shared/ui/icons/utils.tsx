import React from 'react';

type TIconColor = 'blue' | 'white' | '#9798C9';

export const getColor = (color: TIconColor) => {
  switch (color) {
    case 'blue':
      return '#2E3192';
    case 'white':
      return '#ffffff';
    case '#9798C9':
      return '#9798C9';
    default:
      // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unused-vars
      const exhaustiveCheck: never = color;
      return '#212226';
  }
};

export interface IIconProps<T = '24'> {
  color: TIconColor;
  size?: T | '14' | '17' | '22' | '24' | '32' | '46' | '54' | '196';
  className?: string;
  onClick?:
    | (() => void)
    | ((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void);
}
