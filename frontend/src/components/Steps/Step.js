import React from 'react'
import '../../App.css'
export default function Step({stepNum,stepTit,stepDis}) {
  return (
     <div className="step">
                    <div className="step-number">{stepNum}</div>
                    <h2 className="step-title">{stepTit}</h2>
                    <p className="step-description">
                       {stepDis}
                    </p>
      </div>
  )
}
