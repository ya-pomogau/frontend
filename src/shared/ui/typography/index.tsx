import classNames from 'classnames';
import styles from './styles.module.css';
import { LegacyRef, ReactNode, forwardRef, PropsWithChildren } from 'react';

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
type TypographyVariant =
  | 'title'
  | 'titleResize'
  | 'subtitle'
  | 'paragraph'
  | 'paragraphResize'
  | 'paragraph-bold'
  | 'support'
  | 'support-bold'
  | 'helperText'
  | 'input-title'
  | 'servicesText';
type TypographyColor =
  | 'primary'
  | 'white'
  | 'black'
  | 'darkGray'
  | 'primary-additional'
  | 'blue-navy'
  | 'interface-additional'
  | 'ID-text'
  | 'fuchsia'
  | 'red'
  | 'orange';
type TypographyFontFamily = 'primaryFont' | 'secondaryFont';

interface TypographyProps {
  tag?: TypographyTag;
  variant?: TypographyVariant;
  fontFamily?: TypographyFontFamily;
  color?: TypographyColor;
  content?: string | ReactNode | number;
  extraClass?: string;
}

export const Typography = forwardRef(function Typography(
  {
    tag = 'p',
    extraClass,
    variant = 'paragraph',
    content,
    color = 'black',
    fontFamily = 'primaryFont',
    children,
  }: PropsWithChildren<TypographyProps>,
  ref: LegacyRef<HTMLHeadingElement>
) {
  const textStyles = classNames(
    styles.text,
    styles[variant],
    styles[fontFamily],
    styles[color],
    extraClass
  );

  const Tag = tag;

  return (
    <Tag ref={ref} className={textStyles}>
      {content || children}
    </Tag>
  );
});
