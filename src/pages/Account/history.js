import React, { useEffect, useState } from 'react';
import api from '../api';
import Loading from '../../loading';
import { getFromDB, saveToDB } from '../../db';

const History = () => {
  const user = localStorage.getItem("user");

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getCachedHistory();
  }, []);

  // Convert database createdAt time to Indian Time
  const getIndianTimestamp = (timestamp) => {
    if (!timestamp) return "";

    try {
      return new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).format(new Date(timestamp));
    } catch (error) {
      console.error("Timestamp conversion error:", error);
      return "";
    }
  };

  // Check cached data expiry
  const isExpired = (timestamp) => {
    const now = Date.now();
    const fiveMinutes = 1000 * 60 * 2;

    return now - timestamp > fiveMinutes;
  };

  // Get history from IndexedDB
  const getCachedHistory = async () => {
    try {
      const cached = await getFromDB(`history_${user}`);

      if (cached && !isExpired(cached.timestamp)) {
        setData(cached.data);
        setLoad(false);

        console.log("Loaded history from IndexedDB");
      } else {
        Hist();
      }
    } catch (error) {
      console.error("IndexedDB error:", error);
      Hist();
    }
  };

  // Get history from API
  const Hist = () => {
    try {
      setTimeout(() => {
        api.get(`${"http://192.168.31.133"}/update/data`)
          .then(res => {

            if (res.data.data) {
              setData(res.data.data);

              saveToDB(`history_${user}`, {
                data: res.data.data,
                timestamp: Date.now(),
              });

              setLoad(false);
            }

            else if (res.data.Logout === "OUT") {
              localStorage.removeItem("ssid");

              setLoad(false);

              window.location.reload();
            }

            else {
              setLoad(false);

              console.warn(
                "Unexpected response structure:",
                res.data
              );
            }
          })
          .catch(error => {
            setLoad(false);

            if (error.response) {
              console.error(
                "API Error:",
                error.response.status,
                error.response.data
              );
            }

            else if (error.request) {
              console.error(
                "No response from server. Please check your connection."
              );
            }

            else {
              console.error(
                "Error occurred:",
                error.message
              );
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

      {load ? (
        <Loading />
      ) : (

        <center>

          <div className='account-subb-part-01'>
            <h1>
              Transaction <span>History</span>
            </h1>
          </div>

          <div className='account_histor-page-main-cnt-01'>
            <h2 className='account_histor-page-main-cnt-01_h2_01'>History will be updated within 2 minutes</h2>

            {data.length === 0 ? (

              <div>
                <h2>No Transactions Found</h2>
              </div>

            ) : (

              data.map((item, i) => {

                return (

                  <div
                    key={item._id || i}
                    className='account_histor-page-main-cnt-01-sub-cnt-01_01'
                  >

                    {/* LEFT SIDE */}
                    <div
                      className='account_histor-page-main-cnt-01-sub-cnt-01_01_sub_div'
                      style={{ textAlign: 'start' }}
                    >

                      <h1>

                        {item.type === "Debited" &&
                          (
                            item.tp === "Stars"
                              ? "Stars Debited"
                              : "Amount Debited"
                          )
                        }

                        {item.type === "Credited" &&
                          (
                            item.tp === "Stars"
                              ? "Stars Credited"
                              : "Amount Credited"
                          )
                        }

                      </h1>

                      {/* INDIVIDUAL TRANSACTION TIME */}
                      <span className='account_histor-page-main-cnt-01-sub-cnt-01_01_sub_div_span'>

                        {getIndianTimestamp(item.createdAt)}

                      </span>

                    </div>


                    {/* RIGHT SIDE */}
                    <div className='account_histor-page-main-cnt-01-sub-cnt-01_01_sub_div'>

                      <h1>

                        {/* DEBITED */}

                        {item.type === "Debited" && (

                          <span className='account_histor-page-main-cnt-01-sub-cnt-01_01_sub_div_deb'>

                            {item.tp === "Rupee" && (
                              <span>+ ₹</span>
                            )}

                            {item.rupee}

                            {item.tp === "Stars" && (
                              <span> Stars</span>
                            )}

                          </span>

                        )}


                        {/* CREDITED */}

                        {item.type === "Credited" && (

                          <span className='account_histor-page-main-cnt-01-sub-cnt-01_01_sub_div_cred'>

                            {item.tp === "Rupee"
                              ? "+ ₹"
                              : "Stars"
                            }

                            {" "}

                            {item.rupee}

                          </span>

                        )}

                      </h1>

                    </div>

                  </div>

                );

              })

            )}

          </div>

          <div style={{ height: "50px" }}></div>

        </center>

      )}

    </div>
  );
};

export default History;