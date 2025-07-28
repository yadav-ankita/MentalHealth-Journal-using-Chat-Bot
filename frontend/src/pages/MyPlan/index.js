import React from 'react'
import './myplan.css'
import { FaLeaf } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';
import Navbarauth from '../../components/NavbarAuth/Navbarauth'
export default function MyPlan() {
  return (
    <>
      <Navbarauth />
      <div className="plan-container">
      <div className="diet-container">
        <h1 className="diet-heading">My Plan</h1>
        <div className="diet-box">
          <div className="diet-header">
            <FaLeaf className="icon" />
            <h2>Diet Plan</h2>
          </div>
          <p><strong>Title:</strong> Diet Plan for Ankita</p>
          <h3>Plan Details:</h3>
          <div className="diet-details">
           {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day=>(
              <div className="day-section">
                <h4><FaRegCalendarAlt className="icon-calendar"/>{day}</h4>
              <p><FaLeaf className="icon-meal" /> <strong>Meals:</strong></p>
              <ul>
                <li><strong style={{ color: 'green' }}>Breakfast:</strong> Oatmeal, Banana, Green Tea</li>
                <li><strong style={{ color: 'orange' }}>Lunch:</strong> Grilled Chicken, Salad, Brown Rice</li>
                <li><strong style={{ color: 'blue' }}>Dinner:</strong> Soup, Steamed Veggies, Whole Wheat Bread</li>
              </ul>
               </div>
              )
            )}
           
          </div>
          <div className="progress-section">
            <h3>Progress:</h3>
            <div className="days">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                <div key={day} className="day-progress">
                  {day} <span className="done-tag">Done</span>
                </div>
              ))}
            </div>
          </div>
          <button className="edit-btn">Edit Plan</button>
        </div>
      </div>

      <div className="exercise-container">
        <h2 className="heading"><FaDumbbell className="icon" /> Exercise Routine</h2>
        <p><strong>Title:</strong> Exercise Routine for Ankita</p>

        <h3>Plan Details:</h3>
        <div className="diet-details">
          { ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day=>(
          <div className="day-section">
            <h4><FaRegCalendarAlt className="icon-calendar" />{day}</h4>
            <p>🏋️‍♀️ <strong>Exercises:</strong></p>
            <ul>
              <li><strong>Jogging:</strong> Duration: 30 min</li>
              <li><strong>Push-ups:</strong> Sets: 3 | Reps: 15</li>
            </ul>
          </div>
          ))}
        </div>
         <div className="progress">
          <h3>Progress:</h3>
          <div className="progress-days">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div key={day} className="progress-day">
                {day} <span className="done-badge">Done</span>
              </div>
            ))}
          </div>
        </div>
      <button className="edit-btn">Edit Plan</button>
      </div>
       <div className="exercise-container">
        <h2 className="heading"><FaDumbbell className="icon" />Meditation Guide</h2>
        <p><strong>Title:</strong> Meditation Guide for Ankita</p>

        <h3>Plan Details:</h3>
        <div className="diet-details">
          { ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day=>(
          <div className="day-section">
            <h4><FaRegCalendarAlt className="icon-calendar" />{day}</h4>
            <p>🏋️‍♀️ <strong>Guide:</strong></p>
            <ul>
              <li>10-minute mindful breathing</li>
            </ul>
          </div>
          ))}
        </div>
         <div className="progress">
          <h3>Progress:</h3>
          <div className="progress-days">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div key={day} className="progress-day">
                {day} <span className="done-badge">Done</span>
              </div>
            ))}
          </div>
        </div>
      <button className="edit-btn">Edit Plan</button>
      </div>
      </div>
    </>
  )
}
