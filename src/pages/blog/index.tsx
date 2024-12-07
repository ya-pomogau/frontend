import { useState } from 'react';
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
  Typography,
} from 'shared/ui';
import { useControlModal, usePermission } from 'shared/hooks';
import { PostProps } from 'shared/ui/post/Post';
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

  const [selectedPost, setSelectedPost] =
    useState<Omit<PostProps, 'handleEditButton' | 'handleDeleteButton'>>();

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

  const handleDeletePost = async () => {
    if (selectedPost?._id) {
      await deletePost(selectedPost._id);
    }
    handleClose();
  };

  const handleSelectPost = (
    post: Omit<PostProps, 'handleEditButton' | 'handleDeleteButton'>,
    isDelete?: boolean
  ) => {
    setSelectedPost(post);

    if (isDelete) {
      handleOpen();
    }
  };

  const handleCloseModal = () => {
    setSelectedPost(undefined);
    handleClose();
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
            selectedPost={!isOpen ? selectedPost : undefined}
            addAttachment={handleAddAttachment}
            removeAttachment={handleRemoveAttachment}
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
                handleDeleteButton={isAdmin ? handleSelectPost : undefined}
                handleEditButton={isAdmin ? handleSelectPost : undefined}
              />
            ))}
          </div>
        )}
        <LightPopup
          hasCloseButton={true}
          isPopupOpen={isOpen}
          onClickExit={handleCloseModal}
          extClassName={styles.popup}
        >
          <Typography
            tag={'h4'}
            content={'Удалить публикацию?'}
            extraClass={styles.textWarning}
          />
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
