// components/Post.js
import React from 'react';

function Post({ author, content }) {
  return (
    <div className="post">
      <h2>{author}</h2>
      <p>{content}</p>
    </div>
  );
}

export default Post;
