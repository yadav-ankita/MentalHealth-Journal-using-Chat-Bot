import Navbar from '../../components/Navbar/Navbar'
import Content from '../../components/Content/Content'
import { MdSupportAgent } from "react-icons/md";
import { BsPersonHeart } from "react-icons/bs";
import {Link} from 'react-router-dom';
import { RiLightbulbFlashLine } from "react-icons/ri";
import Box from '../../components/Box/Box';
import Step from '../../components/Steps/Step';
import {useGlobalContext} from '../../context/AppContext'
import { Navigate } from 'react-router-dom';
import './Home.css'
export default function Home() {
     const { user } = useGlobalContext();
    return (
        <>
              {user && <Navigate to='/Dashboard'/>}
            <Navbar/>
            <Content/>
            <div id="why-carewell">
            <h1 className='section-title'>Why Choose CareWell</h1>
            <div className='flex-container-with-margin'>

                <Box
                    icon={RiLightbulbFlashLine}
                    heading={"Intelligent Health Insights"}
                    text={"Our smart AI evaluates your health trends to deliver tailored, actionable recommendations."}
                />

                <Box
                    icon={MdSupportAgent}
                    heading={"Smart Health Guidance"}
                    text={"Receive real-time tips and insights tailored to your health needs, before problems arise."}
                />

                <Box
                    icon={BsPersonHeart}
                    heading={"Custom Wellness Plans"}
                    text={"Get personalized advice crafted around your unique health goals and lifestyle."}
                />

               </div>
            </div>
            <div className='how-it-works-section'>

                <h1 className="how-it-works-title">How It Works</h1>
                <div className="flex-container">
                    <Step
                        stepNum={"1"}
                        stepTit={"Get Started"}
                        stepDis={"Register on our platform and share your health objectives and any specific concerns you may have"}
                    />

                    <Step
                        stepNum={"2"}
                        stepTit={"Connect with AI"}
                        stepDis={"Communicate with our intelligent system to receive customized recommendations and initial evaluations."}
                    />

                    <Step
                        stepNum={"3"}
                        stepTit={"Transform Your Wellness"}
                        stepDis={"Implement your tailored wellness strategy and monitor your development continuously."}
                    />
                </div>
            </div>
            <footer>

                <div className="footer-section">
                    <div className="footer-content">
                        <h1 className="white-text">Begin Your Path to Optimal Health</h1>
                        <p className="white-text">Countless individuals are already discovering customized wellness solutions with CogniCare. Make the commitment—join us today!</p>
                        <Link to="/Signup"><button className="btn cta-button">Get Started Now</button>
                        </Link>
                       
                    </div>
                </div>
            </footer>
        </>
    )
}
