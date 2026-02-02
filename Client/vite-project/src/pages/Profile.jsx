import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import '../styles/Profile.css';

function Profile() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showProfilePicOptions, setShowProfilePicOptions] = useState(false);
  const fileInputRef = useRef(null);
  
  const [profileData, setProfileData] = useState({
    username: "codewithMash",
    fullName: "Mash | Developer",
    bio: "Building cool stuff with React 🚀",
    website: "github.com/Mash",
    email: "mash@example.com",
    phone: "+1 234 567 8900",
    gender: "Male",
    isPrivate: false,
    profileImage: "https://i.pravatar.cc/150?img=13"
  });
  
  const [tempData, setTempData] = useState({...profileData});
  const [profileImages] = useState([
    "https://i.pravatar.cc/150?img=13",
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=8",
    "https://i.pravatar.cc/150?img=5"
  ]);

  const handleEditProfile = () => {
    setTempData({...profileData});
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    setProfileData({...tempData});
    setShowEditModal(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({...profileData, profileImage: reader.result});
      };
      reader.readAsDataURL(file);
    }
    setShowProfilePicOptions(false);
  };

  const selectProfileImage = (imageUrl) => {
    setProfileData({...profileData, profileImage: imageUrl});
    setShowProfilePicOptions(false);
  };

  const takePhotoFromCamera = () => {
    alert("Camera functionality would open here. In a real app, this would use the device camera.");
  };

  const shareOptions = [
    { icon: "🔗", label: "Copy Link", action: () => {
      navigator.clipboard.writeText(`https://socialapp.com/${profileData.username}`);
      alert("Profile link copied!");
      setShowShareOptions(false);
    }},
    { icon: "📱", label: "Share via Message", action: () => {
      alert("Opening messages...");
      setShowShareOptions(false);
    }},
    { icon: "📧", label: "Share via Email", action: () => {
      window.location.href = `mailto:?subject=Check out ${profileData.username}'s profile&body=Hey, check out this profile: https://socialapp.com/${profileData.username}`;
      setShowShareOptions(false);
    }},
    { icon: "🐦", label: "Share on Twitter", action: () => {
      window.open(`https://twitter.com/intent/tweet?text=Check out ${profileData.username}'s profile&url=https://socialapp.com/${profileData.username}`, '_blank');
      setShowShareOptions(false);
    }},
    { icon: "💬", label: "Share on WhatsApp", action: () => {
      window.open(`https://wa.me/?text=Check out ${profileData.username}'s profile: https://socialapp.com/${profileData.username}`, '_blank');
      setShowShareOptions(false);
    }}
  ];

  const moreOptions = [
    { icon: "🔒", label: profileData.isPrivate ? "Switch to Public Account" : "Switch to Private Account", 
      action: () => {
        setProfileData({...profileData, isPrivate: !profileData.isPrivate});
        setShowMoreOptions(false);
      }},
    { icon: "📊", label: "View Insights", action: () => {
      alert("Opening insights...");
      setShowMoreOptions(false);
    }},
    { icon: "🏷️", label: "QR Code", action: () => {
      alert("Showing QR Code...");
      setShowMoreOptions(false);
    }},
    { icon: "📝", label: "Create Avatar", action: () => {
      alert("Opening avatar creator...");
      setShowMoreOptions(false);
    }},
    { icon: "📚", label: "Saved", action: () => {
      alert("Opening saved posts...");
      setShowMoreOptions(false);
    }},
    { icon: "⚙️", label: "Settings", action: () => {
      alert("Opening settings...");
      setShowMoreOptions(false);
    }}
  ];

  const stats = [
    { label: "Posts", count: "12" },
    { label: "Followers", count: "450" },
    { label: "Following", count: "380" }
  ];

  const recentPosts = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 }
  ];

  return (
    <div className="home-container">
      <div className="main">
        <Navbar />
      </div>

      <main className="profile-page">
        {/* Profile Header */}
        <header className="profile-header">
          <div className="profile-image">
            <img src={profileData.profileImage} alt="profile" />
            <button 
              className="change-photo-btn" 
              title="Change Photo"
              onClick={() => setShowProfilePicOptions(!showProfilePicOptions)}
            >
              <span>📷</span>
            </button>
            
            {/* Profile Picture Options Dropdown */}
            {showProfilePicOptions && (
              <div className="profile-pic-dropdown">
                <div className="dropdown-header">
                  <h4>Update Profile Picture</h4>
                  <button onClick={() => setShowProfilePicOptions(false)}>×</button>
                </div>
                
                <div className="profile-pic-grid">
                  <div className="profile-pic-option" onClick={takePhotoFromCamera}>
                    <div className="camera-icon">📸</div>
                    <p>Take Photo</p>
                  </div>
                  
                  <div className="profile-pic-option" onClick={() => fileInputRef.current.click()}>
                    <div className="upload-icon">📤</div>
                    <p>Upload Photo</p>
                  </div>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </div>
                
                <div className="profile-pic-collection-section">
                  <h5>Recent Photos</h5>
                  <div className="recent-photos-grid">
                    {profileImages.map((image, index) => (
                      <div key={index} className="recent-photo-item">
                        <img 
                          src={image} 
                          alt={`Recent ${index + 1}`}
                          onClick={() => selectProfileImage(image)}
                          className={profileData.profileImage === image ? "selected" : ""}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <section className="profile-details">
            <div className="top-row">
              <div className="username-section">
                <h2>{profileData.username}</h2>
                {profileData.isPrivate && <span className="private-badge">🔒 Private</span>}
              </div>
              
              <div className="action-buttons">
                <button className="edit-profile-btn" onClick={handleEditProfile}>
                  Edit Profile
                </button>
                
                <button className="share-profile-btn" onClick={() => setShowShareOptions(!showShareOptions)}>
                  Share Profile
                </button>
                
                <button 
                  className="more-options-btn" 
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  title="More options"
                >
                  ⋮
                </button>
              </div>
            </div>
            
            {/* Share Options Dropdown */}
            {showShareOptions && (
              <div className="share-dropdown">
                <div className="dropdown-header">
                  <h4>Share Profile</h4>
                  <button onClick={() => setShowShareOptions(false)}>×</button>
                </div>
                {shareOptions.map((option, index) => (
                  <button key={index} className="share-option" onClick={option.action}>
                    <span className="share-icon">{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
                <div className="profile-link">
                  <span>https://socialapp.com/{profileData.username}</span>
                  <button onClick={() => navigator.clipboard.writeText(`https://socialapp.com/${profileData.username}`)}>
                    Copy
                  </button>
                </div>
              </div>
            )}
            
            {/* More Options Dropdown */}
            {showMoreOptions && (
              <div className="more-dropdown">
                <div className="dropdown-header">
                  <h4>More Options</h4>
                  <button onClick={() => setShowMoreOptions(false)}>×</button>
                </div>
                {moreOptions.map((option, index) => (
                  <button key={index} className="more-option" onClick={option.action}>
                    <span className="option-icon">{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
            
            <div className="stats-row">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-count">{stat.count}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            
            <div className="bio">
              <p className="full-name">{profileData.fullName}</p>
              <p>{profileData.bio}</p>
              <a href={`https://${profileData.website}`} target="_blank" rel="noopener noreferrer">
                {profileData.website}
              </a>
              <div className="profile-links">
                <button className="profile-link-btn">
                  <span>✉️</span> Message
                </button>
                <button className="profile-link-btn">
                  <span>📧</span> Email
                </button>
                {profileData.phone && (
                  <button className="profile-link-btn">
                    <span>📞</span> Call
                  </button>
                )}
              </div>
            </div>
          </section>
        </header>

        {/* Profile Tabs */}
        <div className="profile-tabs">
          <span className="tab active">
            <span className="tab-icon">📱</span>
            POSTS
          </span>
          <span className="tab">
            <span className="tab-icon">🎬</span>
            REELS
          </span>
          <span className="tab">
            <span className="tab-icon">🏷️</span>
            TAGGED
          </span>
          <span className="tab">
            <span className="tab-icon">📚</span>
            SAVED
          </span>
        </div>

        {/* Posts Grid */}
        <div className="image-grid">
          {recentPosts.map((post) => (
            <div className="grid-item" key={post.id}>
              <img src={`https://picsum.photos/400/400?random=${post.id}`} alt="post" />
            </div>
          ))}
        </div>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="modal-overlay">
            <div className="edit-modal">
              <div className="modal-header">
                <h3>Edit Profile</h3>
                <button className="close-modal" onClick={() => setShowEditModal(false)}>×</button>
              </div>
              
              <div className="modal-body">
                <div className="form-group">
                  <label>Profile Picture</label>
                  <div className="current-profile-pic">
                    <img src={profileData.profileImage} alt="Current" />
                    <div className="profile-pic-actions">
                      <button 
                        className="change-pic-btn"
                        onClick={() => {
                          setShowEditModal(false);
                          setTimeout(() => setShowProfilePicOptions(true), 100);
                        }}
                      >
                        Change Picture
                      </button>
                      <p className="pic-info">Click to upload a new profile picture</p>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Username</label>
                  <input 
                    type="text" 
                    value={tempData.username}
                    onChange={(e) => setTempData({...tempData, username: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={tempData.fullName}
                    onChange={(e) => setTempData({...tempData, fullName: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Bio</label>
                  <textarea 
                    value={tempData.bio}
                    onChange={(e) => setTempData({...tempData, bio: e.target.value})}
                    maxLength="150"
                  />
                  <span className="char-count">{tempData.bio.length}/150</span>
                </div>
                
                <div className="form-group">
                  <label>Website</label>
                  <input 
                    type="text" 
                    value={tempData.website}
                    onChange={(e) => setTempData({...tempData, website: e.target.value})}
                    placeholder="example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={tempData.email}
                    onChange={(e) => setTempData({...tempData, email: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={tempData.phone}
                    onChange={(e) => setTempData({...tempData, phone: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Gender</label>
                  <select 
                    value={tempData.gender}
                    onChange={(e) => setTempData({...tempData, gender: e.target.value})}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={tempData.isPrivate}
                      onChange={(e) => setTempData({...tempData, isPrivate: e.target.checked})}
                    />
                    <span>Private Account</span>
                  </label>
                  <small>Only approved followers can see your posts</small>
                </div>
              </div>
              
              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button className="save-btn" onClick={handleSaveProfile}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;