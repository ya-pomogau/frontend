import { useRef, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import { useDeletePostMutation, useGetPostsQuery } from 'services/posts-api';
import {
  Icon,
  Post,
  PostForm,
  SmartHeader,
  Loader,
  LightPopup,
  Button,
} from 'shared/ui';
import { useControlModal, usePermission } from 'shared/hooks';
import { PostProps } from 'shared/ui/post/Post';
import { IValuesBlog } from 'shared/types/blog.types';
import { adminPermission, userRole } from 'shared/types/common.types';

import styles from './styles.module.css';

const postsPerPage = 10;

export function BlogPage() {
  const isAdmin = usePermission([adminPermission.BLOG], userRole.ADMIN);
  const { isOpen, handleOpen, handleClose } = useControlModal();
  const { data: posts, isLoading } = useGetPostsQuery(postsPerPage);
  const [deletePost] = useDeletePostMutation();

  const [attachments, setAttachments] = useState<
    { file: File; id: string; name: string }[]
  >([]);
  const [idEditedPost, setIdEditedPost] = useState<string | undefined>(
    undefined
  );

  const [values, setValues] = useState<IValuesBlog>({
    title: '',
    text: '',
  });

  const refPostForm = useRef<HTMLFormElement>(null);

  const handleAddAttachment = (fileList: FileList | null) => {
    if (!fileList) return;

    const additionalImages = Array.from(fileList).map((file) => ({
      file: file,
      id: `${nanoid()}`,
      name: file.name,
    }));

    setAttachments((prev) => [...prev, ...additionalImages]);
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id));
  };

  const handleGetIdPost = async (id: string) => {
    handleOpen();
    setIdEditedPost(id);
  };

  const handleDeletePost = async () => {
    if (idEditedPost) {
      await deletePost(idEditedPost);
    }
    handleClose();
  };

  const handleEditPost = (post: Partial<PostProps>) => {
    setValues({
      title: post.title as string,
      text: post.text as string,
    });

    setIdEditedPost(post._id);

    refPostForm.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.background}>
      <div className={styles['blog-page']}>
        <SmartHeader
          extClassName={styles.smartHeader}
          icon={<Icon color="blue" icon="PopularIcon" size="46" />}
          text="Блог"
        />
        {isAdmin && (
          <PostForm
            handleSubmit={() => {
              setValues({
                title: '',
                text: '',
              });
            }}
            idEditedPost={idEditedPost}
            refPostForm={refPostForm}
            title={values.title}
            text={values.text}
            addAttachment={handleAddAttachment}
            removeAttachment={handleRemoveAttachment}
            images={attachments}
          />
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.posts}>
            {posts?.map(({ _id, title, text, files, author }) => (
              <Post
                _id={_id}
                key={_id}
                title={title}
                text={text}
                files={files}
                author={author}
                handleDeleteButton={isAdmin ? handleGetIdPost : undefined}
                handleEditButton={isAdmin ? handleEditPost : undefined}
              />
            ))}
          </div>
        )}
        <LightPopup
          hasCloseButton={true}
          isPopupOpen={isOpen}
          onClickExit={handleClose}
          extClassName={styles.popup}
        >
          <h4 className={`${styles.textWarning} text`}>Удалить публикацию?</h4>
          <div className={styles.btnContainer}>
            <Button
              actionType="button"
              buttonType="primary"
              label="Удалить"
              size="small"
              onClick={handleDeletePost}
            />
          </div>
        </LightPopup>
      </div>
    </section>
  );
}
