// Explorer.jsx
import React, { useState, useEffect } from 'react';
import "../styles/Explorer.css";


function Explorer() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredHashtags, setFilteredHashtags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data - in a real app, this would come from an API
  const users = [
    { id: 1, username: 'johndoe', name: 'John Doe', profilePic: 'https://i.pravatar.cc/150?img=1', followers: 1500, isFollowing: true },
    { id: 2, username: 'janedoe', name: 'Jane Smith', profilePic: 'https://i.pravatar.cc/150?img=2', followers: 3200, isFollowing: false },
    { id: 3, username: 'alexjohnson', name: 'Alex Johnson', profilePic: 'https://i.pravatar.cc/150?img=3', followers: 850, isFollowing: false },
    { id: 4, username: 'sarahwilson', name: 'Sarah Wilson', profilePic: 'https://i.pravatar.cc/150?img=4', followers: 5200, isFollowing: true },
    { id: 5, username: 'mikebrown', name: 'Mike Brown', profilePic: 'https://i.pravatar.cc/150?img=5', followers: 1200, isFollowing: false },
    { id: 6, username: 'emilydavis', name: 'Emily Davis', profilePic: 'https://i.pravatar.cc/150?img=6', followers: 4300, isFollowing: true },
  ];

  const hashtags = [
    { id: 1, tag: '#photography', posts: 1250000 },
    { id: 2, tag: '#travel', posts: 980000 },
    { id: 3, tag: '#food', posts: 2100000 },
    { id: 4, tag: '#fitness', posts: 1500000 },
    { id: 5, tag: '#art', posts: 850000 },
    { id: 6, tag: '#nature', posts: 1750000 },
  ];

  const posts = [
    { id: 1, username: 'johndoe', profilePic: 'https://i.pravatar.cc/150?img=1', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', likes: 1250, caption: 'Beautiful sunset at the beach #sunset #beach', comments: 45, time: '2 hours ago' },
    { id: 2, username: 'janedoe', profilePic: 'https://i.pravatar.cc/150?img=2', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba', likes: 3200, caption: 'Mountain adventures! #hiking #mountains', comments: 120, time: '5 hours ago' },
    { id: 3, username: 'alexjohnson', profilePic: 'https://i.pravatar.cc/150?img=3', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9', likes: 850, caption: 'Delicious food from my trip #foodie #travel', comments: 23, time: '1 day ago' },
    { id: 4, username: 'sarahwilson', profilePic: 'https://i.pravatar.cc/150?img=4', image: 'https://images.unsplash.com/photo-1513366208864-87536b8bd7b4', likes: 5200, caption: 'Art gallery visit #art #museum', comments: 89, time: '3 days ago' },
  ];

  // Handle search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers([]);
      setFilteredHashtags([]);
      setFilteredPosts([]);
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      
      // Filter users
      const userResults = users.filter(user => 
        user.username.toLowerCase().includes(query) || 
        user.name.toLowerCase().includes(query)
      );
      
      // Filter hashtags
      const hashtagResults = hashtags.filter(hashtag => 
        hashtag.tag.toLowerCase().includes(query)
      );
      
      // Filter posts
      const postResults = posts.filter(post => 
        post.caption.toLowerCase().includes(query) || 
        post.username.toLowerCase().includes(query)
      );
      
      setFilteredUsers(userResults);
      setFilteredHashtags(hashtagResults);
      setFilteredPosts(postResults);
      setLoading(false);
    }, 300);
  }, [searchQuery]);

  // Handle follow/unfollow
  const handleFollow = (userId) => {
    const updatedUsers = filteredUsers.map(user => 
      user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
    );
    setFilteredUsers(updatedUsers);
  };

  // Handle recent searches
  const handleRecentSearch = (query) => {
    setSearchQuery(query);
    if (!recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  // Render user result item
  const renderUserItem = (user) => (
    <div key={user.id} className="result-item">
      <div className="user-info">
        <img src={user.profilePic} alt={user.username} className="profile-pic" />
        <div className="user-details">
          <h4>{user.username}</h4>
          <p>{user.name}</p>
          <span className="followers">{user.followers.toLocaleString()} followers</span>
        </div>
      </div>
      <button 
        className={`follow-btn ${user.isFollowing ? 'following' : ''}`}
        onClick={() => handleFollow(user.id)}
      >
        {user.isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );

  // Render hashtag result item
  const renderHashtagItem = (hashtag) => (
    <div key={hashtag.id} className="result-item">
      <div className="hashtag-info">
        <span className="hashtag-icon">#</span>
        <div className="hashtag-details">
          <h4>{hashtag.tag}</h4>
          <p>{hashtag.posts.toLocaleString()} posts</p>
        </div>
      </div>
    </div>
  );

  // Render post result item
  const renderPostItem = (post) => (
    <div key={post.id} className="post-result">
      <div className="post-header">
        <img src={post.profilePic} alt={post.username} className="profile-pic" />
        <span className="username">{post.username}</span>
        <span className="post-time">{post.time}</span>
      </div>
      <img src={post.image} alt="Post" className="post-image" />
      <div className="post-stats">
        <span className="stat">
          <i className="heart-icon">❤️</i> {post.likes.toLocaleString()}
        </span>
        <span className="stat">
          <i className="comment-icon">💬</i> {post.comments}
        </span>
      </div>
      <p className="post-caption">{post.caption}</p>
    </div>
  );

  return (
    <div className="app">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-left">
          <div className="logo">Socio</div>
          <div className="search-container">
            <i className="search-icon">🔍</i>
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>
        </div>
        <div className="nav-right">
          <button className="nav-icon">🏠</button>
          <button className="nav-icon">✉️</button>
          <button className="nav-icon">➕</button>
          <button className="nav-icon">❤️</button>
          <img src="https://i.pravatar.cc/150?img=8" alt="Profile" className="nav-profile" />
        </div>
      </nav>

      <div className="main-container">
        <div className="search-results">
          {/* Search Tabs */}
          <div className="search-tabs">
            <button 
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button 
              className={`tab ${activeTab === 'hashtags' ? 'active' : ''}`}
              onClick={() => setActiveTab('hashtags')}
            >
              Hashtags
            </button>
            <button 
              className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </button>
          </div>

          {/* Search Results or Recent Searches */}
          {searchQuery ? (
            <div className="results-container">
              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Searching...</p>
                </div>
              ) : (
                <>
                  {/* Show results based on active tab */}
                  {activeTab === 'all' || activeTab === 'users' ? (
                    <div className="results-section">
                      <h3 className="section-title">Users</h3>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map(renderUserItem)
                      ) : searchQuery && (
                        <p className="no-results">No users found</p>
                      )}
                    </div>
                  ) : null}

                  {activeTab === 'all' || activeTab === 'hashtags' ? (
                    <div className="results-section">
                      <h3 className="section-title">Hashtags</h3>
                      {filteredHashtags.length > 0 ? (
                        filteredHashtags.map(renderHashtagItem)
                      ) : searchQuery && (
                        <p className="no-results">No hashtags found</p>
                      )}
                    </div>
                  ) : null}

                  {activeTab === 'all' || activeTab === 'posts' ? (
                    <div className="results-section">
                      <h3 className="section-title">Posts</h3>
                      <div className="posts-grid">
                        {filteredPosts.length > 0 ? (
                          filteredPosts.map(renderPostItem)
                        ) : searchQuery && (
                          <p className="no-results">No posts found</p>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {!filteredUsers.length && !filteredHashtags.length && !filteredPosts.length && searchQuery && !loading && (
                    <div className="no-results-found">
                      <p>No results found for "{searchQuery}"</p>
                      <p className="suggestion">Try searching for users, hashtags, or posts</p>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            /* Recent Searches when no query */
            <div className="recent-searches">
              <div className="recent-header">
                <h3>Recent Searches</h3>
                {recentSearches.length > 0 && (
                  <button className="clear-recent" onClick={clearRecentSearches}>
                    Clear All
                  </button>
                )}
              </div>
              {recentSearches.length > 0 ? (
                <ul className="recent-list">
                  {recentSearches.map((search, index) => (
                    <li key={index} className="recent-item">
                      <button 
                        className="recent-search-btn"
                        onClick={() => handleRecentSearch(search)}
                      >
                        <i className="search-icon">🔍</i>
                        <span>{search}</span>
                      </button>
                      <button 
                        className="remove-recent"
                        onClick={() => setRecentSearches(recentSearches.filter((_, i) => i !== index))}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-recent">No recent searches</p>
              )}
              
              {/* Suggested searches */}
              <div className="suggested-searches">
                <h3>Suggested</h3>
                <div className="suggested-tags">
                  {hashtags.slice(0, 5).map(hashtag => (
                    <button 
                      key={hashtag.id}
                      className="hashtag-btn"
                      onClick={() => handleRecentSearch(hashtag.tag)}
                    >
                      {hashtag.tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar with suggested users */}
        <div className="sidebar">
          <div className="current-user">
            <img src="https://i.pravatar.cc/150?img=8" alt="Your profile" className="current-profile" />
            <div className="current-user-info">
              <h4>yourusername</h4>
              <p>Your Name</p>
            </div>
            <button className="switch-btn">Switch</button>
          </div>

          <div className="suggested-users">
            <div className="suggested-header">
              <h3>Suggested For You</h3>
              <button className="see-all">See All</button>
            </div>
            {users.slice(0, 5).map(user => (
              <div key={user.id} className="suggested-user">
                <img src={user.profilePic} alt={user.username} className="profile-pic" />
                <div className="suggested-user-info">
                  <h4>{user.username}</h4>
                  <p>Suggested for you</p>
                </div>
                <button 
                  className={`follow-btn-small ${user.isFollowing ? 'following' : ''}`}
                  onClick={() => handleFollow(user.id)}
                >
                  {user.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>

          <div className="footer-links">
            <a href="/">About</a> • 
            <a href="/">Help</a> • 
            <a href="/">Press</a> • 
            <a href="/">API</a> • 
            <a href="/">Jobs</a> • 
            <a href="/">Privacy</a> • 
            <a href="/">Terms</a> • 
            <a href="/">Locations</a> • 
            <a href="/">Language</a>
            <p className="copyright">© {new Date().getFullYear()} INSTAGRAM FROM META</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explorer;