import ReactMarkdown from 'react-markdown';
import { useState, type FC, type MouseEventHandler, useRef } from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';
import { Avatar } from '../avatar';
import { SquareButton } from '../square-buttons';
import { User } from 'entities/user/types';
import { dataImages } from 'shared/libs/utils';

interface ImageProps {
  id: string;
  src: string;
  alt: string;
}

export interface PostProps {
  _id?: string;
  title: string;
  text: string;
  files: ImageProps[];
  author: Pick<User, '_id' | 'name' | 'avatar'>;
  handleDeleteButton?: (id: string) => void;
  handleEditButton?: (post: Partial<PostProps>) => void;
}

export const Post: FC<PostProps> = ({
  _id,
  title,
  text,
  files,
  author,
  handleDeleteButton,
  handleEditButton,
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const MAX_CHARACTERS = 400;
  const dataImg = files.length > 0 ? files : dataImages;

  const titleStyle = classnames(
    styles.title,
    'text',
    'text_size_large',
    'text_type_regular'
  );

  const descriptionStyle = classnames(
    styles.description,
    'text',
    'text_type_regular',
    { [styles.description_visible]: showFullText },
    styles.markdown
  );

  const fullDescriptionButtonStyle = classnames(
    styles['full-description-button'],
    'text',
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
    styles[`gallery-${dataImg.length}`]
  );

  const handleFullDescriptionButton: MouseEventHandler = () => {
    setShowFullText(!showFullText);
  };

  const truncatedText =
    text.length > MAX_CHARACTERS ? `${text.slice(0, MAX_CHARACTERS)}...` : text;

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
            {author._id}
          </p>
        </div>
      </div>

      <div className={styles['text-block']}>
        <h2 className={titleStyle}>{title}</h2>
        <div ref={descriptionRef} className={descriptionStyle}>
          <ReactMarkdown>{showFullText ? text : truncatedText}</ReactMarkdown>
        </div>
        {text.length > MAX_CHARACTERS && (
          <button
            className={fullDescriptionButtonStyle}
            onClick={handleFullDescriptionButton}
          >
            {showFullText && text.length > MAX_CHARACTERS ? 'Скрыть' : 'Читать'}
          </button>
        )}

        <div className={styles.buttons}>
          {handleDeleteButton && (
            <SquareButton
              onClick={() => handleDeleteButton(_id!)}
              buttonType={'close'}
            />
          )}
          {handleEditButton && (
            <SquareButton
              onClick={() =>
                handleEditButton({
                  _id,
                  title,
                  text,
                  files,
                })
              }
              buttonType={'edit'}
            />
          )}
        </div>
      </div>
      <div className={galleryStyle}>
        {dataImg.map((image) => (
          <div key={image.id} className={styles['gallery-item']}>
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
