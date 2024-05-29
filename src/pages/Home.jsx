import React from 'react';
import { useQuery, Link, deletePost, updatePost } from 'wasp/client/operations';

const HomePage = () => {
  const { data: posts, isLoading, error } = useQuery(getPosts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {posts.map((post) => (
        <div key={post.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div>
            <button onClick={() => deletePost({ postId: post.id })} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete</button>
            <Link to={`/update/${post.id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>Update</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;