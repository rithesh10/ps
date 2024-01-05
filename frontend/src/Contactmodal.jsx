import React from 'react'
import { IoIosCall } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { TbMessageChatbot } from "react-icons/tb";
const Contactmodal = () => {
  return (
    <div>
      <div className="contactbox">
        <div className="contactphone">
            <div className="phoneimage"><IoIosCall style={{fontSize:"100px", color:"rgb(53, 167, 219)"}}/></div>
            <div className="phoneinfo info">BY PHONE </div>
            <div className="phoneNo"><a href="">+91 7981991406</a></div>
            <div className="phoneNo"><a href="">+91 9182215237</a></div>
        </div>
        <div className="contactemail">
          <div className="emailimage"><CiMail style={{fontSize:"100px", color:"rgb(53, 167, 219)"}}/></div>
          <div className="emailinfo info">BY MAIL </div>
          <div className="email"><a href="mailto:22bd1a0565@gmail.com?subject=MANAS HEALTH &body=">22bd1a0565@gmail.com</a></div>
        </div>
        <div className="contactchatbot">
        <div className="chatbotimage"><TbMessageChatbot style={{fontSize:"100px", color:"rgb(53, 167, 219)"}}/></div>
           <div className="chatbotinfo info">CHAT WITH US</div>
        </div>
      </div>
    </div>
  )
}

export default Contactmodal
