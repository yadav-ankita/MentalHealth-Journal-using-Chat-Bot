import React from 'react'
import '../../App.css'
import AI from '../../assets/AI.png';
import { Link } from 'react-router-dom';
export default function Content() {
   return (
      <>
         <div className='contentcontainer'>
            <div className='content'>
               <h1 style={{ margin: '15px' }}>Your Personalized AI Wellness Partner</h1>
               <p style={{ margin: '15px' }}>CareWell is your intelligent health assistant, designed to support you in managing your well-being, tracking symptoms, and improving your quality of life—anytime, anywhere.</p>
               <div>
                  <Link to="/Signup"><button className='btn' style={{ backgroundColor: '#0065F8', color: 'white',cursor:'pointer' }}>Get Started</button></Link>
                  <a href='#why-carewell'><button className='btn' style={{ color: '#0065F8', backgroundColor: 'white', border: '1px solid #0065F8' }}>Learn More</button></a>
               </div>
            </div>
            <div className='image'>
               <img src={AI} alt='doremon' style={{ height: '500px', marginTop: '60px' }} />
            </div>
         </div>
      </>
   )
}
