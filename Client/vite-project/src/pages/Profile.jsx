import React from "react";
import "./Profile.css";
import Navbar from "../components/Navbar";
import './Profile.css'

function Profile() {
  return (
    <div className="home-container">
      
      <div className="main">
        <Navbar />
        
      </div>

      <main className="profile-page">
       
        <header className="profile-header">
          <div className="profile-image">
            <img src="https://i.pravatar.cc/150?img=13" alt="profile" />
          </div>
          
          <section className="profile-details">
            <div className="top-row">
              <h2>codewithMash</h2>
              <button className="b">Edit Profile</button>
              {/* <button className="settings-btn">⚙️</button> */}
            </div>
            
            <div className="stats-row">
              <span><strong>12</strong> posts</span>
              <span><strong>450</strong> followers</span>
              <span><strong>380</strong> following</span>
            </div>
            
            <div className="bio">
              <p className="full-name">Mash | Developer</p>
              <p>Building cool stuff with React 🚀</p>
              <a href="#">github.com/Mash</a>
            </div>
          </section>
        </header>

        {/* POSTS GRID */}
        <div className="profile-tabs">
          <span className="active">POSTS</span>
          <span>REELS</span>
          <span>TAGGED</span>
        </div>

        <div className="image-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div className="grid-item" key={i}>
              <img src={`https://picsum.photos/400/400?random=${i}`} alt="post" />
              <div className="grid-overlay">
                <span>❤️ 42</span>
                <span>💬 12</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Profile;