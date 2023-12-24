import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import classnames from 'classnames';
import styles from './styles.module.css';

interface PostProps {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
}

export const Post: FC<PostProps> = ({ title, description, images }) => {
  const titleStyle = classnames(
    styles.title,
    'text',
    'text_size_large',
    'text_type_regular'
  );

  const descriptionStyle = classnames(
    styles.description,
    'text',
    'text_size_medium',
    'text_type_regular'
  );

  const buttonStyle = classnames(
    styles.button,
    'text',
    'text_size_medium',
    'text_type_regular'
  );

  const galleryStyle = classnames(
    styles.gallery,
    styles[`gallery-${images.length}`]
  );

  return (
    <article className={styles.article}>
      <div></div>
      <div className={styles['text-block']}>
        <ReactMarkdown className={titleStyle}>{title}</ReactMarkdown>
        <ReactMarkdown className={descriptionStyle} remarkPlugins={[remarkGfm]}>
          {description}
        </ReactMarkdown>
        <button className={buttonStyle}>Читать</button>
      </div>
      <div className={galleryStyle}>
        {images.map((image, i) => (
          <div key={i} className={styles['gallery-item']}>
            <img
              className={styles['gallery-item-image']}
              src={image.src}
              alt={image.alt}
            />
          </div>
        ))}
      </div>
    </article>
  );
};
