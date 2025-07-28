import React from 'react'
import '../../App.css'
export default function Box({icon:Icon,heading,text}) {
  return (
     <>
         <div className='Box'>
              <Icon className="icon"/>
              <h1>{heading}</h1>
              <p>{text}</p>
         </div>
     </>
  )
}
