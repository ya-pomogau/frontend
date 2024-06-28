import {
  useState,
  type FC,
  type MouseEventHandler,
  useRef,
  useLayoutEffect,
} from 'react';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';
import styles from './styles.module.css';
import { Avatar } from '../avatar';
import { SquareButton } from '../square-buttons';
import { UserInfo } from 'entities/user/types';

interface ImageProps {
  id: string;
  src: string;
  alt: string;
}

export interface PostProps {
  _id?: string;
  title: string;
  description: string;
  images: ImageProps[];
  text: string;
  files: ImageProps[];
  author: Pick<UserInfo, 'id' | 'fullname' | 'avatar'>;
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
  const [fullDescription, setFullDescription] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const descriptionHeight = 172;

  useLayoutEffect(() => {
    const scrollHeight = descriptionRef.current?.scrollHeight;

    if (scrollHeight && scrollHeight < descriptionHeight)
      setFullDescription(true);
  }, [text]);

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
    styles[`gallery-${files.length}`]
  );

  const handleFullDescriptionButton: MouseEventHandler = () => {
    setFullDescription(true);
  };

  return (
    <article className={styles.article}>
      <div className={styles.author}>
        <Avatar
          avatarLink={author.avatar}
          avatarName={author.fullname}
          extClassName={styles.author_avatar}
        />
        <div className={styles.author_info}>
          <p className={authorNameStyle}>{author.fullname}</p>
          <p className={authorIdStyle}>
            <span>ID </span>
            {author.id}
          </p>
        </div>
      </div>

      <div className={styles['text-block']}>
        <h2 className={titleStyle}>{title}</h2>
        <div ref={descriptionRef} className={descriptionStyle}>
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
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
        {files.map((image) => (
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
