import { useState, type FC, type MouseEventHandler } from 'react';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';
import styles from './styles.module.css';

interface PostProps {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
}

export const Post: FC<PostProps> = ({ title, description, images }) => {
  const [fullDescription, setFullDescription] = useState(false);

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
    'text_type_regular',
    { [styles.description_visible]: fullDescription }
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

  const handleFullDescriptionButton: MouseEventHandler = () => {
    setFullDescription(true);
  };

  return (
    <article className={styles.article}>
      <div></div>
      <div className={styles['text-block']}>
        <ReactMarkdown className={titleStyle}>{title}</ReactMarkdown>
        <ReactMarkdown className={descriptionStyle}>
          {description}
        </ReactMarkdown>
        {!fullDescription && (
          <button className={buttonStyle} onClick={handleFullDescriptionButton}>
            Читать
          </button>
        )}
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
