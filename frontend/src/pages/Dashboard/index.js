import { useState } from 'react';
import Navbarauth from '../../components/NavbarAuth/Navbarauth'
import { GoPerson } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { LuLightbulb } from "react-icons/lu";
import { FiSend } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { FaMinus } from 'react-icons/fa';
import { useGlobalContext } from '../../context/AppContext'
export function SymtopInput({ onRemove, showRemoveButton, onSymptomChange, onSeverityChange, index, value }) {
  return (
    <div className="selection-severity" style={{ display: 'flex', alignItems: 'center' }}>
      <input type="text" placeholder="Symptom (e.g. headache)" onChange={(e) => onSymptomChange(index, e.target.value)} />
      <select defaultValue=""  onChange={(e) => onSeverityChange(index, e.target.value)}>
        <option value="" disabled>Select Severity</option>
        <option value="mild">Mild</option>
        <option value="moderate">Moderate</option>
        <option value="severe">Severe</option>
      </select>
      {/* Red button inside the component */}
      {showRemoveButton && (
        <button
          onClick={onRemove}
          style={{
            marginLeft: '10px',
            marginRight: '20px',
            color: 'white',
            width: '26px',
            height: '26px',
            borderRadius: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            border: '2px solid red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        ><span><FaMinus style={{ color: 'red' }} /></span></button>
      )}
    </div>
  );
}
export default function Dashboard() {
  const { user, submitSymptom, symptomResult, isLoading, SendMsg} = useGlobalContext();

  const [symptomList, setSymptomList] = useState([1]); // initial one input
  const [symptoms, setSymptoms] = useState(
    [
      { name: '', severity: '' }
    ]
  );
  const handleSymptomChange = (index, value) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index].name = value;
    setSymptoms(updatedSymptoms);
  };
  const handleSeverityChange = (index, value) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index].severity = value;
    setSymptoms(updatedSymptoms);
  };
  const addNewComp = () => {
    setSymptomList([...symptomList, symptomList.length + 1]);
    setSymptoms([...symptoms, { name: '', severity: '' }]); // Add blank entry
  };
  const removeComp = (index) => {
    const updatedList = symptomList.filter((_, i) => i !== index);
    const updatedSymptoms = symptoms.filter((_, i) => i !== index);
    setSymptomList(updatedList);
    setSymptoms(updatedSymptoms); // Remove corresponding symptom
  };
  const handleSymptom = () => {
    submitSymptom(symptoms);
    setSymptomList([1]); // Reset to one field
    setSymptoms([{ name: '', severity: '' }]); // Clear values
  }
  const [message, setMsg] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false)
  const handleChat = async () => {
    if (!message.trim()) return;
    // Add user message
    const newHistory = [...chatHistory, { sender: 'user', message }];
    setChatHistory(newHistory);
    setIsTyping(true);
    const response = await SendMsg({ message }); // this sends to backend
    setIsTyping(false)
    if (response && response.reply) {
      // Add AI response
      setChatHistory([...newHistory, { sender: 'ai', message: response.reply }]);
    }
    setMsg('');
  }
  return (
    <>
      <Navbarauth />
      <div className='DashContainer'>
        <div>
          <div className='welcome-header'>
            <span><GoPerson style={{ color: '#0065F8', fontSize: '1.8rem', marginRight: '10px' }} /></span>
            <h1 className='blockElements' style={{ color: '#0065F8' }}>Welcome, {user}!</h1>
          </div>
          <div className='symtoms-chat'>
            <div className="user-input">
              <div className="report-header">
                <span className="report-icon"><TbReportAnalytics /></span>
                <h1 className="report-title">Report Your Symptoms</h1>
              </div>
              {symptomList.map((_, index) => (
                <SymtopInput
                  key={index}
                  index={index}
                  value={symptoms[index]} // pass the value here
                  onRemove={() => removeComp(index)}
                  onSymptomChange={handleSymptomChange}
                  onSeverityChange={handleSeverityChange}
                  showRemoveButton={symptomList.length > 1}
                />
              ))}
              <button className="add-btn" onClick={addNewComp}>
                <span style={{ marginRight: "8px" }}><FiPlusCircle /></span>Add Another Symptom
              </button>
              {isLoading ?
                <button className="submit-btn" style={{ opacity: '0.7' }}>
                  Submitting.....
                </button> :
                <button className="submit-btn" onClick={handleSymptom}>
                  Submit Report <span className="send-icon"><FiSend /></span>
                </button>
              }
            </div>
            <div className="ai-response">
              <div className="assessment-header">
                <span className="assessment-icon"><LuLightbulb /></span>
                <h1 className="assessment-title">AI Assessment & Suggestions</h1>
              </div>
              {symptomResult ? (
                <div>
                  <div className="ai-section">
                    <strong>Assessment:</strong>
                    <p>{symptomResult.aiAssessment}</p>
                  </div>
                  <div className="ai-section">
                    <strong>Suggestion:</strong>
                    <ul className="suggestion-list">
                      {symptomResult.aiSuggestion
                        .split(/\d+\.\s+/) // split numbered suggestions
                        .filter(item => item.trim() !== "")
                        .map((suggestion, idx) => (
                          <li key={idx}>{suggestion.trim()}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="assessment-text">
                  Submit a symptom report to get AI-powered assessment and suggestions tailored for you.
                </p>
              )}

            </div>
          </div>

          <div className="chat-container">
            <div className="chat-header">
              <span className="chat-icon"><FiMessageSquare /></span>
              <h1 className="chat-title">Your Personal Chat</h1>
            </div>
            <div className="chat-box">          
              <div className="chat-messages">
                {chatHistory.length === 0 && <p className="placeholder">Start your conversation with AI</p>}
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`message-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}
                  >
                    {msg.message}
                  </div>
                ))}
                {isTyping && (
                  <div className="message-bubble ai">
                    AI is typing...
                  </div>
                )}
              </div>
              <div className="chat-input">
                <input type="text" placeholder="Type your message..." value={message} onChange={e => setMsg(e.target.value)} />
                <button className="send-btn" onClick={handleChat} disabled={isLoading}><span><FiSend /></span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
