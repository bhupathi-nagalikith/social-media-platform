import React, { useState, useRef } from 'react';
import '../styles/Posts.css';

const Posts = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedPrivacy, setSelectedPrivacy] = useState('public');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [taggedPeople, setTaggedPeople] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleTime, setScheduleTime] = useState('');
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const privacyOptions = [
    { id: 'public', label: 'Public', icon: '🌍', desc: 'Anyone can see' },
    { id: 'friends', label: 'Friends', icon: '👥', desc: 'Only your friends' },
    { id: 'private', label: 'Only Me', icon: '🔒', desc: 'Only you' },
    { id: 'custom', label: 'Custom', icon: '⚙️', desc: 'Specific people' },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setImages([...images, ...imageUrls]);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const videoUrls = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type
    }));
    setVideos([...videos, ...videoUrls]);
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const removeVideo = (id) => {
    setVideos(videos.filter(vid => vid.id !== id));
  };

  const handleTagPerson = () => {
    if (tagInput.trim() && !taggedPeople.includes(tagInput.trim())) {
      setTaggedPeople([...taggedPeople, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setTaggedPeople(taggedPeople.filter(t => t !== tag));
  };

  const handlePostSubmit = () => {
    if (!postContent.trim() && images.length === 0 && videos.length === 0) {
      alert('Please add some content to your post');
      return;
    }

    const postData = {
      content: postContent,
      privacy: selectedPrivacy,
      images: images.map(img => img.url),
      videos: videos.map(vid => vid.url),
      taggedPeople,
      isScheduled,
      scheduleTime,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0
    };

    console.log('Post submitted:', postData);
    
    alert('Post created successfully!');
    
    setPostContent('');
    setImages([]);
    setVideos([]);
    setTaggedPeople([]);
    setIsScheduled(false);
    setScheduleTime('');
  };

  const handleSaveDraft = () => {
    const draft = {
      content: postContent,
      images: images,
      videos: videos,
      taggedPeople,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('postDraft', JSON.stringify(draft));
    alert('Draft saved successfully!');
  };

  const handleLoadDraft = () => {
    const draft = JSON.parse(localStorage.getItem('postDraft'));
    if (draft) {
      setPostContent(draft.content || '');
      setImages(draft.images || []);
      setVideos(draft.videos || []);
      setTaggedPeople(draft.taggedPeople || []);
      alert('Draft loaded!');
    }
  };

  const CharacterCounter = () => {
    const maxChars = 5000;
    const usedChars = postContent.length;
    const percentage = (usedChars / maxChars) * 100;
    
    return (
      <div className="character-counter">
        <div className="counter-bar">
          <div 
            className="counter-fill" 
            style={{ 
              width: `${percentage}%`,
              backgroundColor: percentage > 90 ? '#ff4444' : percentage > 70 ? '#ffbb33' : '#00C851'
            }}
          />
        </div>
        <span className="counter-text">{usedChars}/{maxChars}</span>
      </div>
    );
  };

  return (
    <div className="create-post-page">
      <div className="post-container">
        <div className="post-header">
          <h2>Create Post</h2>
          <button className="close-btn" onClick={() => window.history.back()}>×</button>
        </div>

        <div className="author-section">
          <img 
            src="https://i.pravatar.cc/150?img=8" 
            alt="Profile" 
            className="author-avatar"
          />
          <div className="author-info">
            <h4>John Doe</h4>
            <div className="privacy-selector">
              <select 
                value={selectedPrivacy}
                onChange={(e) => setSelectedPrivacy(e.target.value)}
                className="privacy-dropdown"
              >
                {privacyOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.icon} {option.label} - {option.desc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="post-content">
          <textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="post-textarea"
            rows="6"
          />
          <CharacterCounter />
        </div>

        {images.length > 0 && (
          <div className="media-preview">
            <h4>Photos ({images.length})</h4>
            <div className="image-grid">
              {images.map(img => (
                <div key={img.id} className="image-preview">
                  <img src={img.url} alt="Preview" />
                  <button className="remove-btn" onClick={() => removeImage(img.id)}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {videos.length > 0 && (
          <div className="media-preview">
            <h4>Videos ({videos.length})</h4>
            <div className="video-grid">
              {videos.map(vid => (
                <div key={vid.id} className="video-preview">
                  <video controls>
                    <source src={vid.url} type={vid.type} />
                  </video>
                  <button className="remove-btn" onClick={() => removeVideo(vid.id)}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {taggedPeople.length > 0 && (
          <div className="tagged-section">
            <h4>Tagged People</h4>
            <div className="tag-list">
              {taggedPeople.map(tag => (
                <span key={tag} className="tag-item">
                  @{tag}
                  <button onClick={() => removeTag(tag)}>×</button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="post-options">
          <div className="options-title">Add to your post</div>
          <div className="options-grid">
            <button className="option-btn" onClick={() => fileInputRef.current.click()}>
              <span className="option-icon">📷</span>
              <span>Photo/Video</span>
            </button>
            
            <button className="option-btn" onClick={() => document.getElementById('tagInput').focus()}>
              <span className="option-icon">🏷️</span>
              <span>Tag People</span>
            </button>
            
            <button className="option-btn" onClick={() => setIsScheduled(!isScheduled)}>
              <span className="option-icon">⏰</span>
              <span>Schedule</span>
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            style={{ display: 'none' }}
          />
          
          <input
            type="file"
            ref={videoInputRef}
            onChange={handleVideoUpload}
            multiple
            accept="video/*"
            style={{ display: 'none' }}
          />
        </div>

        <div className="additional-options">
          {isScheduled && (
            <div className="additional-option schedule-option">
              <span>Schedule Post</span>
              <input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
              <button onClick={() => setIsScheduled(false)}>×</button>
            </div>
          )}
          
          <div className="tag-input-section">
            <input
              id="tagInput"
              type="text"
              placeholder="Tag people..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTagPerson()}
            />
            <button onClick={handleTagPerson}>Add</button>
          </div>
        </div>

        <div className="post-actions">
          <button className="draft-btn" onClick={handleSaveDraft}>
            Save as Draft
          </button>
          <button className="load-draft-btn" onClick={handleLoadDraft}>
            Load Draft
          </button>
          <button className="post-btn" onClick={handlePostSubmit}>
            Post
          </button>
        </div>

        <div className="privacy-info">
          <span className="privacy-icon">
            {privacyOptions.find(p => p.id === selectedPrivacy)?.icon}
          </span>
          <span>
            Your post will be visible to: {privacyOptions.find(p => p.id === selectedPrivacy)?.desc}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Posts;