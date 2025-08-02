import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const { addComment, user, isAuthenticated } = useStore();
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      setAuthor(user.name);
    }
  }, [isAuthenticated, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;
    addComment({ postId, author, content });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <h3 className="text-3xl text-gold font-bold mb-4">Leave a Comment</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="bg-onyx border border-gold/50 text-white text-lg rounded-lg p-3 w-full"
          disabled={isAuthenticated}
        />
        <textarea
          placeholder="Your Comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-onyx border border-gold/50 text-white text-lg rounded-lg p-3 w-full h-32"
        />
        <button type="submit" className="bg-gold text-charcoal font-bold py-3 px-8 rounded-lg uppercase">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
