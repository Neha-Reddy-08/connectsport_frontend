// components/PostList.js
import React from 'react';
import Post from './post';

function PostList({ posts }) {
  return (
    <div className="postList">
      {posts.map(post => (
        <Post key={post.id} author={post.author} content={post.content} />
      ))}
    </div>
  );
}

export default PostList;
