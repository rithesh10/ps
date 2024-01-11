import React from 'react'
import { FaUserDoctor } from "react-icons/fa6";
import { SiChatbot } from "react-icons/si";
const Counceller = () => {
  return (
    <div>
        <div className="councellerbox">
            <div className="psychiatrist">
                <div ><a href='https://www.google.com/search?q=psychiatrist+near+me+for+depression+and+anxiety&client=firefox-b-d&sca_esv=597261711&sxsrf=ACQVn0_TlnbF2u9eJTZOaAdz5TLBYCKdAg%3A1704910707270&ei=c9-eZY38D_enseMPn7mKkA8&oq=psychiatrist+near+me+&gs_lp=Egxnd3Mtd2l6LXNlcnAiFXBzeWNoaWF0cmlzdCBuZWFyIG1lICoCCAAyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIKEAAYgAQYigUYQzIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARI5BtQ4wRY4wRwAXgBkAEAmAGyAaABsgGqAQMwLjG4AQHIAQD4AQHCAgoQABhHGNYEGLADwgINEAAYRxjWBBjJAxiwA8ICDhAAGIAEGIoFGJIDGLADwgINEAAYgAQYigUYQxiwA-IDBBgAIEGIBgGQBgo&sclient=gws-wiz-serp#ip=1'
                 className="psychiatristimage"><FaUserDoctor style={{fontSize:'100px',color: "rgb(53, 167, 219)"}}/></a>Contact a psychiatrist</div>
            </div>
            <div className="chat">
                <div ><button className="chatimage"><SiChatbot style={{fontSize:'100px',color: "rgb(53, 167, 219)"}}/></button>Chat with our Chatbot</div>
            </div>
        </div>
      
    </div>
  )
}

export default Counceller
