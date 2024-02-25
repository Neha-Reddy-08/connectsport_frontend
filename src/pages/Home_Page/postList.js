// src/components/PostList.js
import React from 'react';
import Post from './post';

function PostList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default PostList;
