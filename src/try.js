import React, { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { getFromDB, saveToDB } from './db';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faClockFour, faGift, faTimeline, faTimesCircle, faWallet } from '@fortawesome/free-solid-svg-icons';
import Popup from './pages/popup';

const Try = () => {
  const [deviceId, setDeviceId] = useState('');
  const [startGame, setStartGame] = useState(false);
  const [dataa, setDataa] = useState('');
    const [alert, setAlert] = useState(false);
  const [data, setData] = useState([]);
  const [seconds, setSeconds] = useState(20); // start countdown from 20
  const [timerStarted, setTimerStarted] = useState(false);

  // Initialize device ID
  useEffect(() => {
    const initFingerprint = async () => {
      const id = await getFromDB("di");
      if (!id) {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setDeviceId(result.visitorId);
        await saveToDB("di", result.visitorId);
        console.log("Device ID saved:", result.visitorId);
      } else {
        setDeviceId(id);
        console.log("Device ID loaded from DB:", id);
      }
    };
    initFingerprint();
  }, []);

  // Countdown timer
  useEffect(() => {
    let interval;
    if (timerStarted && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev - 1;
          saveToDB("game_seconds", newSeconds); // store every second
          return newSeconds;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerStarted, seconds]);

  // Get questions and start countdown
  const getQst = () => {
    setAlert(false)


    if (!deviceId) return;

    axios.post("http://192.168.31.133/get/question/for/new/users/signed/out/users/qstion", { u_id: deviceId })
      .then(res => {
        if (res.data.Status === "OK") {
          setData(res.data.data);
          console.log(res.data.data);
          setTimerStarted(true); // start countdown
        } else {
            setDataa("Try Again")
            setAlert(true)
        }
      }).catch(error => console.log(error));
  };

  // Post data to start game
  const postData = () => {
    setAlert(false)
    axios.post("http://192.168.31.133/get/question/for/new/users/signed/out/users", { u_id: deviceId })
      .then(res => {
        if (res.data.Status === "OK") {
          console.log("Created");
          setStartGame(true);
          setSeconds(20); // reset countdown
        } else {
            setDataa("You’ve already played this game")
            setAlert(true)
            
                       
            window.location.href = '/';
        }
      }).catch(error => console.log(error));
  };


  const verify_data = (opt) =>{
    setAlert(false)
    axios.post("http://192.168.31.133/get/question/for/new/users/signed/out/users/verify/qst", {u_id : deviceId, sec : seconds, ans : opt , q_id : data._id})
    .then(res =>{
        if(res.data.Status === "OKK"){
            console.log(res.data.rupee)
            // alert(`You Got ${res.data.rupee} ₹ `)
            setDataa(`🎉 You won ₹${res.data.rupee}! Please log in or sign up to claim your reward.`)
            setAlert(true)
        }else if(res.data.Status === "OK"){
            setDataa(`Wrong Answer`)
            setAlert(true)
            window.location.href = '/'
        }else if(res.data.Status === "Cheated"){
            setDataa("⚠️ Time ran out!")
            setAlert(true)
            window.location.href = '/'
        }
    }).catch(error =>{
        console.log(error)
    })
  }

  return (
    <div>
      {!startGame &&
        <>
          <div className='Trry_main_01'>
            <h3>Get up to <span>100₹</span></h3>
            <div className='Trry_main_01_sub_01'>
              Time : 20 seconds <br />
              Start fee : Free<br />
              Questions : 01<br />
            </div>

            <div className='Tryy_start_btn_01' onClick={postData}>
              Start
            </div>
          </div>

          <br />
          <div className='Trry_main_02'>
            <h3>Free Trial for First-Time Users</h3>
          </div>
          <br/>

          {localStorage.getItem("token") ? "IN" : "OUT"}

          <div>

          </div>


        </>
      }

      {startGame &&
        <>
          {!data._id &&
            <>
              <div style={{ height: "60px" }}></div>
              <h1 className='gs_01_h1'>Tap to <span>start</span></h1>
              <div className='gs_01_div_01' onClick={getQst}>
                Play
              </div>
              <br />
              <h2>or</h2>
              <br />
              <div className='gs_01_div_02' onClick={() => window.location.href = '/sample'}>
                View Previous Module
              </div>
            </>
          }

          {data._id &&
            <>
                <div style={{height : "50px"}}></div>
                <div className='gs_02_cnt_01'>
                    <div className='gs_02_cnt_01_sub_01'>
                        <div>
                            <FontAwesomeIcon icon={faClockFour} style={{fontSize : "20px"}} />
                        </div>
                        <div>
                            {seconds}<span>S</span>
                        </div>
                        
                    </div>

                    <div className='gs_02_cnt_01_sub_02'>
                        {seconds> 10 &&
                            <h2>--</h2>
                        }
                        {
                            seconds <=10 &&
                              <>
                                  <div>
                                      <FontAwesomeIcon icon={faWallet} style={{ fontSize: "20px" }} />
                                  </div>
                                  <div style={{fontSize : "3rem"}}>
                                    {seconds*10}.00 ₹
                                  </div>
                              </>
                        }
                    </div>
                </div>
                <br/>

                <div className='gs_02_cnt_02'>
                    <span>{data.Questio}</span>
                </div>
                <br/>

                <div className='gs_02_cnt_03'>
                    <img src={`data:image/png;base64,${data.img}`} />
                </div>

                  <div className='gs_02_cnt_04'>
                      {data.options.map((opt) => {
                          return (
                              <div onClick={()=>{
                                verify_data(opt)
                              }}>
                                {opt}
                              </div>
                          )
                      })}
                  </div>

                
            </>
          }
        </>
      }

      {alert && <Popup data={dataa} val={alert} />}
    </div>
  );
};

export default Try;


