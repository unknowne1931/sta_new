import React, { useEffect, useState } from 'react'
import Milion from './milion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClock, faTimeline, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import img1 from "../image/one.png"
import Popup from './popup';
import api from './api';


const Ten_qst = () => {

  const sec = 0

  const [data, setData] = useState([])
  const [alert, setAlert] = useState(false)
  const [info, setInfo] = useState([])
  const [txt, setText] = useState([])

  const fetchData = async () => {
    localStorage.removeItem("rw")
    setAlert(false)
    api.get("http://192.168.126.1/milionear/game/get/qst/no/to/play")
      .then(res => {
        if (res.data.Status === "OUT") {
          setText(res.data.Status)
          setData("Your game is over.")
          // setAlert(true)
        } else if (res.data.Status === "yes/no") {
          setText(res.data.Status)
          setData("Do you want to Quit")
          setAlert(true)
        } else if (res.data.Data) {
          setInfo(res.data.Data)
          localStorage.setItem("rw", res.data.rw)
        } else {
          setData("Something went Wrong")
          setAlert(true)
        }
      })
  }

  useEffect(() => {
    fetchData()
  }, [])





  return (
    <div
      style={{
        backgroundColor: String(info.seconds) <= 3 ? "#041239" : "#071c5c",
        minHeight: "100vh",
        padding: "20px",
        position: "relative",
      }}
    >
      <div style={{ height: "50px" }}></div>
      <Milion prz={localStorage.getItem("rw")} />

      <br />

      {info.seconds &&
        <>

          <div style={{ height: "20px" }}></div>
          <div className='seconds_cnt_01'
            style={{
              border: String(info.seconds) <= 3 ? "1px solid orangered" : "1px solid #ffffff",
              transition: "background-color 0.5s ease, border 0.5s ease",
            }}
          >
            <p style={{ color: "white", fontSize: "3rem" }}>
              <FontAwesomeIcon icon={faClock} style={{ fontSize: "3rem" }} /> {String(info.seconds)} Sec</p>
          </div>

          <br />

          <div className='seconds_qst_cntr'
            style={{
              border: String(info.seconds) <= 3 ? "1px solid orangered" : "1px solid #ffffff",
              transition: "background-color 0.5s ease, border 0.5s ease",
            }}
          >
            <h2>{info.Questio}</h2>
          </div>

          <br />

          <div className='seconds_cnt_02'
            style={{
              border: String(info.seconds) <= 3 ? "1px solid orangered" : "1px solid #ffffff",
              transition: "background-color 0.5s ease, border 0.5s ease",
            }}
          >
            <img src={`data:image/png;base64,${info.img}`} alt='cross' />
          </div>

          <br />


          <div className='option_cnt_cnt_01'>

            {info?.options?.map((data, i) => {

              function submit_ans() {
                setAlert(false)
                api.post("http://192.168.126.1/milionear/game/verify/ans", { answer: data })
                  .then(res => {
                    if (res.data.Status === "OUT") {
                      setText(res.data.Status)
                      setData("Your game is over.")
                      setAlert(true)
                    } else if (res.data.Status === "TimeOut") {
                      setData("Time Out")
                      setAlert(true)
                    } else if (res.data.Status === "correct") {
                      fetchData()
                    } else if (res.data.Status === "completed") {
                      fetchData()
                      setData("You Have Completed the Game!")
                      setAlert(true)
                    } else if (res.data.Status === "wrong") {
                      setData("Incorrect Answer. Game Over.")
                      setAlert(true)
                    } else {
                      setData("Something went Wrong")
                      setAlert(true)
                    }
                  })
              }

              return (

                <div
                  key={i}
                  className='option_cnt'
                  style={{
                    backgroundColor: String(info.seconds) <= 3 ? "orangered" : "#0e0345",
                    border: String(info.seconds) <= 3
                      ? "1px solid white"
                      : "1px solid",
                    color: "white"
                  }}

                  onClick={() => { submit_ans() }}


                >

                  <p
                    style={{
                      color: String(info.seconds) === 1 ? "black" : "white",
                      fontSize: "2rem"
                    }}
                  >
                    {data}
                  </p>

                </div>

              )

            })}

          </div>





        </>
      }


      {txt === "yes/no" &&
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

      {txt === "OUT" &&

        <>
          <br />
          <div className='third_cont_100'>
            <br/>

            <div className='third_cont_100_sub_01'>
              Your game is over.
            </div>
            <h1>❌ Game Over</h1>
            <h1>You selected an incorrect answer.</h1>
            <h1>Please return to the start page and begin a new game.</h1>
            <br/>
            <div onClick={() => { window.location.replace("/play") }} className='third_cont_100_sub_02'>
              Back
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