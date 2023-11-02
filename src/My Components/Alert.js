import React from 'react'

const Alert = (props) => {
    // if (!props.alert) {
  //   return null; // Don't render anything if props.alert is null or undefined
  // }
  return (
    <div style={{height: '50px'}}>
    <div className="alert alert-primary" role="alert">        
       {props.message}
    </div>
    </div>
)}

export default Alert
