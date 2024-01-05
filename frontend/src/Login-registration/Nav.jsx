import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

// importing icons from react-icons
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { IoIosContact } from "react-icons/io";
import { CiCircleMore } from "react-icons/ci";




const Nav = () => {

  
  const [visible, setVisible] = useState(false);
  return (
    <nav className="lgn-nav">
      <h1 className="manas">
        <Link to="/">Manas health</Link>
      </h1>
      <div className="right-nav">
        <ul className="nav-item">
          <Link to="/">
            <li><IoMdHome style={{fontSize:"25px",margin:"0px 3px -5px 0px" }}/>Home</li>
          </Link>
          <a href="https://www.medicalnewstoday.com/articles/154543" target="_blank">
            <li><CiCircleMore style={{fontSize:"25px",margin:"0px 3px -5px 0px" }}/>About us</li>
          </a>
          <a href="mailto:22bd1a0565@gmail.com?subject=MANAS HEALTH &body=">
            <li><IoIosContact style={{fontSize:"25px",margin:"0px 3px -5px 0px" }}/>Contact us</li>
          </a>
        </ul>
        <ul className=" menu" onClick={() => setVisible(true)}>
        <GiHamburgerMenu style={{fontSize:"40px",color:"white"}}/>
        </ul>
        <Modal isOpen={visible}
        onRequestClose={() => setVisible(false)}
        style={{
          content: {
            width: "127px",
            height: "fit-content",
            overflow: "hidden",
            top: "7%",
            left:"",
            borderRadius: "20px",
            border: "2px solid black",
            padding:"0px",
          },
        }}>
          <ul className="menu-item" onClick={() => setVisible(false)}>
            <Link to="/">
              <li><IoMdHome style={{fontSize:"25px",margin:"0px 3px -5px 0px" }}/>Home</li>
            </Link>
            <Link>
              <li><CiCircleMore style={{fontSize:"23px",margin:"0px 3px -5px 0px" }}/>About us</li>
            </Link>
            <a href="mailto:22bd1a0565@gmail.com?subject=MANAS HEALTH &body=">
              <li><IoIosContact style={{fontSize:"25px",margin:"0px 3px -5px 0px" }}/>Contact us</li>
            </a>
          </ul>
        </Modal>
      </div>
    </nav>
  );
};

export default Nav;
