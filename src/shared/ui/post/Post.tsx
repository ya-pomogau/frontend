import ReactMarkdown from 'react-markdown';
import { useState, type FC, type MouseEventHandler, useRef } from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';
import { Avatar } from '../avatar';
import { SquareButton } from '../square-buttons';
import { User } from 'entities/user/types';
import { dataImages } from 'shared/libs/utils';
import { Typography } from '../../ui';

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
  const MAX_CHARACTERS = 100;
  const dataImg = files.length > 0 ? files : dataImages;

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
          <Typography content={author.name} />
          <Typography
            color={'ID-text'}
            variant={'support'}
            content={`${'ID'} ${author._id}`}
          />
        </div>
      </div>

      <div className={styles['text-block']}>
        <Typography
          tag={'h2'}
          variant={'title'}
          content={title}
          extraClass={styles.title}
        />
        <div ref={descriptionRef} className={descriptionStyle}>
          <ReactMarkdown>{showFullText ? text : truncatedText}</ReactMarkdown>T
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
