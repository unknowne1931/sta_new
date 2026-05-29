import React, { useEffect, useState } from 'react'
import Milion from './milion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClock, faTimeline, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import img1 from "../image/one.png"
import Popup from './popup';
import api from './api';


const Ten_qst = () => {

  const dat = "1"
  const sec = 30
  const opt = ["Option 1", "Option 2", "Option 3", "Option 4"]

  const [data, setData] = useState([])
  const [alert, setAlert] = useState(false)
  const [info, setInfo] = useState([])

  const fetchData = async () => {
    setAlert(false)
    api.get("http://192.168.126.1/milionear/game/get/qst/no/to/play")
      .then(res => {
        if (res.data.Status === "OUT") {
          setData("Your game is over.")
          setAlert(true)
        } else if (res.data.Status === "yes/no") {
          setData("Do you want to Quit")
          setAlert(true)
        } else if (res.data.Data) {
          setInfo(res.data.Data)
        }
      })
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div
      style={{
        backgroundColor: sec <= 3 ? "#041239" : "#071c5c",
        minHeight: "100vh",
        padding: "20px",
        position: "relative",
      }}
    >
      <div style={{ height: "50px" }}></div>
      <Milion prz={"30₹"} />

      <br />

      {true &&
        <>

          <div style={{ height: "20px" }}></div>
          <div className='seconds_cnt_01'
            style={{
              border: sec <= 3 ? "1px solid orangered" : "1px solid #ffffff",
              transition: "background-color 0.5s ease, border 0.5s ease",
            }}
          >
            <p style={{ color: "white", fontSize: "3rem" }}>
              <FontAwesomeIcon icon={faClock} style={{ fontSize: "3rem" }} /> {sec} Sec</p>
          </div>

          <br />

          <div className='seconds_qst_cntr'
            style={{
              border: sec <= 3 ? "1px solid orangered" : "1px solid #ffffff",
              transition: "background-color 0.5s ease, border 0.5s ease",
            }}
          >
            <h2>How many options are there?</h2>
          </div>

          <br />

          <div className='seconds_cnt_02'
            style={{
              border: sec <= 3 ? "1px solid orangered" : "1px solid #ffffff",
              transition: "background-color 0.5s ease, border 0.5s ease",
            }}
          >
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


      {false &&
        <>
          <br />
          <div className='seconds_cont_100'>
            Total Prize Money: 30₹
          </div>
          <br />
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


      {/* <h1 style={{
        position : "absolute",
        fontSize : "80vw",
        top : "30%",
        left : "50%",
        margin : "auto",
        transform : "translate(-50%,-50%)",
        color : "rgba(255, 255, 255, 0.1)",
        pointerEvents : "none",
        textAlign : "center",
      }}>{sec}</h1> */}







      {alert &&
        <Popup data={data} val={alert} />
      }

    </div>
  )
}

export default Ten_qst