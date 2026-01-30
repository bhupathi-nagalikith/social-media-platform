import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      {/* STORIES */}<div>
      <Navbar/></div>
      <div className="stories-container">
        {[1, 2, 3, 4, 5, 6,7,8,9].map((i) => (
          <div className="story" key={i}>
            <img
              src={`https://i.pravatar.cc/150?img=${i}`}
              alt="story"
            />
          </div>
        ))}
      </div>

      {/* POSTS */}
      <div className="container">
        {[1, 2, 3, 4, 5].map((i) => (
          <div className="card" key={i}>
            <div className="profile">
              <div className="profile-pic">
                <img
                  src={`https://i.pravatar.cc/150?img=${i + 10}`}
                  alt="profile"
                />
              </div>
              <div className="name">Username</div>
            </div>

            <div className="post-image">
              <img
                src={`https://picsum.photos/700/500?random=${i}`}
                alt="post"
              />
            </div>

            <div className="box">
              <div>
                <span className="like">❤️</span>
                <span className="comment">💬</span>
                <span className="share">📤</span>
              </div>
              <span className="save">🔖</span>
            </div>

            <div className="captions">
              This is a sample caption for the post 😊
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
