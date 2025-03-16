import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import './PostCard.css';

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
    // In a real app, you would call the API to update the like status
  };

  const formatDate = (dateString) => {
    try {
      return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
    } catch (error) {
      return 'recently';
    }
  };

  return (
    <div className={`post-card ${post.isPinned ? 'pinned' : ''}`}>
      {post.isPinned && <div className="pin-badge">📌 Pinned</div>}
      
      <div className="post-header">
        <div className="post-author">
          <Link to={`/profile/${post.author.id}`}>
            <img 
              src={post.author.avatar || '/default-profile.png'} 
              alt={post.author.name} 
              className="author-avatar"
            />
          </Link>
          <div className="author-info">
            <Link to={`/profile/${post.author.id}`} className="author-name">
              {post.author.name}
            </Link>
            <div className="post-meta">
              <span className="post-time">{formatDate(post.createdAt)}</span>
              {post.community && (
                <>
                  <span className="post-meta-separator">•</span>
                  <Link to={`/community/${post.community.id}`} className="community-link">
                    {post.community.name}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        <button className="post-options">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
        
        {post.images && post.images.length > 0 && (
          <div className={`post-images images-${post.images.length}`}>
            {post.images.map((image, index) => (
              <img key={index} src={image} alt={`Post by ${post.author.name}`} />
            ))}
          </div>
        )}
      </div>
      
      <div className="post-actions">
        <button 
          className={`action-button like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <i className={`fas ${isLiked ? 'fa-heart' : 'fa-heart'}`}></i>
          <span>{likeCount}</span>
        </button>
        
        <Link to={`/post/${post.id}`} className="action-button comment-button">
          <i className="fas fa-comment"></i>
          <span>{post.comments}</span>
        </Link>
        
        <button className="action-button share-button">
          <i className="fas fa-share"></i>
        </button>
        
        <button className="action-button bookmark-button">
          <i className="fas fa-bookmark"></i>
        </button>
      </div>
    </div>
  );
};

export default PostCard; 