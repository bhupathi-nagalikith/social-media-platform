import React from 'react'
import './Forgottenpass.css'
function Forgottenpass() {
  const navigate=useNavigate
  return (
    <div className='cont'>
      <div className='img'>
       <img src="https://aniview.com/wp-content/uploads/2023/02/social-media-platforms.jpg" alt="" />
      </div>
      <div className='contain'>
        <div className='sub'>
        <h2>Find your account</h2>
         <form action="submit">
            <p className='label'>Enter you Mobile number or email</p>
            <input type="text" className='input' placeholder='enter your mobile number or email'/>
            <button onClick={()=>{navigate('/')}} className='btn'>Continue</button>
         </form>
         </div>
      </div>
    </div>
  )
}

export default Forgottenpass