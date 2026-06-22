import React, { useEffect, useRef, useState } from 'react'
import Milion from './milion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClock, faL, faTimeline, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import img1 from "../image/one.png"
import Popup from './popup';
import api from './api';
import gm_over from "../image/g_over.jpg"
import { removeFromDB } from '../db';
import Show_puz from './show';


const Ten_qst = () => {

  const sec = 0

  const [data, setData] = useState([])
  const [alert, setAlert] = useState(false)
  const [info, setInfo] = useState([])
  const [txt, setText] = useState([])
  const [typp, setTypp] = useState("")

  const [remaining, setRemaining] = useState(0);

  const intervalRef = useRef(null);
  const latestSeconds = useRef(0);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);



  const startCountdown = (target) => {
    clearInterval(intervalRef.current);
    tick(target);
    intervalRef.current = setInterval(() => tick(target), 1000);
  };

  const stopCountdown = () => {
    clearInterval(intervalRef.current);
    localStorage.removeItem("targetSecond");
    setRemaining(0);
  }


  const tick = async (target) => {
    const now = Date.now();
    const left = Math.max(
      0,
      Math.ceil((target - now) / 1000)
    );

    setRemaining(left);

    if (left <= 0) {
      clearInterval(intervalRef.current);

      localStorage.removeItem("targetSecond");

      window.location.replace("/play");
    }
  };






  const fetchData = async () => {
    localStorage.removeItem("rw")
    setAlert(false)
    api.get("http://192.168.126.1/milionear/game/get/qst/no/to/play")
      .then(res => {
        if (res.data.Status === "OUT") {
          
          setText(res.data.Status)
          // setData("Your game is over.")
          // setAlert(true)
          setInfo("")
          clearInterval(intervalRef.current);
          localStorage.removeItem("targetSecond");
          setRemaining(0);
        }
         else if (res.data.Status === "yes/no") {
          setInfo("")
          localStorage.setItem("rss", res.data.rs)
          setText(res.data.Status)
          clearInterval(intervalRef.current);
          localStorage.removeItem("targetSecond");
          setRemaining(0);
          // setData("Do you want to Quit")
          // setAlert(true)
        } else if (res.data.Status === "show") {
          setInfo("")
          setText(res.data.Status)
          setTypp(res.data.cat)
          clearInterval(intervalRef.current);
          localStorage.removeItem("targetSecond");
          setRemaining(0);
          // setData("Do you want to Quit")
          // setAlert(true)
        } else if (res.data.Data) {
          if (res.data.Data) {
            setInfo(res.data.Data);

            const savedTarget = localStorage.getItem("targetSecond");

            if (!savedTarget) {
              const target =
                Date.now() + Number(res.data.Data.seconds) * 1000;

              localStorage.setItem("targetSecond", target);

              startCountdown(target);
            } else {
              startCountdown(Number(savedTarget));
            }

            localStorage.setItem("rw", res.data.rw);
          }
        } else {
          clearInterval(intervalRef.current);
          localStorage.removeItem("targetSecond");
          setRemaining(0);
          setData("Something went Wrong")
          setAlert(true)
        }
      }).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  function Quit(ans) {
    clearInterval(intervalRef.current);
    localStorage.removeItem("targetSecond");
    setRemaining(0);
    setAlert(false)
    api.post("http://192.168.126.1/milionear/game/quit/ten/qst", { yn: ans })
      .then(res => {
        if (res.data.Status === "Credit_Quit") {
          setData("Game exited. Rewards have been added to your account.")
          setAlert(true)
        } else if (res.data.Status === "No-Game") {
          setText("OUT")
        } else if (res.data.Status === "Continue") {
          fetchData()
        } else {
          setData("Something went Wrong")
          setAlert(true)
        }
      })
  }





  return (
    <div
      style={{
        backgroundColor: remaining <= 3 ? "#041239" : "#071c5c",
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
              border: remaining <= 3 ? "1px solid orangered" : "1px solid #ffffff",
              transition: "background-color 0.5s ease, border 0.5s ease",
            }}
          >
            <p style={{ color: "white", fontSize: "3rem" }}>
              <FontAwesomeIcon icon={faClock} style={{ fontSize: "3rem" }} /> {remaining} Sec</p>
          </div>

          <br />

          <div className='seconds_qst_cntr'
            style={{
              border: remaining <= 3 ? "1px solid orangered" : "1px solid #ffffff",
              transition: "background-color 0.5s ease, border 0.5s ease",
            }}
          >
            <h2>{info.Questio}</h2>
          </div>

          <br />

          <div className='seconds_cnt_02'
            style={{
              border: remaining <= 3 ? "1px solid orangered" : "1px solid #ffffff",
              transition: "background-color 0.5s ease, border 0.5s ease",
            }}
          >
            <img src={`data:image/png;base64,${info.img}`} alt='cross' />
          </div>

          <br />


          <div className='option_cnt_cnt_01'>

            {info?.options?.map((data, i) => {

              function submit_ans() {
                clearInterval(intervalRef.current);
                localStorage.removeItem("targetSecond");
                setRemaining(0);
                fetchData();
                setAlert(false)
                api.post("http://192.168.126.1/milionear/game/verify/ans", { answer: data })
                  .then(res => {
                    if (res.data.Status === "OUT") {
                      setText(res.data.Status)
                      setData("Your game is over.")
                      setAlert(true)
                      setInfo("")
                    } else if (res.data.Status === "TimeOut") {
                      setData("Time Out")
                      setAlert(true)
                      setInfo("")
                    } else if (res.data.Status === "correct") {
                      fetchData()
                    } else if (res.data.Status === "completed") {
                      setInfo("")
                      fetchData()
                      setData("You Have Completed the Game!")
                      setAlert(true)
                    } else if (res.data.Status === "wrong") {
                      setData("Incorrect Answer. Game Over.")
                      setAlert(true)
                      setInfo("")
                    } else {
                      setInfo("")
                      setData("Something went Wrong")
                      setAlert(true)
                    }
                  }).catch(err => {
                    console.log(err)
                    setData("Something went Wrong")
                    setAlert(true)
                  })
              }

              return (

                <div
                  key={i}
                  className='option_cnt'
                  style={{
                    backgroundColor: remaining <= 3 ? "orangered" : "#0e0345",
                    border: remaining <= 3
                      ? "1px solid white"
                      : "1px solid",
                    color: "white"
                  }}

                  onClick={() => { submit_ans() }}


                >

                  <p
                    style={{
                      color: remaining === 1 ? "black" : "white",
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
            Total Prize Money: {localStorage.getItem("rss")}₹
          </div>
          <br />
          <div className='seconds_cont_01'>
            <h2 >You can cash out now, or keep going to win more</h2>

            <div className='seconds_cont_01_sub'>
              <div onClick={() => { Quit("no") }}>
                stop & Withdraw
              </div>
              <div onClick={() => { Quit("No") }}>
                Continue
              </div>

            </div>
          </div>
        </>
      }

      {txt === "OUT" &&

        <>
          <div style={{ height: "50px" }}>

          </div>
          <div className='third_cont_100'>
            <br />

            <div className='third_cont_100_sub_01'>
              Your game is over.
            </div>
            <h1>❌ Game Over</h1>
            <h1>You selected an incorrect answer.</h1>
            <h1>Please return to the start page and begin a new game.</h1>
            <br />
            <div onClick={() => { window.location.replace("/play") }} className='third_cont_100_sub_02'>
              Back
            </div>
          </div>
          <br />


          <div className='gm_over_img'>
            <img src={gm_over} />
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


      {txt === "show" &&
        <>

        
        <div className='playyy_main_cont_01_9088' >
          <Show_puz typ={typp} />
        </div>


        </>
      }










      {alert &&
        <Popup data={data} val={alert} />
      }

    </div>
  )
}

export default Ten_qst