import React from 'react';
import { useStore } from '../../store';
import type { Comment } from '../../types';

const CommentList: React.FC = () => {
  const { comments } = useStore();

  return (
    <div className="mt-12">
      <h3 className="text-3xl text-gold font-bold mb-4 border-b-2 border-gold/20 pb-3">Comments</h3>
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment: Comment) => (
            <div key={comment.id} className="bg-onyx/50 p-4 rounded-lg">
              <p className="font-bold text-gold text-lg">{comment.author}</p>
              <p className="text-light-gray mt-2">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-medium-gray">No comments yet. Be the first to leave one!</p>
        )}
      </div>
    </div>
  );
};

export default CommentList;
