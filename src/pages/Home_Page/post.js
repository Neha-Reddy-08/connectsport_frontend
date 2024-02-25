import React, { useState } from 'react';

function Post({ author, content, imageUrl, currentUser }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => setLikes(likes + 1);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      text: commentText,
      commenter: currentUser || 'Anonymous', // Default to 'Anonymous' if currentUser is not defined
    };
    setComments([...comments, newComment]);
    setCommentText('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h4>{author}</h4>
      {imageUrl && <img src={imageUrl} alt="Post" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />}
      <p>{content}</p>
      <button onClick={handleLike}>Like ({likes})</button>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide' : 'View'} Comments ({comments.length})
      </button>
      {showComments && (
        <div>
          {comments.map((comment, index) => (
            <p key={index}><strong>{comment.commenter}:</strong> {comment.text}</p>
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
        </div>
      )}
    </div>
  );
}

export default Post;
