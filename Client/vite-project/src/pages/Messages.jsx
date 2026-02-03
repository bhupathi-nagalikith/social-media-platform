import React, { useState } from "react";
import "../styles/Messages.css";
import Navbar from "../components/Navbar";

const chatsData = [
  {
    id: 1,
    name: "Aarav",
    lastMsg: "Hey, how are you?",
    time: "10:30 AM",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Sanya",
    lastMsg: "See you tomorrow!",
    time: "9:15 AM",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Rahul",
    lastMsg: "Project done 👍",
    time: "Yesterday",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

function Messages() {
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(chatsData[0]);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    { text: "Hi 👋", type: "received", time: "10:20 AM" },
    { text: "Hey! How’s it going?", type: "sent", time: "10:21 AM" },
    { text: "UI is looking clean 😄", type: "received", time: "10:22 AM" },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages([...messages, { text: input, type: "sent", time }]);
    setInput("");
  };

  const filteredChats = chatsData.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="messages-page">
      <Navbar />

      <div className="messages-container" style={{marginLeft:"250px"}}>
        {/* SIDEBAR */}
        <div className="chat-list">
          <h3>Messages</h3>

          <input
            className="search-input"
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="chat-items">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${
                  selectedChat.id === chat.id ? "active" : ""
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <img src={chat.avatar} alt="avatar" />
                <div className="chat-info">
                  <h4>{chat.name}</h4>
                  <p>{chat.lastMsg}</p>
                </div>
                <span className="chat-time">{chat.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT WINDOW */}
        <div className="chat-window">
          <div className="chat-header">
            <img src={selectedChat.avatar} alt="avatar" />
            <h4>{selectedChat.name}</h4>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <span>
                  {msg.text}
                  <small>{msg.time}</small>
                </span>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
