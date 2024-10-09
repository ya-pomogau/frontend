import classNames from 'classnames';
import styles from './styles.module.css';

type TTypographyTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'a'
  | 'ul'
  | 'li'
  | 'ol'
  | 'cite'
  | 'blockquote';
type TTypographyVariant =
  | 'primary_title'
  | 'primary_paragraph-bold'
  | 'primary_paragraph'
  | 'primary_support-bold'
  | 'primary_support'
  | 'primary_helperText'
  | 'primary_input-title'
  | 'primary_servicesText'
  | 'secondary_title'
  | 'secondary_subtitle'
  | 'secondary_paragraph'
  | 'secondary_paragraph-bold'
  | 'secondary_support';
type TTypographyColor =
  | 'primary'
  | 'white'
  | 'black'
  | 'primary-additional'
  | 'blue-navy'
  | 'interface-additional'
  | 'ID-text';

interface TypographyProps {
  tag?: TTypographyTag;
  extraClass?: string;
  variant: TTypographyVariant;
  color?: TTypographyColor;
  content: string;
}

export const Typography = ({
  tag,
  extraClass,
  variant,
  content,
  color,
}: TypographyProps) => {
  const textStyles = classNames(
    styles.text,
    styles[variant],
    color ? styles[color] : '',
    extraClass ? extraClass : ''
  );

  const Tag = tag ? tag : 'p';

  return <Tag className={textStyles}>{content}</Tag>;
};
