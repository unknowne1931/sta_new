// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import t1 from "./image/t1.gif"
// import t2 from "./image/t2.gif"
// import dr from "./image/dr.gif"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import Bottom from './pages/bottom';
// import { getFromDB, saveToDB } from './db';
// import FingerprintJS from '@fingerprintjs/fingerprintjs';
// import axios from 'axios';



// const Get_start = () => {

//   const location = useLocation();
//   const queryParm = new URLSearchParams(location.search);
//   const r_ui = queryParm.get('referralCode');
//   const r_di = queryParm.get('ssid');

//   const [dev_id, setDev_ID] = React.useState("");


//   useEffect(()=>{
//     const fetchData = async () => {
//       const device_id = await getFromDB("di");
//       if(device_id){
//         setDev_ID(device_id);
//       }else{
//         const fp = await FingerprintJS.load();
//         const result = await fp.get();
//         setDev_ID(result.visitorId);
//         await saveToDB("di", result.visitorId);
//         console.log("Device ID saved:", result.visitorId);
//       }
//     };
//     fetchData();
//   },[])

//   useEffect(() => {
//     const blocks = document.querySelectorAll('.Home-cnt-02-sub-01');

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('show');
//           entry.target.classList.remove('hide');
//         } else {
//           entry.target.classList.remove('show');
//           entry.target.classList.add('hide');
//         }
//       });
//     }, { threshold: 0.5 });

//     blocks.forEach((block) => {
//       observer.observe(block);
//     });

//     // Cleanup observer on unmount
//     return () => observer.disconnect();
//   }, []);

//   const login = async () => {
//     // const refer_di = await getFromDB("refer_di");
//     // const refer_ui = await getFromDB("refer_ui");

//     console.log("Device ID:", dev_id);
//     console.log("Referral User ID:", r_ui);
//     console.log("Referral Device ID:", r_di);

//     if (dev_id) {

//       if (r_di === dev_id) {
//         alert("You have claimed your referral bonus! on this device");
//       } else {

//         await saveToDB({
//           refer_ui: r_ui,
//           refer_di: r_di,
//           new: "yes",
//           device_id: dev_id
//         });

//         window.location.href = "/play";
//       }



//     } else {
//       const id = await getFromDB("di");
//       if (!id) {
//         const fp = await FingerprintJS.load();
//         const result = await fp.get();
//         await saveToDB("di", result.visitorId);
//         await saveToDB({
//           refer_ui: r_ui,
//           refer_di: r_di,
//           new: "yes",
//           device_id: result.visitorId
//         });

//         console.log("Device ID saved:", result.visitorId);
//         window.location.href = "/play";
//       } else {
//         console.log("Device ID loaded from DB:", id);
//       }




//     }
//   };


//   return (
//     <div>
//       <div className='Home-cnt-01-sub-01_logo'>
//         <strong>sta<span>W</span>ro</strong>
//         <hr />
//       </div>

//       <h2></h2>

//       <div className='get_start_page_main_cnt_01' onClick={() => login()} >
//         <h1>Get Start</h1>
//       </div>

//       <p className='get_start_page_main_cnt_01_p'>Welcome to <strong>sta<span>W</span>ro</strong> </p>

//       {/* <p className='get_start_page_main_cnt_01_p_referral'>Your referral code is: <span>{id}</span></p> */}

//       {/* <div className='get_start_page_main_cnt_01_p_referral' >

//         </div> */}

//       <div className='get_start_page_main_cnt_01_p_referral' >

//         <p>Create your account now and enjoy exclusive benefits!</p>


//         <div className='get_start_page_main_cnt_01_p_referral_code'>
//           Claim your Free Credits
//         </div>

//       </div>

//       <div style={{ height: "20px" }}></div>

//       <div className='get_start_page_main_cnt_01_p_referral' >

//         <p>
//           Deposit <strong>20</strong> and get <strong>10</strong> bonus, on your first deposit
//         </p>

//         <div className='get_start_page_main_cnt_01_p_referral_code'>
//           Deposit & get
//         </div>


//       </div>
//       <br />
//       <br />
//       <br />
//       <br />
//       <div style={{ height: "50px" }}></div>
//       {/* <h2>About our platform</h2> */}

//       <div className='Home-cnt-02'>
//         {[
//           { img: t1, text: 'Think it. Prove it. Win it.' },
//           { img: t2, text: 'Knowledge pays off, Literally. win rewards now! ' },
//           // { img: img4, text: 'We will credit the amount using UPI payments within 24 hours.' },

//         ].map((item, index) => (
//           <div key={index} className='Home-cnt-02-sub-01'>
//             <div className='Home-cnt-02-sub-01-sub-01'>
//               <img src={item.img} alt='img' />
//             </div>
//             <div className='Home-cnt-02-sub-01-sub-02'>
//               <strong>{item.text}</strong>
//             </div>
//           </div>
//         ))}

//         <div className='Home-cnt-02-sub-01'>
//           <div className='Home-cnt-02-sub-01_dr_main'>
//             <img src={dr} alt='img' />
//             <div className='Home-cnt-02-sub-01_dr_main_sub_cnt'>
//               <h2>Daily Reward</h2>
//               <div onClick={() => { window.location.href = '/start/try' }}>
//                 claim
//               </div>
//             </div>

//             <div className='Home-cnt-02-sub-01_dr_main_post'>
//               1 Free Try Today
//             </div>
//           </div>

//         </div>

//         <div className='Home-cnt-02-sub-01'>
//           <h3 className='Home-cnt-02-sub-01-h3-01' >View sample Questions</h3>
//           <div className='Home-cnt-02-sub-01-sub-01-01-01-1-00'>
//             <FontAwesomeIcon icon={faArrowRight} className='Home-cnt-02-sub-01-sub-01-01-01-1-00-icon' />
//           </div><br />
//           <button onClick={() => { window.location.href = '/sample' }} className='Home-cnt-02-sub-01-sub-btn-01' >
//             View
//           </button>
//         </div>


