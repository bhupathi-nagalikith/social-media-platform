import { Home, MessageCircle, Film, Search, Bell, User, LogOut } from 'lucide-react';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate=useNavigate()
  return (
     <div className='main'>
      <nav className='nav'>
        <div className='logo'>socio</div>
        <ul className='lists'>
          <li className='item' onClick={()=>{navigate('/home')}}><Home size={22} style={{marginRight: '15px'}} /> Home</li>
          <li className='item' onClick={()=>{navigate('/messages')}}><MessageCircle size={22} style={{marginRight: '15px'}}/> Messages</li>
          <li className='item' onClick={()=>{navigate('/reels')}}><Film size={22} style={{marginRight: '15px'}}/> Reels</li>
          <li className='item' onClick={()=>{navigate('/search')}}><Search size={22} style={{marginRight: '15px'}}/> Search</li>
          <li className='item' onClick={()=>{navigate('/notification')}}><Bell size={22} style={{marginRight: '15px'}}/> Notifications</li>
          <li className='item' onClick={()=>{navigate('/profile')}}><User size={22} style={{marginRight: '15px'}}/> Profile</li>
        </ul>
      </nav>
      <div className='logout' onClick={()=>{navigate('/')}}>
        Logout <LogOut size={20} />
      </div>
      </div>
    
  )
}
export default Navbar