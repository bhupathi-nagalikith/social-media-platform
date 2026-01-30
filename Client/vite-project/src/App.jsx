import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from './pages/Home';
import Reelscontent from './pages/Reelscontent';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

import Protectedroute from './components/Protectedroute';
import MainLayout from './components/MainLayout';

function App() {
  const [login, setlogin] = useState(false);
  const [user, setuser] = useState({ email: "", password: "" });

  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Login obj={user} setlogin={setlogin} />} />
        <Route path="/signup" element={<Signup setuser={setuser} />} />

        {/* Protected routes */}
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
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
