import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from './pages/Home';
import Reelscontent from './pages/Reelscontent';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Forgottenpass from './pages/Forgottenpass.jsx';
import Protectedroute from './components/Protectedroute';
import MainLayout from './components/Mainlayout.jsx';
import Notification from './pages/Notification.jsx';
import Posts from './pages/Posts.jsx';
import Explorer from './pages/SearchPage.jsx';
import SearchPage from './pages/SearchPage.jsx';


function App() {
  const [login, setlogin] = useState(false);
  const [user, setuser] = useState({ email: "", password: "" });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login obj={user} setlogin={setlogin} />} />
        <Route path="/signup" element={<Signup setuser={setuser} />} />
        <Route path='forgotpassword' element={<Forgottenpass/>}/>

        <Route
          element={
            <Protectedroute login={login}>
              <MainLayout />
            </Protectedroute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/reels" element={<Reelscontent />} />
          <Route path="/messages" element={<Messages />} /> 
          <Route path="/notification" element={<Notification />} /> 
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/SearchPage" element={<SearchPage />} />  */}
          </Route>
          <Route path='/' element={<Posts/>}/>
        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
