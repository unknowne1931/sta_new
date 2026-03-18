import React, { useState, useEffect } from 'react';
import apiAdmin from '../pages/adminapi';

const Start_Gm = () => {
  const [start, setStart] = useState(''); // should be "on" or "off"
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    start_check();
  }, []);

  const start_check = () => {
    fetch("http://localhost/start/or/no/check")
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          setStart(data.status);
        } else {
          console.warn("Unexpected data:", data);
        }
      })
      .catch(err => {
        console.error("Check error:", err);
      });
  };

  const handleClick = (text) => {
    if (start.Status === "on") {
      apiAdmin.post("http://localhost/start/game/by/click", { status: "off", text })
        .then(res => {
          if (res.data.Status === "OK") {
            start_check();
          } else {
            console.warn("Unexpected response:", res.data);
          }
        })
        .catch(err => {
          console.error("API error:", err);
        });
    } else {
      setShowPopup(true);
      setCountdown(3);

      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowPopup(false);

            apiAdmin.post("http://localhost/start/game/by/click", { status: "on" })
              .then(res => {
                if (res.data.Status === "OK") {
                  start_check();
                } else {
                  console.warn("Unexpected response:", res.data);
                }
              })
              .catch(err => {
                console.error("API error:", err);
              });

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <div>
      <center className='start_admin_page_main_cnt-01'>
        <div
          onClick={()=>{handleClick("Few Minutes")}}
          className={
            start.Status === "on"
              ? 'start_admin_page_main_cnt-01-main-cnt-01 glow-border'
              : 'start_admin_page_main_cnt-01-main-cnt-02'
          }
        >
          <h2 className='start_h1_main_01'>{start.Status === "on" ? 'Stop' : 'Start'}</h2>
        </div>
      </center>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Starting in {countdown}...</h2>
          </div>
        </div>
      )}

      {start.Status === "on" &&
      
        <div className='off_by_text'>
          <button onClick={()=>{handleClick("5 Minutes")}}>5 Minutes</button>
          <button onClick={()=>{handleClick("10 Minutes")}}>10 Minutes</button>
          <button onClick={()=>{handleClick("30 Minutes")}}>30 Minutes</button>
          <button onClick={()=>{handleClick("Few Minutes")}}>Few Minutes</button>
          <button onClick={()=>{handleClick("1 Hour")}}>1 Hour</button>
          <button onClick={()=>{handleClick("1 Day")}}>1 Day</button>
          <button onClick={()=>{handleClick("2 Days")}}>2 Days</button>
          <button onClick={()=>{handleClick("3 Days")}}>3 Days</button>
        </div>

      }


    </div>
  );
};

export default Start_Gm;
