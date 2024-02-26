import React, { useState } from 'react';
import SocialButtons from '../../Components/common/socialButtons'; // Ensure the path is correct

function Post({ author, content, imageUrl, currentUser }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  // Handles the increment of likes
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
    <div style={postStyle}>
      <h4>{author}</h4>
      {imageUrl && <img src={imageUrl} alt="Post" style={imageStyle} />}
      <p>{content}</p>
      <SocialButtons 
        onLike={handleLike} 
        likesCount={likes}
        onCommentToggle={() => setShowComments(!showComments)} 
        commentsCount={comments.length}
      />
      {showComments && (
        <div>
          {comments.map((comment, index) => (
            <p key={index}><strong>{comment.commenter}:</strong> {comment.text}</p>
          ))}
          <form onSubmit={handleCommentSubmit} style={formStyle}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Comment</button>
          </form>
        </div>
      )}
    </div>
  );
}

const postStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  marginBottom: '10px',
  backgroundColor: '#f9f9f9', // Light background for the post
};

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
  marginTop: '10px',
};

const formStyle = {
  display: 'flex',
  marginTop: '10px',
};

const inputStyle = {
  flexGrow: 1, // Make input take up the available space
  marginRight: '8px', // Spacing between input and button
  padding: '8px',
  border: '1px solid #ddd', // Lighter border for the input
  borderRadius: '20px', // Rounded corners for the input
};

const buttonStyle = {
  padding: '8px 16px',
  background: '#007bff', // Bootstrap primary button color
  color: 'white',
  border: 'none',
  borderRadius: '20px', // Rounded corners for the button
  cursor: 'pointer',
};

export default Post;
