import React from 'react'
import { FaUserDoctor } from "react-icons/fa6";
import { SiChatbot } from "react-icons/si";
const Counceller = () => {
  return (
    <div>
        <div className="councellerbox">
            <div className="psychiatrist">
                <div ><button className="psychiatristimage"><FaUserDoctor style={{fontSize:'100px',color: "rgb(53, 167, 219)"}}/></button>Contact a psychiatrist</div>
            </div>
            <div className="chat">
                <div ><button className="chatimage"><SiChatbot style={{fontSize:'100px',color: "rgb(53, 167, 219)"}}/></button>Chat with our Chatbot</div>
            </div>
        </div>
      
    </div>
  )
}

export default Counceller
