import React from 'react'
import { GoPerson } from "react-icons/go";
import Navbarauth from '../../components/NavbarAuth/Navbarauth';
import './Profile.css'
import { LuMessageSquare } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";
export default function Profile() {
  return (
    <>
      <Navbarauth />
      <div className='profile-container'>
        <div>
          <div className='profile-header profile-wrap'>
            <span><GoPerson className='profile-icon' /></span>
            <h2 className='profile-name'>Ankita's Profile</h2>
          </div>
          <div className='profile-info'>
            <div className='profile-wrap'>
              <span><GoPerson className='profile-icon' /></span>
              <h2 className='profile-name black'>Personal Information</h2>
            </div>
            <p>Email:</p>
            <p>Member Since:</p>
            <p>Last Updated:</p>
          </div>
          <div className='health-goals profile-info'>
            <div className='profile-wrap'>
              <span><GrNotes style={{ color: 'green', fontSize: '1.5rem' }} /></span>
              <h2>Your Health Goals</h2>
            </div>
            <p>no health goals yet start defining your wellness journey</p>
          </div>
          <div className='add-health profile-info'>
            <div className='profile-wrap'>
              <span><GoPerson className='profile-icon' style={{ color: '#125dc1' }} /></span>
              <h2>Add New Health Goals</h2>
            </div>
            <label htmlFor='goal'>Goal Description</label>
            <input
              type='text'
              placeholder='e.g.,Drink 8 glasses of water daily'
            />
            <label>Target Date(optional)</label>
            <input
              type="date"
            />
            <button className='health-btn'>
              <div className='profile-wrap profile-header' style={{ backgroundColor: '#0118D8', margin: 'auto', width: '100%' }}>
                <span><GoPerson className='profile-icon' style={{ color: 'white' }} /></span>
                <h2 style={{ color: 'white' }}>Add New Health Goals</h2>
              </div>
            </button>
          </div>
          <div className='last-row'>
            <div className='health-goals profile-info'>
              <div className='profile-wrap'>
                <span><GrNotes style={{ color: '#5409DA', fontSize: '1.5rem' }} /></span>
                <h2>Your Symptom Reports</h2>
              </div>
              <p>No symptom reports found.Submit one to see here</p>
            </div>
            <div>
              <div className='health-goals profile-info'>
                <div className='profile-wrap'>
                  <span><LuMessageSquare style={{ color: '#0118D8', fontSize: '1.5rem' }} /></span>
                  <h2>Your Conversations</h2>
                </div>
                <p>No conversations found.Start chatting with the AI!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
