import classNames from 'classnames';
import styles from './styles.module.css';

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
type TypographyVariant =
  | 'title'
  | 'subtitle'
  | 'paragraph'
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
  extraClass?: string;
  variant: TypographyVariant;
  fontFamily: TypographyFontFamily;
  color?: TypographyColor;
  content: string;
}

export const Typography = ({
  tag,
  extraClass,
  variant,
  content,
  color,
  fontFamily,
}: TypographyProps) => {
  const textStyles = classNames(
    styles.text,
    styles[variant],
    styles[fontFamily],
    color ? styles[color] : false,
    extraClass
  );

  const Tag = tag ? tag : 'p';

  return <Tag className={textStyles}>{content}</Tag>;
};
