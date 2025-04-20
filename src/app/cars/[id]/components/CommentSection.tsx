'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiUser, FiSend } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { Comment } from '@/lib/db';
import { addComment } from '@/lib/db';
import { Timestamp } from 'firebase/firestore';

interface CommentSectionProps {
  carId: string;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ carId, comments: initialComments }) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user || !newComment.trim()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Use email as a unique identifier if id is not available
      const userId = user.email || 'anonymous-user';
      
      const commentData = {
        carId,
        userId,
        userName: user.name || 'Anonymous',
        userImage: user.image || undefined,
        content: newComment.trim(),
      };
      
      const commentRef = await addComment(commentData);
      
      // Create a proper Timestamp object for the createdAt field
      const now = new Date();
      const createdAt = Timestamp.fromDate(now);
      
      const newCommentObj: Comment = {
        id: commentRef.id,
        ...commentData,
        createdAt
      };
      
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'User'}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <FiUser size={20} className="text-gray-500" />
              )}
            </div>
            
            <div className="flex-grow">
              <div className="relative">
                <textarea
                  placeholder="Add a comment..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="absolute right-2 bottom-2 text-primary hover:text-primary/90 disabled:opacity-50"
                >
                  <FiSend size={20} />
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 p-4 rounded-md mb-6 text-center">
          <p>Please sign in to leave a comment</p>
        </div>
      )}
      
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {comment.userImage ? (
                  <Image
                    src={comment.userImage}
                    alt={comment.userName}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <FiUser size={20} className="text-gray-500" />
                )}
              </div>
              
              <div className="flex-grow">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{comment.userName}</h4>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection; 