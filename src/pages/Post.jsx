import React from 'react';
import { useQuery, getPost, deletePost, updatePost } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const PostPage = () => {
  const { data: post, isLoading, error } = useQuery(getPost, { id: window.location.pathname.split('/').pop() });
  const deletePostFn = useAction(deletePost);
  const updatePostFn = useAction(updatePost);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleDeletePost = () => {
    deletePostFn({ id: post.id });
  };

  const handleUpdatePost = () => {
    updatePostFn({ id: post.id, title: 'Updated Title', content: 'Updated Content' });
  };

  return (
    <div className='p-4'>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div className='mt-4'>
        <button onClick={handleDeletePost} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2'>Delete Post</button>
        <button onClick={handleUpdatePost} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Update Post</button>
      </div>
    </div>
  );
}

export default PostPage;