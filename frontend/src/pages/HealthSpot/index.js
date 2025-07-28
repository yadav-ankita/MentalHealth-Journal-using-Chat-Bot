import React from 'react'
import Navbarauth from '../../components/NavbarAuth/Navbarauth';
import { FaSearch } from 'react-icons/fa';
import './HealthSpot.css'
export default function HealthSpot() {
  return (
     <>
      <Navbarauth/>
       <div className='find-doctor-container'>
          <div className='search-box'>
             <div className='search'>
                <span className='search-icon'><FaSearch/></span>
                <input 
                  type='text'
                  placeholder="Enter your city, area, or address"
                  className='search-input'
                />
              </div>
           <button className='search-btn'>Search</button>
           </div>
           <p style={{ color: '#555'}}>Enter your location to find nearby clinics and doctors.</p>
       </div>
     </>
  )
}
