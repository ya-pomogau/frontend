import {
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetPostsQuery,
} from 'services/posts-api';
import { Icon } from 'shared/ui/icons';
import { Post } from 'shared/ui/post';
import { PostForm } from 'shared/ui/post-form';
import { SmartHeader } from 'shared/ui/smart-header';
import styles from './styles.module.css';
import useForm from 'shared/hooks/use-form';
import { useAppSelector } from 'app/hooks';
import { Loader } from 'shared/ui/loader';
import { PostProps } from 'shared/ui/post/Post';
import { useRef, useState } from 'react';

const postsPerPage = 10;

export function BlogPage() {
  const user = useAppSelector((store) => store.user.data);

  const { data: posts, isLoading } = useGetPostsQuery(postsPerPage);
  const [addPost, { isLoading: isLoadingNewPost }] = useAddPostMutation();
  const [editPost, { isLoading: isLoadingEditedPost }] = useEditPostMutation();
  const [idEditedPost, setIdEditedPost] = useState<string | undefined>(
    undefined
  );
  const [deletePost] = useDeletePostMutation();

  const { values, handleChange, setValues } = useForm({
    title: '',
    description: '',
  });

  const refPostList = useRef<HTMLDivElement>(null);
  const refPostForm = useRef<HTMLFormElement>(null);

  const isAdmin = user?.role === 'admin' || user?.role === 'master';

  const handlePublishPost = async () => {
    if (!(values.title.trim() && values.description.trim() && user)) return;

    if (!idEditedPost) {
      await addPost({
        title: values.title,
        description: values.description,
        images: [],
        author: {
          id: user.id,
          fullname: user.fullname,
          avatar: user.avatar,
        },
      });
      setValues({ title: '', description: '' });
    } else {
      await editPost({ ...values, id: idEditedPost });
      setValues({ title: '', description: '' });

      const index = posts?.findIndex((post) => post.id === idEditedPost);
      if (index !== undefined && index > -1) {
        setTimeout(() => {
          refPostList.current?.children[index]?.scrollIntoView({
            behavior: 'smooth',
          });
        }, 500);
      }

      setIdEditedPost(undefined);
    }
  };

  const handleDeletePost = async (id: string) => {
    await deletePost(id).unwrap();
  };

  const handleEditPost = (post: Partial<PostProps>) => {
    setValues({
      title: post.title,
      description: post.description,
      images: post.images,
    });

    setIdEditedPost(post.id);

    refPostForm.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles['blog-page']}>
      <SmartHeader
        icon={<Icon color="blue" icon="PopularIcon" size="46" />}
        text="Блог"
      />

      {isAdmin && (
        <PostForm
          loading={isLoadingNewPost || isLoadingEditedPost}
          refPostForm={refPostForm}
          title={values.title}
          description={values.description}
          addAttachment={() => {}}
          removeAttachment={() => {}}
          handleChange={handleChange}
          handleSubmit={handlePublishPost}
        />
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.posts} ref={refPostList}>
          {posts?.map(({ id, title, description, images, author }) => (
            <Post
              id={id}
              key={id}
              title={title}
              description={description}
              images={images}
              author={author}
              handleDeleteButton={isAdmin ? handleDeletePost : undefined}
              handleEditButton={isAdmin ? handleEditPost : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
