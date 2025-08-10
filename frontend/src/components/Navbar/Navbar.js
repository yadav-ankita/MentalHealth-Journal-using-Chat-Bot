import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome,FaBars,FaTimes} from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';
import { FaRightToBracket } from "react-icons/fa6";
import { FaHeartbeat } from 'react-icons/fa';
import { useRef } from "react";
export default function Navbar() {
   const navRef = useRef();
   const showNavbar = () => {
      if (navRef.current) {
         navRef.current.classList.toggle("responsive_nav");
      }
   }
   return (
      <>
         <nav className='Navbar'>
            <div className='webName'>
               <span><FaHeartbeat style={{ color: '#D96F32', marginRight: '10px', fontSize: '1.2rem' }} /></span>
               <h2 className='blockElements' style={{ color: 'black' }}>CogniWell</h2>
            </div>
            <div className='rightSide' ref={navRef}>
               <Link to="/Dashboard" style={{ textDecoration: 'none' }}>
                  <div className='DashBoard' >
                     <span><FaHome style={{ color: 'white', marginRight: '10px' }} /></span>
                     <p className='blockElements'>Dashboard</p>
                  </div>
               </Link>
               <Link to="/About" style={{ textDecoration: 'none' }}>
                  <div className='About'>
                     <span><FaInfoCircle style={{ color: 'white', marginRight: '10px' }} /></span>
                     <p className='blockElements'>About</p>
                  </div>
               </Link>
               <Link to="/Login" style={{ textDecoration: 'none' }}>
                  <div className='Login'>
                     <span><FaRightToBracket style={{ color: 'white', marginRight: '10px' }} /></span>
                     <p className='blockElements'>Login</p>
                  </div>
               </Link>
               <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                  <FaTimes />
               </button>
            </div>
            <button className="nav-btn" onClick={showNavbar}>
               <FaBars />
            </button>
         </nav>
      </>
   )
}
