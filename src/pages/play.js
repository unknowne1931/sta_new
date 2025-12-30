import React, { useEffect, useState } from 'react'
import img1 from "../image/refer.jpg"
import api from './api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBank, faCar, faClose, faCoins, faEdit, faIndianRupee, faIndianRupeeSign, faPencil, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Popup from './popup';
import Loading from '../loading';
import veri from "../image/verify.gif"
import pro from "../image/pro.gif"
import { useLocation } from 'react-router-dom';
import imgg from "../image/to.gif"
import { getFromDB, saveToDB } from '../db';

const Play = () => {

  const location = useLocation();
  const queryParm = new URLSearchParams(location.search);
  const id = queryParm.get('id');
  const sec = queryParm.get('sec');
  const qst = queryParm.get('qst');
  const a = queryParm.get('a');
  const b = queryParm.get('b');
  const c = queryParm.get('c');
  const d = queryParm.get('d');
  const img = queryParm.get('img');
  const ans = queryParm.get('ans');
  const usa = queryParm.get('usa');
  const vr = queryParm.get('vr');
  const cat = queryParm.get('cat');
  const tough = queryParm.get('tough');

  const [balance, setBalance] = useState([]);
  const [verify, setVerify] = useState(false)
  const [start, setStart] = useState(''); // should be "on" or "off"
  const [btn1, setBtn1] = useState([]);
  const [get_rupe, setGet_Rupee] = useState([]);
  const user = localStorage.getItem("user");
  const [alert, setAlert] = useState(false)
  const [data, setData] = useState([]);
  const [selLanguages, setSelLanguages] = useState([]);
  const [getlang, setLang] = useState([]);
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [ALLLData, setALLLDAta] = useState([]);
  const [load, setLoad] = useState(true);
  const [sh_bn1, setSH_Bn1] = useState()
  const [pro_img, setProImg] = useState(false);
  const [pay_amt, setPay_Amt] = useState(false);
  const [amt_fx, setAmt_Fx] = useState('')
  const [ex_seconds, setEx_Seconds] = useState('')
  const [ex_sec, setEx_Sec] = useState('')



  useEffect(() => {
    GetAllDAta()
  }, [])

  useEffect(() => {
    GetBalance()
    GetRupeeVal()
    GetLanguages()
    start_check()
    const show_ban = localStorage.getItem("ban")
    if (show_ban === "hide") {
      setSH_Bn1(false)
    } else {
      setSH_Bn1(true)
    }
  }, [])


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


  const new_sec = (msg) =>{
    api.post("http://localhost/get/id/to/update/seonds", {id, user, sec, qst, a, b, c, d, img, ans, usa, vr, msg, ex_seconds : ex_sec, cat, tough})
    .then(res => {
      if(res.data.Status === "OK"){
        window.location.replace("/tickets")
      }else{
        window.location.replace("/play")
      }
    }).catch(error =>{
      console.log(error)
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (start === "off") {
        start_check();
      } else {
        clearInterval(interval); // Stop when start is "on"
      }
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [start]);


  const GetAllDAta = () => {
    try {
      api.get("http://localhost/get/all/admin/new/languages/data/user")
        .then(res => {
          if (res.data.Data) {
            setALLLDAta(res.data.Data)
          } else if (res.data.Logout === "OUT") {
            localStorage.removeItem("token");
            window.location.reload()
          } else {
            console.warn("Unexpected response structure:", res.data);
          }
        }).catch(error => {
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const Delete_Lang = () => {
    try {
      api.delete(`http://localhost/get/language/datas/all/get/and/delete`)
        .then(res => {
          if (res.data.Status === "OK") {
            GetLanguages()
          } else if (res.data.Status === "BAD") {

          } else if (res.data.Logout === "OUT") {
            localStorage.removeItem("ssid");
            window.location.reload()
          } else {
            console.warn("Unexpected response structure:", res.data);
          }
        }).catch(error => {
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      console.log(error)
    }

  }

  const GetRupeeVal = () => {
    try {
      fetch(`${"http://localhost"}/get/rupee/data/play`)
        .then(res => res.json())
        .then(data => {
          if (data.data) {
            setGet_Rupee(data.data)
          } else {
            console.warn("Unexpected response structure:", data);
          }
        }).catch(error => {
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const PostLang = () => {
    try {
      setAlert(false)
      api.post(`${"http://localhost"}/get/language/datas/all`, { lang: selLanguages, user })
        .then(res => {
          if (res.data.Status === "OK") {
            GetLanguages()
          } else {
            setData("Amoun not Credited")
            setAlert(true)
          }
        }).catch(error => {
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      console.log(error)
    }

  }

  const GetBalance = () => {
    try {
      api.get(`${"http://localhost"}/get/acount/balence`)
        .then(res => {
          if (res.data.data) {
            setBtn1(true)
            setBalance(res.data.data);
          } else if (res.data.Status === "NO") {
            setBtn1(false);
          } else if (res.data.Logout === "OUT") {
            localStorage.removeItem("ssid");
            window.location.reload()
          } else {
            console.warn("Unexpected response structure:", res.data);
          }
        }).catch(error => {
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      console.log(error)
    }

  }

  const New = async () => {
  try {
    setAlert(false);

    const valid_to_claim = (await getFromDB("new")) || "";
    const refer_ui = (await getFromDB("refer_ui")) || "";

    const res = await api.post("http://localhost/get/balance/new/data", {
      user,
      val_cm: valid_to_claim,
      refer_ui
    });

    if (res.data.Status === "OK") {
      await saveToDB("new", "no");
      GetBalance();
    } else if (res.data.Status === "BAD_REF") {
      setData("Invalid referral");
      setAlert(true);
    } else {
      setData("Amount not Credited");
      setAlert(true);
    }

  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response from server. Please check your connection.");
    } else {
      console.error("Error occurred:", error.message);
    }
  }
};

  const StartGame = (e) => {
    setVerify(true)
    try {
      setAlert(false)
      e.preventDefault()
      api.post(`${"http://localhost"}/start/playing/by/debit/amount/new`, { user })
        .then(res => {
          if (res.data.Status === "OK") {
            localStorage.setItem("valid", "yes")
            GetBalance()
            window.location.href = '/start'
            setVerify(false)
          } else if (res.data.Status === "Low-Bal") {
            setVerify(false)
            setData("You not Have Enough Balance")
            setAlert(true)

          } else if (res.data.Status === "BAD") {
            setVerify(false)
            setData("Your turn has ended.")
            setAlert(true)
          } else if(res.data.Status === "BAD_CR"){
            setVerify(false)
            setData("Try Again or Wait a Minute")
            setAlert(true)
          }
          else if (res.data.Status === "Time") {
            setVerify(false)
            setData(res.data.message)
            setAlert(true)
          }
          else if (res.data.Status === "no_us") {
            setVerify(false)
            setData("Claim your Free Credit")
            setAlert(true)
          } else if (res.data.Status === "les_10") {
            setVerify(false)
            setData("Try Again")
            setAlert(true)
          } else if (res.data.Status === "s_m") {
            setVerify(false)
            setData("Some credentials are missing. Please try again.")
            setAlert(true)
          }
          else {
            setVerify(false)
            setData("Something Went Wrong Try Again")
            setAlert(true)
          }
        }).catch(error => {
          setVerify(false)
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      setVerify(false)
      console.log(error)
    }


  }


  const SelHandel = (data) => {
    setSelLanguages(data);
  }

  const GetLanguages = () => {
    try {
      setTimeout(() => {
        api.get(`${"http://localhost"}/get/language/datas/all/get/${user}`)
          .then(res => {

            if (res.data.Users) {
              setShow1(false);
              setShow2(true);
              setLang(res.data.Users.lang)
              setLoad(false)
            }

            else if (res.data.Status === "IN") {
              setShow1(true);
              setShow2(false);
              setLoad(false)
            }

            else if (res.data.Logout === "OUT") {
              setLoad(false)
              localStorage.removeItem("ssid");
              window.location.reload()
            }

            else {
              setLoad(false)
              console.warn("Unexpected response structure:", res.data);
            }

          }).catch(error => {
            setLoad(false)
            if (error.response) {
              console.error("API Error:", error.response.status, error.response.data);
            } else if (error.request) {
              console.error("No response from server. Please check your connection.");
            } else {
              console.error("Error occurred:", error.message);
            }
          })
      }, 1000)

    } catch (error) {
      setLoad(false)
      console.log(error)
    }

  }




  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };



  const initiatePayment = async (amt) => {
    setAlert(false);
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        setData("Razorpay SDK failed to load. Are you online?");
        setAlert(true);
        return;
      }

      const response = await fetch("http://localhost/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, amt }),
      });

      const data = await response.json();
      if (!data.success) throw new Error("Order creation failed");
      const { order } = data;
      setAmt_Fx(false)

      const options = {
        key: "rzp_live_J6nOYKPF6WZxFj",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "staWro",
        description: "The knowledge competition",
        // 🔁 Remove handler and use backend webhook instead
        callback_url: "https://www.stawro.com/play", // Optional redirect after success
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error.message);
      setData("Payment initiation failed.");
      setAlert(true);
    }
  };



  return (
    <div className='playyy_main'>





      {/* {sh_bn1 &&
        <div className='baner_1' > <div onClick={() => { setSH_Bn1(false) }}>close</div> <h2>Write a review to earn <span>credits</span>. Share it with friends and get extra <span>credits</span> when they like it!</h2>
          <br />
          <button onClick={() => { window.location.href = '/review' }} >Go</button>
        </div>
      } */}


      {load ? <Loading /> :
        <center>
          <div className='Home-cnt-01-sub-01_logo'>
            <strong>sta<span>W</span>ro</strong>
            <hr />
          </div>

          
          <h1 className='play-h1-01'>Start <span>Game</span></h1>




          {/* main container */}

          {!pay_amt &&
            <div className='play-main-cnt-02'>
              {btn1 &&
                <div>
                  <h3>Account Balance</h3>
                  <FontAwesomeIcon icon={faIndianRupeeSign} className='play-main-cnt-02-icon-01' />
                  <span> {balance.balance ? balance.balance : "0"}.00</span>
                </div>
              }

              {!btn1 &&
                <button onClick={New} className="get_bln">Get ₹05.00 Free</button>
              }

              {btn1 &&
                <div className='add_more_btn' onClick={() => { setPay_Amt(true) }} >
                  Add More

                  {parseInt((parseInt(balance.balance) / parseInt(get_rupe.rupee))) <= 0 &&
                    <div className='add_more_btn_sub_01'>
                      All Payments Accepted
                    </div>}
                </div>
              }


              <br />
              {show2 &&

                <div className='play_sele_sel_lang'>
                  <div className='play_sele_sel_lang_div' onClick={Delete_Lang} >Tap to Change</div>
                  Selected Language : <strong>{getlang.map((lang, i) => (
                    <>
                      {lang}.
                    </>
                  ))}</strong>
                </div>

              }

              {start.Status === "on" &&
                <>
                  {show1 || show2 &&
                    <div onClick={StartGame} className='play_start_game_btn_01_cnt'>
                      <div className='play_start_game_btn_01_cnt-sub_02'>
                        {balance.balance &&
                          `You have ${parseInt((parseInt(balance.balance) / parseInt(get_rupe.rupee)))} Attempts`
                        }
                      </div>
                      <span>start</span>
                      <div className='play_start_game_btn_01_cnt-sub_01'>
                        Play with ₹ {get_rupe.rupee}.00 only
                      </div>
                    </div>
                  }
                </>
              }




              {show1 &&

                <div className='play_main_select_lang_01_main'>
                  <h1 className='play-h1-may-be-01'>Choose English, Then tap to start : </h1>
                  <div className='play-h1-may-be-01_opt_cnt_01'>
                    {ALLLData.map((data, i) => (
                      <div key={i} onClick={() => { SelHandel(data) }}
                        className={
                          selLanguages.includes(data)
                            ? "play-main-cnt-03-sub-div-02"
                            : "play-main-cnt-03-sub-div-01"
                        }
                      >
                        {selLanguages.includes(data) &&
                          <div className='play-main-cnt-03-sub-div-02_sel'>
                            selected
                          </div>
                        }
                        {data}
                      </div>
                    ))}
                  </div>

                  {selLanguages.length > 0 &&
                    <div onClick={PostLang} className='play_sel_lang_submit_btn'>
                      Add
                    </div>
                  }



                </div>

              }


              <div className='play_quick_links' onClick={() => { window.location.href = '/account/upi' }}>
                <span>Add Bank or UPI to Receive Payments</span>
              </div>


            </div>
          }

          {pay_amt &&

            <div className='play-main-cnt-02-true'>
              <h2>Add Amount to Wallet</h2>
              <form onSubmit={(e) => {
                e.preventDefault(); // prevent page reload
                initiatePayment(amt_fx);
              }}>
                <div className='play-main-cnt-02-true_sub'>
                  <input
                    type='text'
                    placeholder='0.00'
                    onChange={e => setAmt_Fx(e.target.value)}
                    required
                  />
                </div>
                <br />

                <div className='pay_buttonn-n'>
                  <button type='submit'>Pay</button>
                </div>
              </form>



              <div className='mod-rppu' >Quick Add</div>
              <div className='play-main-cnt-02-true_sub_sub'>
                <button onClick={() => initiatePayment(20)} >20</button>
                <button onClick={() => initiatePayment(50)} >50</button>
                <button onClick={() => initiatePayment(100)} >100</button>
                <button onClick={() => initiatePayment(200)} >200</button>
                <button onClick={() => initiatePayment(500)} >500</button>
                <button onClick={() => initiatePayment(1000)} >1000</button>
              </div>
            </div>
          }


          <br />


          {start.Status !== "on" &&
            <div className='stop_play_cnt-01'>

              <strong>
                {start.text}
              </strong>
              <p>to Start the Game</p>

            </div>

          }

          <div className='stop_play_ticket_page' onClick={()=>window.location.href='/tickets'} >
            My Submissions
          </div>


          <h2 className='play_refer_h2_01'>Refer <span>Friend</span> </h2>
          <div className='play_refer_one'>
            <div className='play_refer_one_img'>
              <img src={img1} />
            </div>
            <div className='rfrr_h2_01'>
              <h2>Write a review to earn <span>credits</span>. Share it with friends and get extra <span>credits</span> when they like it!</h2>
              <br />
              <button onClick={() => { window.location.href = '/refer' }} >Go</button>
            </div>
          </div>



        </center>}
      {alert &&

        <Popup data={data} val={alert} />
      
      }


      {verify &&

        <div className='start_play_main_load-cnt-01'>
          <div className="verify_pop_up-cnt-01">
            <img src={veri} />
          </div>
        </div>

      }

      {pro_img &&
        <div className='play-header_process'>
          <h1 className='play-header_process_h1_01'>Processing... Do not refresh or close the page</h1>

          <div className='play-header_process-sub'>
            <img src={pro} />
            {/* <h2>Play with ₹ 05.00 only</h2>
            <p>Get ₹ 05.00 Free on your first play</p> */}

          </div>
          <div className='play-header_process-sub-02'>
            <h2>Otherwise you will lose your Transaction</h2>
          </div>
        </div>
      }

      <div style={{ height: "50px" }}></div>

      {id &&
        <div className='playyy_main_sub_01'>
            <h1>Let Us Know</h1>
            {/* <div className='playyy_main_sub_01_sub_01'>
              <img src={imgg} alt='time over' />
            </div> */}
            {/* <span className='playyy_spn_01'>If time is short, please report it to us.</span> */}
            <h2>Past seconds : {sec} </h2>
            <p className='playyy_para_01'>Report to us, and we will verify and refund if there is any issue.</p>
            <button style={{backgroundColor : "green"}} onClick={()=>window.location.replace("/play")}>
              Everything’s Fine
            </button>
            
            {ex_sec.length < 1 && 
              <button onClick={()=>new_sec("Wrong Option")}>
                Wrong Option
              </button>
            }
            
            {vr === "false" &&
            <button onClick={()=>new_sec("Time Shortage")}>
              Time Shortage
            </button>
            }



            {vr === "false" &&
              <>
                <div className='play_seconds_increase_txt' >
                  <span>Add more seconds</span>
                </div>                
              </>
            }

            {vr === "false" &&
              <input type='number' className='input_report_1_sec' onChange={e=>{setEx_Sec(e.target.value)}} placeholder='expected seconds' />
            }

            {vr === "false" &&
              <>
                {ex_sec.length >= 1 &&
                  <div className='add_play_sec_new_01' onClick={()=>new_sec("Time Shortage")} >Add</div>
                }
              </>
            }

            {ex_sec.length < 1 &&

            <>
              <button onClick={()=>new_sec("Image Loading")}>
                Image Loading
              </button>
              <button onClick={()=>new_sec("Question not found")}>
                Question not found
              </button>
            </>
            }

            

            

          <br/>
          <br/>
          {/* <span onClick={()=>window.location.replace('/play')} className='playyy_spn_out'>Yes, the time is sufficient</span> */}

        </div>
      }
    </div>
  )
}

export default Play

