import React, { useState } from 'react';

function PostForm({ onPostSubmit }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // State for the image file

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Get the first file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return; // Check if there's either content or an image
    onPostSubmit(content, image); // Pass both content and image to the submit handler
    setContent('');
    setImage(null); // Reset the form states
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
