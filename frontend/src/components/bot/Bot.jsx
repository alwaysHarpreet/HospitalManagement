import React, { useState } from 'react'
import MediHubBot from './MediHubBot'
import chatIcon from '/chat-bot.jpg'

 function Bot() {

  const [chatbotOpen,setChatbotOpen] = useState(false)
  const handleChatClick = () =>{
    setChatbotOpen(!chatbotOpen)
  }

  return (
    <div >
     <div className='bot__trigger' onClick={handleChatClick}>
            <img src={chatIcon} alt=""  className='bot__trigger-img'/>
    </div>
    {chatbotOpen ? <MediHubBot/> : ""}
    </div>
  )
}
export default Bot
