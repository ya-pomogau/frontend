import { useState, type FC, type MouseEventHandler } from 'react';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';
import styles from './styles.module.css';
import { Avatar } from '../avatar';
import { SquareButton } from '../square-buttons';

interface PostProps {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
  author: {
    name: string;
    id: string;
    avatar: string;
  };
  handleDeleteButton?: () => void;
  handleEditButton?: () => void;
}

export const Post: FC<PostProps> = ({
  title,
  description,
  images,
  author,
  handleDeleteButton,
  handleEditButton,
}) => {
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

  const fullDescriptionButtonStyle = classnames(
    styles['full-description-button'],
    'text',
    'text_size_medium',
    'text_type_regular'
  );

  const authorNameStyle = classnames(
    styles.author_name,
    'text',
    'text_size_medium',
    'text_type_regular'
  );

  const authorIdStyle = classnames(
    styles.author_id,
    'text',
    'text_size_small',
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
      <div className={styles.author}>
        <Avatar
          avatarLink={author.avatar}
          avatarName={author.name}
          extClassName={styles.author_avatar}
        />
        <div className={styles.author_info}>
          <p className={authorNameStyle}>{author.name}</p>
          <p className={authorIdStyle}>
            <span>ID </span>
            {author.id}
          </p>
        </div>
      </div>

      <div className={styles['text-block']}>
        <h2 className={titleStyle}>{title}</h2>
        <ReactMarkdown className={descriptionStyle}>
          {description}
        </ReactMarkdown>
        {!fullDescription && (
          <button
            className={fullDescriptionButtonStyle}
            onClick={handleFullDescriptionButton}
          >
            Читать
          </button>
        )}

        <div className={styles.buttons}>
          {handleDeleteButton && (
            <SquareButton onClick={handleDeleteButton} buttonType={'close'} />
          )}
          {handleEditButton && (
            <SquareButton onClick={handleEditButton} buttonType={'edit'} />
          )}
        </div>
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
