import React from 'react'
import '../styles/Forgotten.css'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from 'react-router-dom';
function Forgottenpass() {
  const navigate=useNavigate()
  const submitform=(e)=>{
    e.preventDefault();
    navigate('/')
  }
  return (
    <div className='cont'>
      <div className='img'>
       <DotLottieReact
             src="https://lottie.host/15820f93-510f-4044-9e24-68925bd2b629/C3Zgkbvw9S.json"
          loop
          autoplay
          quality="high"
          style={{ width: "900px", height: "500px" }}
          />
      </div>
      <div className='contain'>
        <div className='sub'>
        <h2>Find your account</h2>
         <form onSubmit={submitform}>
            <p className='label'>Enter you Mobile number or email</p>
            <input type="text" className='input' placeholder='enter your mobile number or email'/>
            <button type='submit' className='btn'>Continue</button>
         </form>
         </div>
      </div>
    </div>
  )
}

export default Forgottenpass