import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/posts/PostCard';
import CommunityCard from '../components/communities/CommunityCard';
import { fetchPosts, fetchTrendingCommunities } from '../services/api';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [trendingCommunities, setTrendingCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const postsData = await fetchPosts();
        const communitiesData = await fetchTrendingCommunities();
        
        setPosts(postsData);
        setTrendingCommunities(communitiesData);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const filterPosts = (tab) => {
    setActiveTab(tab);
    // In a real app, you would filter posts based on the selected tab
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="post-creation">
          <div className="profile-pic">
            <img src="/default-profile.png" alt="Your Profile" />
          </div>
          <div className="post-input">
            <input 
              type="text" 
              placeholder="Share something with the community..." 
              onClick={() => {/* Open post creation modal */}}
              readOnly
            />
          </div>
        </div>

        <div className="feed-tabs">
          <button 
            className={activeTab === 'all' ? 'active' : ''} 
            onClick={() => filterPosts('all')}
          >
            All
          </button>
          <button 
            className={activeTab === 'discussions' ? 'active' : ''} 
            onClick={() => filterPosts('discussions')}
          >
            Discussions
          </button>
          <button 
            className={activeTab === 'questions' ? 'active' : ''} 
            onClick={() => filterPosts('questions')}
          >
            Questions
          </button>
          <button 
            className={activeTab === 'showcases' ? 'active' : ''} 
            onClick={() => filterPosts('showcases')}
          >
            Showcases
          </button>
        </div>

        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="posts-container">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      <div className="home-sidebar">
        <div className="sidebar-section">
          <h3>My Communities</h3>
          <ul className="community-list">
            <li><Link to="/community/1">Nood Creators</Link></li>
            <li><Link to="/community/2">Nood Beginners</Link></li>
            <li><Link to="/community/3">Nood Professionals</Link></li>
            <li className="view-all"><Link to="/my-communities">View All</Link></li>
          </ul>
          <Link to="/create-community" className="create-community-btn">
            Create a Community
          </Link>
        </div>

        <div className="sidebar-section">
          <h3>Trending Communities</h3>
          <div className="trending-communities">
            {trendingCommunities.map(community => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h3>Upcoming Events</h3>
          <div className="upcoming-events">
            <div className="event-card">
              <div className="event-date">
                <span className="month">Mar</span>
                <span className="day">15</span>
              </div>
              <div className="event-info">
                <h4>Nood Showcase 2023</h4>
                <p>Online • 2:00 PM</p>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <span className="month">Mar</span>
                <span className="day">22</span>
              </div>
              <div className="event-info">
                <h4>Beginner Workshop</h4>
                <p>Online • 10:00 AM</p>
              </div>
            </div>
            <Link to="/events" className="view-all-link">View All Events</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 