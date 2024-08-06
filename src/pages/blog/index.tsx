import { useRef, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import { useDeletePostMutation, useGetPostsQuery } from 'services/posts-api';
import { Icon } from 'shared/ui/icons';
import { Post } from 'shared/ui/post';
import { PostForm } from 'shared/ui/post-form';
import { SmartHeader } from 'shared/ui/smart-header';
import styles from './styles.module.css';
import { useAppSelector } from 'app/hooks';
import { Loader } from 'shared/ui/loader';
import { PostProps } from 'shared/ui/post/Post';
import { IValuesBlog } from 'shared/types/blog.types';
import { LightPopup } from 'shared/ui/light-popup';
import { Button } from 'shared/ui/button';
import { AdminPermission } from 'shared/types/common.types';

const postsPerPage = 10;

export function BlogPage() {
  const user = useAppSelector((store) => store.user.data);
  const [isAction, setIsAction] = useState(false);
  const { data: posts, isLoading } = useGetPostsQuery(postsPerPage);
  const [attachments, setAttachments] = useState<
    { file: File; id: string; name: string }[]
  >([]);
  const [idEditedPost, setIdEditedPost] = useState<string | undefined>(
    undefined
  );
  const [deletePost] = useDeletePostMutation();
  const [values, setValues] = useState<IValuesBlog>({
    title: '',
    text: '',
  });

  const refPostList = useRef<HTMLDivElement>(null);
  const refPostForm = useRef<HTMLFormElement>(null);

  const isAdmin = user?.permissions?.includes(AdminPermission.BLOG);

  const handleOpenPopup = () => {
    setIsAction((state) => !state);
  };

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
    handleOpenPopup();
    setIdEditedPost(id);
  };

  const handleDeletePost = async () => {
    if (idEditedPost) {
      await deletePost(idEditedPost);
    }
    handleOpenPopup();
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
        <div className={styles.posts} ref={refPostList}>
          {posts?.map(({ _id, title, text, files, author }) => (
            <Post
              _id={_id}
              key={_id}
              title={title}
              text={text}
              files={files}
              author={author}
              // TODO когда будет работать авторизация, добавить проверку для отображения кнопок только для главного админа и автора поста
              handleDeleteButton={isAdmin ? handleGetIdPost : undefined}
              handleEditButton={isAdmin ? handleEditPost : undefined}
            />
          ))}
        </div>
      )}
      <LightPopup
        isPopupOpen={isAction}
        onClickExit={handleOpenPopup}
        extClassName={styles.popup}
      >
        <Icon
          className={styles.btnClose}
          color="blue"
          icon="CloseCrossIcon"
          size="24"
          onClick={handleOpenPopup}
        />
        <h4 className={`${styles.textWarning} ${'text'}`}>
          Удалить публикацию?
        </h4>
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
  );
}
