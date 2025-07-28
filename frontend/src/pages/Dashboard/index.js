import Navbarauth from '../../components/NavbarAuth/Navbarauth'
import { GoPerson } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { LuLightbulb } from "react-icons/lu";
import { FiSend } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { useGlobalContext } from '../../context/AppContext'
import './Dashboard.css';
export default function Dashboard() {
  const { user } = useGlobalContext();
  return (
    <>
      <Navbarauth />
      <div className='DashContainer'>
        <div>
          <div className='welcome-header'>
            <span><GoPerson style={{ color: '#0065F8', fontSize: '1.8rem', marginRight: '10px' }} /></span>
            <h1 className='blockElements' style={{ color: '#0065F8' }}>WelCome, {user}!</h1>
          </div>
          <div className='symtoms-chat'>
            <div className="user-input">

              <div className="report-header">
                <span className="report-icon"><TbReportAnalytics /></span>
                <h1 className="report-title">Report Your Symptoms</h1>
              </div>

              <div className="selection-severity">
                <input type="text" placeholder="Symptom (e.g. headache)" />
                <select name="Severity" defaultValue="">
                  <option value="" disabled>Select Severity</option>
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>

              <button className="add-btn">
                <span style={{ marginRight: "8px" }}><FiPlusCircle /></span>Add Another Symptom
              </button>

              <button className="submit-btn">
                Submit Report <span className="send-icon"><FiSend /></span>
              </button>
            </div>

            <div className="ai-response">
              <div className="assessment-header">
                <span className="assessment-icon"><LuLightbulb /></span>
                <h1 className="assessment-title">AI Assessment & Suggestions</h1>
              </div>
              <p className="assessment-text">
                Submit a symptom report to get AI-powered assessment and suggestions tailored for you.
              </p>
            </div>
          </div>

          <div className="chat-container">
            <div className="chat-header">
              <span className="chat-icon"><FiMessageSquare /></span>
              <h1 className="chat-title">Your Personal Chat</h1>
            </div>

            <div className="chat-box">
              <div className="chat-messages">
                Start Your conversation with ai
              </div>

              <div className="chat-input">
                <input type="text" placeholder="Type your message..." />
                <button className="send-btn"><span><FiSend /></span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
