import React from "react";

type TIconColor =
  | 'blue'
  | 'white'
;

export const getColor = (color: TIconColor) => {
  switch (color) {
    case 'blue':
      return '#2E3192';
    case 'white':
      return '#ffffff';
    default:
      // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unused-vars
      const exhaustiveCheck: never = color;
      return '#212226';
  }
};

export interface IIconProps {
  color: TIconColor;
  size?: '24' | '32' | '54';
  className?: string;
  onClick?:
    | (() => void)
    | ((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void);
}