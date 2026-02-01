import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, MoreVertical, Music, Volume2, VolumeX } from 'lucide-react';
import '../styles/Reels.css';
import Navbar from '../components/Navbar';

const ReelCard = ({ reel, isMuted }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.muted = isMuted;
          video.play()
            .then(() => setPlaying(true))
            .catch((err) => console.log("Waiting for interaction:", err.message));
        } else {
          video.pause();
          setPlaying(false);
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: 0.7 });
    observer.observe(video);

    return () => observer.disconnect();
  }, [isMuted]);

  const togglePlay = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().then(() => setPlaying(true));
    }
  };

  return (
    <div className="reel-card">
      <video
        ref={videoRef}
        onClick={togglePlay}
        className="reel-video"
        src={reel.videoUrl}
        loop
        playsInline
        muted={isMuted}
        preload="auto"
      />
      
      <div className="reel-overlay">
        {/* Interaction Sidebar */}
        <div className="reel-actions">
          <div className="action-item" onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}>
            <Heart size={32} color={isLiked ? "#ff3040" : "white"} fill={isLiked ? "#ff3040" : "none"} />
            <span>{reel.likes}</span>
          </div>
          <div className="action-item"><MessageCircle size={32} color="white" /><span>{reel.comments}</span></div>
          <div className="action-item"><Send size={30} color="white" /></div>
          <div className="action-item"><MoreVertical size={25} color="white" /></div>
        </div>

        {/* User Info & Caption */}
        <div className="reel-info">
          <div className="user-info">
            <div className="avatar-container">
              <img src={reel.avatar} alt="avatar" className="user-avatar" />
              <div className="avatar-border"></div>
            </div>
            <div className="user-details">
              <h4 className="username">
                {reel.user}
                <span className="verified-badge">✓</span>
              </h4>
              <button className="follow-btn">Follow</button>
            </div>
          </div>
          
          <p className="caption">{reel.caption}</p>

          <div className="music-info">
            <Music size={14} className="music-icon" />
            <div className="marquee">
              <p>{reel.music} • Original Audio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReelsPage = () => {
  const [isMuted, setIsMuted] = useState(true);

  const reelData = [
    {
      id: 1,
      user: 'nature_vibe',
      avatar: 'https://i.pravatar.cc/150?img=32',
      caption: 'Testing direct source 1 🌊 #nature #calm',
      music: 'Summer Vibes - Audio',
      likes: '12K',
      comments: '140',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 2,
      user: 'urban_life',
      avatar: 'https://i.pravatar.cc/150?img=11',
      caption: 'City lights in 4K 🌃 #urban #photography',
      music: 'Night Drive - LoFi',
      likes: '85K',
      comments: '2K',
      videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-640x360.mp4',
    }
  ];

  return (
    <div className="reels-layout">
      {/* Side Navbar */}
      <aside className="sidebar-wrapper">
        <Navbar />
      </aside>

      {/* Main Video Section */}
      <main className="reels-main-content">
        <div className="global-mute-btn" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
        </div>

        <div className="reels-container">
          {reelData.map((reel) => (
            <ReelCard key={reel.id} reel={reel} isMuted={isMuted} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ReelsPage;