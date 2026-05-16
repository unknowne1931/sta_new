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
        backgroundColor: sec <= 3 ? "#02082a" : "#071c5c",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <div style={{ height: "50px" }}></div>
      <Milion prz={"30₹"} />

      <br/>

      { true && 
      <>

        <div style={{height : "20px"}}></div>
        <div className='seconds_cnt_01'>
          <p style={{ color: "white", fontSize: "3rem" }}>
            <FontAwesomeIcon icon={faClock} style={{ fontSize: "3rem" }} /> {sec} Sec</p>
        </div>

        <br />

        <div className='seconds_qst_cntr'>
          <h2>How many options are there?</h2>
        </div>

        <br />

        <div className='seconds_cnt_02' >
          <img src={img1} alt='cross' />
        </div>

        <br />

        <div className='option_cnt_cnt_01'>
          {opt.map((option, index) => (
            <div key={index} className='option_cnt' style={{ backgroundColor: sec <= 3 ? "orangered" : "#0e0345", border: sec <= 3 ? "1px solid white" : "1px solid" }} >
              <p style={{ color: dat === "1" ? "white" : "black", fontSize: "2rem" }}>{option}</p>
            </div>
          ))}
        </div>
      </>
      }


      { false &&
        <>
          <br/>
          <div className='seconds_cont_100'>
            Total Prize Money: 30₹
          </div>
          <br/>
          <div className='seconds_cont_01'>
            <h2 >You can cash out now, or keep going to win more</h2>

            <div className='seconds_cont_01_sub'>
              <div>
                stop & Withdraw
              </div>
              <div>
                Continue
              </div>

            </div>
          </div>      
        </>
      }









    </div>
  )
}

export default Ten_qst