//       </div>
//       <br />
//       <div style={{ height: "150px" }}></div>

//       <Bottom />


//     </div>
//   )
// }

// export default Get_start






























import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import t1 from "./image/t1.gif";
import t2 from "./image/t2.gif";
import dr from "./image/dr.gif";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Bottom from './pages/bottom';
import { getFromDB, saveToDB } from './db';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from 'axios';

const Get_start = () => {
  const location = useLocation();
  const queryParm = new URLSearchParams(location.search);
  const r_ui = queryParm.get('referralCode');
  const r_di = queryParm.get('ssid');

  const [dev_id, setDev_ID] = useState("");

  // Fetch or generate device ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const device_id = await getFromDB("di");
        if (device_id) {
          setDev_ID(device_id);
          console.log("Device ID loaded from DB:", device_id);
        } else {
          const fp = await FingerprintJS.load();
          const result = await fp.get();
          setDev_ID(result.visitorId);
          await saveToDB("di", result.visitorId);
          console.log("Device ID saved:", result.visitorId);
        }
      } catch (err) {
        console.error("Error fetching device ID:", err);
      }
    };
    fetchData();
  }, []);

  // Scroll animation
  useEffect(() => {
    const blocks = document.querySelectorAll('.Home-cnt-02-sub-01');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            entry.target.classList.remove('hide');
          } else {
            entry.target.classList.remove('show');
            entry.target.classList.add('hide');
          }
        });
      },
      { threshold: 0.5 }
    );

    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, []);

  // Handle referral + login
  const login = async () => {
    try {
      console.log("Device ID:", dev_id);
      console.log("Referral User ID:", r_ui);
      console.log("Referral Device ID:", r_di);


      if (dev_id) {
        if (r_di && r_di === dev_id) {
          alert("You have already claimed your referral bonus on this device!");
        } else {
          await saveToDB("refer_ui", r_ui);
          await saveToDB("refer_di", r_di);
          await saveToDB("new", "782egs");
          await saveToDB("deb_new", "yes");
          await saveToDB("device_id", dev_id);


          

          window.location.href = "/play";
        }
      } else {
        const id = await getFromDB("di");
        if (!id) {
          const fp = await FingerprintJS.load();
          const result = await fp.get();
          await saveToDB("di", result.visitorId);
          await saveToDB("refer_ui", r_ui);
          await saveToDB("refer_di", r_di);
          await saveToDB("new", "782egs");
          await saveToDB("deb_new", "yes");
          await saveToDB("device_id", result.visitorId);

          console.log("Device ID saved:", result.visitorId);
          window.location.href = "/play";
        } else {
          console.log("Device ID loaded from DB:", id);
        }
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div>
      <div className='Home-cnt-01-sub-01_logo'>
        <strong>sta<span>W</span>ro</strong>
        <hr />
      </div>

      <div className='get_start_page_main_cnt_01' onClick={login}>
        <h1>Get Start</h1>
      </div>

      <p className='get_start_page_main_cnt_01_p'>
        Welcome to <strong>sta<span>W</span>ro</strong>
      </p>

      <div className='get_start_page_main_cnt_01_p_referral'>
        <p>Create your account now and enjoy exclusive benefits!</p>
        <div className='get_start_page_main_cnt_01_p_referral_code'>
          Claim your Free Credits
        </div>
      </div>

      <div style={{ height: "20px" }}></div>

      <div className='get_start_page_main_cnt_01_p_referral'>
        <p>
          Deposit <strong>20</strong> and get <strong>10</strong> bonus on your first deposit.
        </p>
        <div className='get_start_page_main_cnt_01_p_referral_code'>
          Deposit & get
        </div>
      </div>

      <div style={{ height: "50px" }}></div>

      <div className='Home-cnt-02'>
        {[
          { img: t1, text: 'Think it. Prove it. Win it.' },
          { img: t2, text: 'Knowledge pays off, Literally. Win rewards now!' },
        ].map((item, index) => (
          <div key={index} className='Home-cnt-02-sub-01'>
            <div className='Home-cnt-02-sub-01-sub-01'>
              <img src={item.img} alt='feature' />
            </div>
            <div className='Home-cnt-02-sub-01-sub-02'>
              <strong>{item.text}</strong>
            </div>
          </div>
        ))}

        {/* Daily Reward */}
        <div className='Home-cnt-02-sub-01'>
          <div className='Home-cnt-02-sub-01_dr_main'>
            <img src={dr} alt='reward' />
            <div className='Home-cnt-02-sub-01_dr_main_sub_cnt'>
              <h2>Daily Reward</h2>
              <div onClick={() => { window.location.href = '/start/try' }}>
                claim
              </div>
            </div>
            <div className='Home-cnt-02-sub-01_dr_main_post'>
              1 Free Try Today
            </div>
          </div>
        </div>

        {/* Sample Questions */}
        <div className='Home-cnt-02-sub-01'>
          <h3 className='Home-cnt-02-sub-01-h3-01'>View sample Questions</h3>
          <div className='Home-cnt-02-sub-01-sub-01-01-01-1-00'>
            <FontAwesomeIcon icon={faArrowRight} className='Home-cnt-02-sub-01-sub-01-01-01-1-00-icon' />
          </div><br />
          <button
            onClick={() => { window.location.href = '/sample' }}
            className='Home-cnt-02-sub-01-sub-btn-01'
          >
            View
          </button>
        </div>
      </div>

      <div style={{ height: "150px" }}></div>
      <Bottom />
    </div>
  );
};

export default Get_start;
