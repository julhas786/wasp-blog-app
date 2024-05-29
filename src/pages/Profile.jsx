import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getUserPosts, createPost, updatePost, deletePost } from 'wasp/client/operations';

const ProfilePage = () => {
  const { data: userPosts, isLoading, error } = useQuery(getUserPosts);
  const createPostFn = useAction(createPost);
  const updatePostFn = useAction(updatePost);
  const deletePostFn = useAction(deletePost);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreatePost = () => {
    createPostFn({ title: newPostTitle, content: newPostContent });
    setNewPostTitle('');
    setNewPostContent('');
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='New Post Title'
          className='px-1 py-2 border rounded text-lg'
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <textarea
          placeholder='New Post Content'
          className='px-1 py-2 border rounded text-lg mt-2'
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        ></textarea>
        <button
          onClick={handleCreatePost}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2'
        >
          Create Post
        </button>
      </div>
      {userPosts.map((post) => (
        <div
          key={post.id}
          className='bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>Title: {post.title}</div>
          <div>Content: {post.content}</div>
          <div>
            <button
              onClick={() => updatePostFn({ id: post.id, title: 'Updated Title', content: 'Updated Content' })}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
            >
              Update
            </button>
            <button
              onClick={() => deletePostFn({ postId: post.id })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfilePage;