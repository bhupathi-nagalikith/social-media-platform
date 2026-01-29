import Navbar from '../components/Navbar';
import './Home.css'

function Home() {
  return (
    <div className="layout">
      
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <Navbar />
      </aside>

      {/* RIGHT CONTENT */}
      <main className="feed">
        {/* STORIES */}
        <div className="stories-container">
          {[1,2,3,4,5,6,7,8,9].map((i) => (
            <div className="story" key={i}>
              <img src={`https://i.pravatar.cc/150?img=${i}`} alt="story" />
            </div>
          ))}
        </div>

        {/* POSTS */}
        <div className="container">
          {[1,2,3,4,5].map((i) => (
            <div className="card" key={i}>
              
              <div className="profile">
                <img src={`https://i.pravatar.cc/150?img=${i+10}`} />
                <span>codewithlikith</span>
              </div>

              <img
                className="post-image"
                src={`https://picsum.photos/700/500?random=${i}`}
              />

              <div className="box">
                <div>
                  <p>❤️</p><p>💬</p><p>📤</p></div>
                <div><p>🔖</p></div>
              </div>

              <p className="captions">
                This is a sample caption 😊
              </p>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
 export default Home