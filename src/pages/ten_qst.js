import React from 'react'
import Milion from './milion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClock, faTimeline, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import img1 from "../image/one.png"

const Ten_qst = () => {

  const dat = "1"
  const sec = 30
  const opt = ["Option 1", "Option 2", "Option 3", "Option 4"]

  return (
    <div
      style={{
        backgroundColor: dat === "1" ? "#071c5c" : "#fff",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <div style={{height : "30px"}}></div>
      <Milion prz={"30₹"} />


      <div className='seconds_cnt_01'>
        <p style={{color : dat === "1" ? "white" : "black" , fontSize : "3rem"}}> 
        <FontAwesomeIcon icon={faClock} style={{color : dat === "1" ? "white" : "red" , fontSize : "3rem"}} /> {sec} Sec</p>
      </div>

      <br/>

      <div className='seconds_cnt_02'>
        <img src={img1} alt='cross' />
      </div>

      <div>
        {opt.map((option, index) => (
          <div key={index} className='option_cnt'>
            <p style={{color : dat === "1" ? "white" : "black" , fontSize : "2rem"}}>{option}</p>
          </div>
        ))}
      </div>

      


    </div>
  )
}

export default Ten_qst