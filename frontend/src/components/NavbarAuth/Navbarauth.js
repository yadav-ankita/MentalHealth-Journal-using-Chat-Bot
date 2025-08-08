import React from 'react'
import '../../App.css'
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaHeartbeat } from 'react-icons/fa';
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useGlobalContext } from '../../context/AppContext';
export default function Navbarauth() {
    const { logout } = useGlobalContext();
    const onLogout = () => {
        logout();
    }
    return (
        <>
            <nav className='Navbar'>
                <div className='webName'>
                    <span><FaHeartbeat style={{ color: '#D96F32', marginRight: '10px', fontSize: '1.2rem' }} /></span>
                    <h2 className='blockElements' style={{ color: 'black' }}>CareWell</h2>
                </div>
                <div className='rightSideNav'>
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
                    {/* <Link to="/MyPlan" style={{ textDecoration: 'none' }}>
                        <div className='About'>
                            <span><CiSearch style={{ color: 'white', marginRight: '10px' }} /></span>
                            <p className='blockElements'>MyPlan</p>
                        </div>
                    </Link> */}
                    <Link to="/HealthSpot" style={{ textDecoration: 'none' }}>
                        <div className='About'>
                            <span><CiSearch style={{ color: 'white', marginRight: '10px' }} /></span>
                            <p className='blockElements'>FindDoctor</p>
                        </div>
                    </Link>
                    <Link to="/Profile" style={{ textDecoration: 'none' }}>
                        <div className='About'>
                            <span><CgProfile style={{ color: 'white', marginRight: '10px' }} /></span>
                            <p className='blockElements'>Profile</p>
                        </div>
                    </Link>
                   <button onClick={onLogout}style={{backgroundColor:'#C8A1E0',border:'none'}}>
                    <div className='Logout'>
                        <span><FaArrowRightFromBracket style={{ color: 'white', marginRight: '10px' }} /></span>
                        <p className='blockElements'>Logout</p>
                    </div>
                    </button>
                </div>

            </nav>
        </>
    )
}
