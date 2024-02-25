// src/components/PostForm.js
import React, { useState } from 'react';

function PostForm({ onPostSubmit }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onPostSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
