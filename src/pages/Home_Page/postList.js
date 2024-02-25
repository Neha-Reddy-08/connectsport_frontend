// src/components/PostList.js
import React from 'react';
import Post from './post';

function PostList({ posts, currentUser  }) {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} {...post} currentUser={currentUser} />
      ))}
    </div>
  );
}

export default PostList;
