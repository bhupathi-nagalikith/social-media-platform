// import React from 'react'

// const Notification = () => {
//   return (
//     <div>Notification</div>
//   )
// }

// export default Notification
import React, { useState, useEffect } from 'react';
import { Bell, Heart, MessageCircle, UserPlus, AtSign, Users, Globe, Check } from 'lucide-react';
import './Notification.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);

  // Sample notification data
  const initialNotifications = [
    {
      id: 1,
      type: 'like',
      username: 'alex_johnson',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      postImage: 'https://images.unsplash.com/photo-1682687982502-1529b3b33f85?w=400&h=400&fit=crop',
      timestamp: '2 minutes ago',
      read: false,
      following: true
    },
    {
      id: 2,
      type: 'comment',
      username: 'sarah_miller',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      postImage: 'https://images.unsplash.com/photo-1682687982502-1529b3b33f85?w=400&h=400&fit=crop',
      comment: 'This looks amazing!',
      timestamp: '15 minutes ago',
      read: false,
      following: true
    },
    {
      id: 3,
      type: 'follow',
      username: 'mike_roberts',
      userAvatar: 'https://i.pravatar.cc/150?img=8',
      timestamp: '1 hour ago',
      read: true,
      following: false
    },
    {
      id: 4,
      type: 'mention',
      username: 'jessica_wong',
      userAvatar: 'https://i.pravatar.cc/150?img=11',
      postImage: 'https://images.unsplash.com/photo-1682685797366-715d29e33f9d?w=400&h=400&fit=crop',
      timestamp: '3 hours ago',
      read: true,
      following: true
    },
    {
      id: 5,
      type: 'like',
      username: 'david_smith',
      userAvatar: 'https://i.pravatar.cc/150?img=12',
      postImage: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop',
      timestamp: '5 hours ago',
      read: true,
      following: false
    },
    {
      id: 6,
      type: 'follow_request',
      username: 'emma_taylor',
      userAvatar: 'https://i.pravatar.cc/150?img=13',
      timestamp: '1 day ago',
      read: false,
      following: false
    },
    {
      id: 7,
      type: 'group_invite',
      username: 'travel_enthusiasts',
      userAvatar: 'https://i.pravatar.cc/150?img=14',
      groupName: 'Travel Enthusiasts',
      timestamp: '2 days ago',
      read: true,
      following: true
    },
    {
      id: 8,
      type: 'like',
      username: 'chris_evans',
      userAvatar: 'https://i.pravatar.cc/150?img=15',
      postImage: 'https://images.unsplash.com/photo-1682685797853-aa9b53f5dfd6?w=400&h=400&fit=crop',
      timestamp: '2 days ago',
      read: true,
      following: true
    }
  ];

  // Filter notifications based on type
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Follow a user from notification
  const handleFollow = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, following: true } : notif
      )
    );
  };

  // Accept follow request
  const acceptFollowRequest = (id) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== id)
    );
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'like': return <Heart size={18} className="icon-like" />;
      case 'comment': return <MessageCircle size={18} className="icon-comment" />;
      case 'follow': return <UserPlus size={18} className="icon-follow" />;
      case 'mention': return <AtSign size={18} className="icon-mention" />;
      case 'follow_request': return <UserPlus size={18} className="icon-follow-request" />;
      case 'group_invite': return <Users size={18} className="icon-group" />;
      default: return <Bell size={18} />;
    }
  };

  // Get notification text based on type
  const getNotificationText = (notification) => {
    switch(notification.type) {
      case 'like': 
        return `${notification.username} liked your photo`;
      case 'comment': 
        return `${notification.username} commented: "${notification.comment}"`;
      case 'follow': 
        return `${notification.username} started following you`;
      case 'mention': 
        return `${notification.username} mentioned you in a post`;
      case 'follow_request': 
        return `${notification.username} requested to follow you`;
      case 'group_invite': 
        return `${notification.username} invited you to join ${notification.groupName}`;
      default: 
        return 'New notification';
    }
  };

  // Initialize notifications and calculate unread count
  useEffect(() => {
    setNotifications(initialNotifications);
    const unread = initialNotifications.filter(notif => !notif.read).length;
    setUnreadCount(unread);
  }, []);

  // Update unread count when notifications change
  useEffect(() => {
    const unread = notifications.filter(notif => !notif.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  return (
    <div className="notification-page">
      <header className="notification-header">
        <div className="header-title">
          <Bell size={28} className="header-icon" />
          <h1>Notifications</h1>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </div>
        <div className="header-actions">
          <button 
            className="mark-all-read-btn"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </button>
          <div className="settings-btn">
            <Globe size={20} />
          </div>
        </div>
      </header>

      <div className="notification-container">
        <div className="notification-sidebar">
          <div className="sidebar-title">Filters</div>
          <div className="filter-options">
            <button 
              className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => {
                setFilter('all');
                setActiveTab('all');
              }}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeTab === 'unread' ? 'active' : ''}`}
              onClick={() => {
                setFilter('unread');
                setActiveTab('unread');
              }}
            >
              Unread
              {unreadCount > 0 && <span className="filter-count">{unreadCount}</span>}
            </button>
            <button 
              className={`filter-btn ${activeTab === 'likes' ? 'active' : ''}`}
              onClick={() => {
                setFilter('like');
                setActiveTab('likes');
              }}
            >
              <Heart size={16} />
              Likes
            </button>
            <button 
              className={`filter-btn ${activeTab === 'comments' ? 'active' : ''}`}
              onClick={() => {
                setFilter('comment');
                setActiveTab('comments');
              }}
            >
              <MessageCircle size={16} />
              Comments
            </button>
            <button 
              className={`filter-btn ${activeTab === 'follows' ? 'active' : ''}`}
              onClick={() => {
                setFilter('follow');
                setActiveTab('follows');
              }}
            >
              <UserPlus size={16} />
              Follows
            </button>
            <button 
              className={`filter-btn ${activeTab === 'mentions' ? 'active' : ''}`}
              onClick={() => {
                setFilter('mention');
                setActiveTab('mentions');
              }}
            >
              <AtSign size={16} />
              Mentions
            </button>
          </div>
          
          <div className="today-section">
            <div className="sidebar-title">Today</div>
            <div className="today-count">
              {notifications.filter(n => n.timestamp.includes('minute') || n.timestamp.includes('hour')).length} new
            </div>
          </div>
          
          <div className="this-week-section">
            <div className="sidebar-title">This Week</div>
            <div className="week-count">
              {notifications.filter(n => n.timestamp.includes('day') && parseInt(n.timestamp) < 7).length} notifications
            </div>
          </div>
        </div>

        <div className="notification-feed">
          <div className="feed-header">
            <h2 className="feed-title">
              {filter === 'all' ? 'All Notifications' : 
               filter === 'unread' ? 'Unread Notifications' : 
               filter === 'like' ? 'Likes' :
               filter === 'comment' ? 'Comments' :
               filter === 'follow' ? 'Follows' : 'Mentions'}
            </h2>
            <div className="feed-info">
              {filteredNotifications.length} notifications
            </div>
          </div>

          {filteredNotifications.length === 0 ? (
            <div className="empty-notifications">
              <Bell size={64} className="empty-icon" />
              <h3>No notifications yet</h3>
              <p>When you get notifications, they'll appear here</p>
            </div>
          ) : (
            <div className="notifications-list">
              {filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? '' : 'unread'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-content">
                    <div className="notification-avatar">
                      <img src={notification.userAvatar} alt={notification.username} />
                      <div className="notification-type-icon">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    <div className="notification-details">
                      <p className="notification-text">
                        {getNotificationText(notification)}
                      </p>
                      <span className="notification-time">{notification.timestamp}</span>
                    </div>
                    {notification.postImage && (
                      <div className="notification-post-preview">
                        <img src={notification.postImage} alt="Post" />
                      </div>
                    )}
                  </div>
                  
                  <div className="notification-actions">
                    {notification.type === 'follow' && !notification.following && (
                      <button 
                        className="follow-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFollow(notification.id);
                        }}
                      >
                        Follow back
                      </button>
                    )}
                    
                    {notification.type === 'follow_request' && (
                      <div className="follow-request-actions">
                        <button 
                          className="accept-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            acceptFollowRequest(notification.id);
                          }}
                        >
                          <Check size={16} />
                          Accept
                        </button>
                        <button 
                          className="ignore-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            acceptFollowRequest(notification.id);
                          }}
                        >
                          Ignore
                        </button>
                      </div>
                    )}
                    
                    {notification.type === 'group_invite' && (
                      <button className="join-group-btn">Join</button>
                    )}
                    
                    {!notification.read && (
                      <div className="unread-indicator"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;