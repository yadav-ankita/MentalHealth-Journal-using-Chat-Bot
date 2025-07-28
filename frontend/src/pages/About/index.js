import { FaInfoCircle } from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import Navbarauth from '../../components/NavbarAuth/Navbarauth';
import { useGlobalContext } from '../../context/AppContext'
export default function About() {
  const {user}=useGlobalContext();
  return (
    <>
     {user ? <Navbarauth/> : <Navbar/>}
      <div className='aboutContainer'>
        <div>
          <div style={{textAlign:'center'}}>
            <span><FaInfoCircle style={{marginRight: '10px',color:'#093FB4',fontSize:'1.4rem'}}/></span>
            <h1 className='blockElements' style={{color:'#093FB4'}}>About CareWell</h1>
        </div>
          <div className='AboutContent'>
            <p>CareWell is your smart wellness helper powered by AI. It's designed to support you in taking care of your health by giving you useful insights, checking symptoms, and having friendly conversations to guide your well-being.</p>
            <p>We aim to give you the right information and tips, so you can make better decisions about your health. Whether it's understanding symptoms or getting wellness advice, CareWell is always here to help.
            Along with health checks, CareWell also has a Plans section with personalized diet, exercise, and meditation routines to help you stay healthy every day. Our new Find Doctor feature makes it easy to locate nearby clinics and doctors when you need care.</p>
            <p>Please remember, CareWell is an AI assistant and not a doctor. Always speak to a healthcare professional for    medical advice or treatment.
              </p>
            <p style={{marginTop:'50px'}}>If you have any questions or suggestions, feel free to email us at
             ankitakumari16006@gamil.com 
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
