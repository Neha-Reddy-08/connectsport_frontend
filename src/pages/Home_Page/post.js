// src/components/Post.js
import React, { useState } from 'react';

function Post({ author, content }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => setLikes(likes + 1);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([...comments, commentText]);
    setCommentText('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h4>{author}</h4>
      <p>{content}</p>
      <button onClick={handleLike}>Like ({likes})</button>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide' : 'View'} Comments ({comments.length})
      </button>
      {showComments && (
        <>
          {comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit">Comment</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Post;
