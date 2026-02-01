import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, MoreVertical, Music, Volume2, VolumeX } from 'lucide-react';
import '../styles/Reels.css';

const ReelCard = ({ reel }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Reset and Play
          video.muted = isMuted;
          video.play()
            .then(() => setPlaying(true))
            .catch((err) => console.log("Playback wait:", err.message));
        } else {
          video.pause();
          setPlaying(false);
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: 0.6 });
    observer.observe(video);

    return () => observer.disconnect();
  }, [isMuted, reel.videoUrl]); // Added videoUrl to dependency to re-trigger on change

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setPlaying(true))
        .catch(err => console.error("Error playing:", err));
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
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
      
      <div className="mute-btn" onClick={toggleMute}>
        {isMuted ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
      </div>

      <div className="reel-overlay">
        <div className="reel-actions">
          <div className="action-item" onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}>
            <Heart size={32} color={isLiked ? "#ff3040" : "white"} fill={isLiked ? "#ff3040" : "none"} />
            <span>{reel.likes}</span>
          </div>
          <div className="action-item"><MessageCircle size={32} color="white" /><span>{reel.comments}</span></div>
          <div className="action-item"><Send size={30} color="white" /></div>
          <div className="action-item"><MoreVertical size={25} color="white" /></div>
        </div>

        <div className="reel-info">
          <div className="user-info">
            <img src={reel.avatar} alt="avatar" />
            <h4>{reel.user}</h4>
            <button className="follow-btn">Follow</button>
          </div>
          <p className="caption">{reel.caption}</p>
          {/* <div className="music-info">
            <Music size={16} /><div className="marquee"><p>{reel.music}</p></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const ReelsPage = () => {
  // STABLE DIRECT MP4 LINKS
  const reelData = [
    {
      id: 1,
      user: 'nature_vibe',
      avatar: 'https://i.pravatar.cc/150?img=32',
      caption: 'Testing direct source 1 🌊',
      music: 'Summer Vibes - Audio',
      likes: '12K',
      comments: '140',
      // Direct Link from W3Schools (Standard test video)
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 2,
      user: 'urban_life',
      avatar: 'https://i.pravatar.cc/150?img=11',
      caption: 'Testing direct source 2 🌃',
      music: 'Night Drive - LoFi',
      likes: '85K',
      comments: '2K',
      // High-quality vertical sample from a cloud server
      videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-640x360.mp4',
    }
  ];

  return (
    <div className="reels-container">
      {reelData.map((reel) => (
        <ReelCard key={reel.id} reel={reel} />
      ))}
    </div>
  );
};

export default ReelsPage;