import React, { useState } from 'react';

function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <div>
      <h2>Comments</h2>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
      <ul>
        {comments.map((comment, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: comment }}></li>
        ))}
      </ul>
    </div>
  );
}

export default Comments; 