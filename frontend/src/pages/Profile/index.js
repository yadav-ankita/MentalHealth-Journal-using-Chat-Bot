import React, { useEffect, useState } from 'react'
import { GoPerson } from "react-icons/go";
import Navbarauth from '../../components/NavbarAuth/Navbarauth';
import Loader from '../../components/Loader'
import { LuMessageSquare } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";
import { useGlobalContext } from '../../context/AppContext';
export default function Profile() {
  const { user, allSymptom, getAllChat, allChats, getAllSymptom, userInfo, getProfileInfo, getHealthGoals, createHealthGoal, healthGoal, isLoading, errorMsg } = useGlobalContext();
  useEffect(() => {
    getAllChat();
    getProfileInfo();
    getAllSymptom();
    getHealthGoals();
  }, [])
  const today = new Date().toISOString().slice(0, 10);
  const [description, setDescription] = useState('');
  const [targetDate, setTargetdate] = useState(today);
  const handleHealth = async () => {
    await createHealthGoal({ description, targetDate });
    getHealthGoals();
    setDescription('');
    setTargetdate(today);
  }
  return (
    <>
      {isLoading ? (
        <div style={{ marginTop: '300px' }}>
          <Loader />
          <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>Loading Profile Data...</h2>
          <p style={{ textAlign: 'center', color: 'gray' }}>Gathering your reports and conversations.</p>
        </div>
      ) : errorMsg ? (
        (
          <>
          <Navbarauth/>
          <div style={{
            marginTop:'90px',
            textAlign: 'center',
            display:'flex',
            minHeight:'100vh',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor: '#fff5f5',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <h2 style={{ color: '#b91c1c' }}>Error Loading Data</h2>
            <p style={{ color: '#b91c1c' }}>{errorMsg}</p>
            <button
              onClick={() => {
                getAllChat();
                getProfileInfo();
                getAllSymptom();
                getHealthGoals();
              }}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#b91c1c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
          </>
        )
      ) :
        (
          <>
            <Navbarauth />
            <div className='profile-container'>
              <div>
                <div className='profile-header profile-wrap'>
                  <span><GoPerson className='profile-icon' /></span>
                  <h2 className='profile-name'>{user}'s Profile</h2>
                </div>
                <div className='profile-info'>
                  <div className='profile-wrap'>
                    <span><GoPerson className='profile-icon' /></span>
                    <h2 className='profile-name black'>Personal Information</h2>
                  </div>
                  {userInfo ? (
                    <div className="profile-details">
                      <p><strong>Email:</strong> {userInfo.email}</p>
                      <p><strong>Member Since:</strong> {new Date(userInfo.memberSince).toLocaleDateString('en-GB')}</p>
                      <p><strong>Last Updated:</strong> {new Date(userInfo.lastUpdated).toLocaleDateString('en-GB')}</p>
                    </div>
                  ) : (
                    <p>Loading user info...</p>
                  )}
                </div>
                <div className='health-goals profile-info'>
                  <div className='profile-wrap'>
                    <span><GrNotes style={{ color: 'green', fontSize: '1.5rem' }} /></span>
                    <h2>Your Health Goals</h2>
                  </div>
                  {healthGoal && healthGoal.length > 0 ? (
                    <div className='goal-list'>
                      {healthGoal.map((goal, index) => (
                        <div key={index} className='goal-item'>
                          <p><strong>Goal:</strong> {goal.description}</p>
                          <p>
                            <strong>Start Date:</strong> {new Date(goal.createdAt).toLocaleDateString('en-GB')} |{" "}
                            <strong>Target Date:</strong> {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString('en-GB') : 'Not set'}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No health goals yet. Start defining your wellness journey.</p>
                  )}
                </div>
                <div className='add-health profile-info'>
                  <div className='profile-wrap'>
                    <span><GoPerson className='profile-icon' style={{ color: '#125dc1' }} /></span>
                    <h2>Add New Health Goals</h2>
                  </div>
                  <label htmlFor='goal'>Goal Description</label>
                  <input
                    type='text'
                    min={today}
                    value={description}
                    placeholder='e.g.,Drink 8 glasses of water daily'
                    onChange={e => setDescription(e.target.value)}
                  />
                  <label>Target Date(optional)</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={e => setTargetdate(e.target.value)}
                  />
                  <button className='health-btn' onClick={handleHealth}>
                    <div className='profile-wrap profile-header'>
                      <span><GoPerson className='profile-icon' style={{ color: 'white' }} /></span>
                      <h3 style={{ color: 'white' }}>Add New Health Goals</h3>
                    </div>
                  </button>
                </div>
                <div className='last-row'>
                  <div className='health-goals profile-info'>
                    <div className='profile-wrap'>
                      <span><GrNotes style={{ color: '#5409DA', fontSize: '1.5rem' }} /></span>
                      <h2>Your Symptom Reports ({allSymptom?.length || 0})</h2>
                    </div>
                    {allSymptom?.length === 0 ? (
                      <p>No symptom reports found. Submit one to see here</p>
                    ) : (
                      <div className='scroll-box'>
                        {allSymptom.map((report, index) => (
                          <div key={index} className='symptom-box'>
                            <p className='report-date'>
                              Reported on: {new Date(report.createdAt).toLocaleDateString('en-GB', { timeZone: 'UTC' })}
                            </p>
                            <p><strong>Symptoms:</strong></p>
                            <ul>
                              {report.symptoms.map((symptom, i) => (
                                <li key={i}>{symptom.name} (Severity: {symptom.severity})</li>
                              ))}
                            </ul>
                            <p style={{ color: 'purple', fontWeight: 'bold' }}>AI Assessment:</p>
                            <p>{report.aiAssessment || 'Not provided.'}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className='health-goals profile-info'>
                      <div className='profile-wrap'>
                        <span><LuMessageSquare style={{ color: '#0118D8', fontSize: '1.5rem' }} /></span>
                        <h2>Your Conversations</h2>
                      </div>
                      {allChats?.length === 0 ? (
                        <p>No conversations found. Start chatting with the AI!</p>
                      ) : (
                        <div className='scroll-box'>
                          {allChats.map((chat, index) => (
                            <div key={index} className='chat-box'>
                              <div className='chat-meta'>
                                <p className='report-date'>
                                  Started on: {new Date(chat.startedAt).toLocaleDateString('en-GB')}
                                </p>
                                <p><strong>Type:</strong> {chat.type}</p>
                                <p className='latest-header'>Latest Messages:</p>
                                <div className='message-thread'>
                                  {chat.messages.map((msg, i) => (
                                    <div key={i} className={msg.sender === 'user' ? 'user-msg' : 'ai-msg'}>
                                      <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.message}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  )
}
