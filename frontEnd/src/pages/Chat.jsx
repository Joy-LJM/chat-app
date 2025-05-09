import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("userInfo")){
      debugger
      navigate("/login");
    }
  },[navigate]);
  
  return (
    <div>Chat
      <p>hello world</p>
    </div>
  )
}
