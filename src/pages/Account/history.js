import React, { useEffect, useState } from 'react';
import api from '../api';
import Loading from '../../loading';
import { getFromDB, saveToDB } from '../../db'; // Ensure this file has getFromDB & saveToDB functions

const History = () => {
  const user = localStorage.getItem("user");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getCachedHistory();
  }, []);

  const getCachedHistory = async () => {
    const cached = await getFromDB(`history_${user}`);
    if (cached && !isExpired(cached.timestamp)) {
      setData(cached.data);
      setLoad(false);
      console.log("Loaded history from IndexedDB");
    } else {
      Hist();
    }
  };

  const isExpired = (timestamp) => {
    const now = Date.now();
    const oneMinute = 1000 * 60 * 5;
    return now - timestamp > oneMinute;
  };

  const Hist = () => {
    try {
      setTimeout(() => {
        api.get(`${"https://kalanirdhari.in"}/update/data`)
          .then(res => {
            if (res.data.data) {
              setData(res.data.data);
              saveToDB(`history_${user}`, {
                data: res.data.data,
                timestamp: Date.now(),
              });
              setLoad(false);
            } else if (res.data.Logout === "OUT") {
              localStorage.removeItem("ssid");
              setLoad(false);
              window.location.reload();
            } else {
              setLoad(false);
              console.warn("Unexpected response structure:", res.data);
            }
          })
          .catch(error => {
            setLoad(false);
            if (error.response) {
              console.error("API Error:", error.response.status, error.response.data);
            } else if (error.request) {
              console.error("No response from server. Please check your connection.");
            } else {
              console.error("Error occurred:", error.message);
            }
          });
      }, 1000);
    } catch (error) {
      setLoad(false);
      console.log(error);
    }
  };

  return (
    
    <div className='history_account_body'>
      {load ? <Loading /> :
        <center>
          {/* <div className='Home-cnt-01-sub-01'>
            <strong style={{color : 'white'}}>sta<span>W</span>ro</strong>
            <hr />
          </div> */}

          <div>
            
          </div>
          
          <div className='account-subb-part-01'>
            <h1>Transaction <span>History</span></h1>
          </div>
          <div className='account_histor-page-main-cnt-01'>
            {/* {data.map((user, i) => (
              <div key={i} className='account_histor-page-main-cnt-01-sub-cnt-01'>
                {user.type === "Credited" && <span className='account_histor-page-main-cnt-01-sub-cnt-01-span-01'>
                  {user.type} "<strong> {user.tp === "Rupee" && <span>₹</span>} {user.rupee} {user.tp === "Stars" && <span>Stars</span>} </strong>" to your Account</span>}
                {user.type === "Debited" && <span className='account_histor-page-main-cnt-01-sub-cnt-01-span-01'>
                  {user.type} "<strong style={{ color: "red" }}>{user.tp === "Rupee" && <span>₹</span>} {user.rupee} {user.tp === "Stars" && <span>Stars</span>}</strong>" from your Account</span>}
              </div>
            ))} */}

            {data.map((user, i) => (
              <div key={i} className='account_histor-page-main-cnt-01-sub-cnt-01_01'>
                <div className='account_histor-page-main-cnt-01-sub-cnt-01_01_sub_div' style={{textAlign : 'start'}}>
                  <h1>
                    {user.type === "Debited" && (user.tp === "Rupee" ? "Amount Debited" : "Stars Debited")}
                    {user.type === "Credited" && (user.tp === "Rupee" ? "Amount Credited" : "Stars Credited")}
                  </h1>
                  <span className='account_histor-page-main-cnt-01-sub-cnt-01_01_sub_div_span'>{user.Time}</span>

                </div>
                <div className='account_histor-page-main-cnt-01-sub-cnt-01_01_sub_div'>
                  <h1>
                    {user.type === "Debited" && <span className='account_histor-page-main-cnt-01-sub-cnt-01_01_sub_div_deb'>{user.tp === "Rupee" && <span>+ ₹</span>} {user.rupee} {user.tp === "Stars" && <span>Stars</span>}</span> }
                    {user.type === "Credited" && <span className='account_histor-page-main-cnt-01-sub-cnt-01_01_sub_div_cred'>+ ₹{user.rupee}</span> }
                  </h1>
                </div>

              </div>
            ))}
          </div>
          <div style={{ height: "50px" }}></div>
        </center>}
    </div>
  );
};

export default History;