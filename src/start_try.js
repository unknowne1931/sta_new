import React, { useEffect, useState } from 'react';
import logo from "./image/logo.png";
import img1 from "./image/tr1.gif";
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import api from './pages/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import img2 from './image/insta_1.png'; // Adjust the path as necessary


const Start_Try = () => {
  const [data, setData] = useState([]);
  const [reward_data, setReward_Data] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
    // get_data();
    // const user = localStorage.getItem("user")
    // if(user){
    //   get_reward();
    // }
    setLoad(false)
  }, []);

  useEffect(() => {
    console.log("Rewards data:", data);
  }, [data]);

  // const get_reward = async () => {
  //   setLoad(true)
  //       const fp = await FingerprintJS.load();
  //       const result = await fp.get();
  //       const id = result.visitorId
  //       const u_id = localStorage.getItem("user")
  //       api.get(`https://kalanirdhari.in/get/singel/reward/data/by/${id}/${u_id}`)
  //       .then(res=>{
  //           if(res.data.data){
  //               console.log(res.data.data)
  //               setReward_Data(res.data.data)
  //               setLoad(false)
  //           }else{
  //             setLoad(false)
  //               console.log("No Data Found")
  //           }
  //       }).catch(error =>{
  //         setLoad(false)
  //           console.log(error)
  //       })
  //   }

  const get_data = () => {
    setLoad(true)
    axios
      .get("https://kalanirdhari.in/remaining/rewards/len/and/list")
      .then((res) => {
        if (res.data.Status === "OK") {
          setData(res.data.data);
          setLoad(false)
        } else {
          console.log("Failed to fetch data");
          setLoad(false)
        }
      })
      .catch((error) => {
        setLoad(false)
        console.log(error);
      });
  };

  const share = () => {
    const shareUrl = `https://stawro.com/start/try`;
    const title = "Answer 1 Question & Win Up To ₹ 100.00";
    const message = `${title} ${shareUrl}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  return (
    <div>
      <div className='start_try_main-1st-01'>
        <div className='start_try_main-1st-01_sub_01'>
          <img src={logo} alt='logo' />
        </div>
        <div className='start_try_main-1st-01_sub_02'>
          sta<span>W</span>ro
        </div>
      </div>

      <br />

      <div className='start_try_main-2nd-01'>
        <div className='start_try_main-2nd-02'>
          <h2>Answer 1 Question & Win Up To</h2>
          <h1><span>₹</span> 100.00</h1>
        </div>

        <img src={img1} alt='animation' />

        <div className='start_try_main-2nd-01_sub_01' onClick={() => window.location.href = '/try'} >
          <h2>Start</h2>
        </div>
      </div>

      <div
        className='start_try_main-3rd-01'
        onClick={() => window.location.href = '/sample'}
      >
        View Model Questions
      </div>

      <br />

      {reward_data._id &&
        <>
          <h2 className='reward_h2_clain_m' >Reward Claim Requested</h2>
          <div className='rward_cnt_01'>

            {reward_data._id &&
              <div className='rward_cnt_01_sub_cop'>
                <h2>₹ {reward_data.rupee}</h2>
                <div className='rward_cnt_01_sub_cop_sub'>
                  Waiting for Funds.
                </div>
              </div>
            }

          </div>
        </>
      }



      <br />

      <div className='rward_cnt_share_main_01'>
        <h2>Share with Friends</h2>
        <div onClick={share} >
          <FontAwesomeIcon icon={faShare} />
        </div>
      </div>

      <div className='try_main_cnt_06'>
        <h1>Play more Like this</h1>

        <div className='try_main_cnt_06_btn' onClick={() => { window.location.href = '/' }} >
          Get Start
        </div>
      </div>

      <div className='try_main_cnt_07'>
        <h2>Follow us for the latest updates!</h2>
        <div className='try_main_cnt_07_min-00'>
          <div className='try_instagram_cnt_01' onClick={() => { window.location.href = 'https://www.instagram.com/stawro' }} >
            <img src={img2} alt='Follow us' />
          </div>

          <div className='try_instagram_cnt_02' onClick={share} >
            <FontAwesomeIcon icon={faShare} />
          </div>

        </div>
      </div>



      {/* <h2 className='start_try_h2_01'>
        Rewards Left: <strong>{data.length}</strong>
      </h2> */}

      {/* <div className='start_try_main-4th-cnt'>
        {data.map((reward, i) => (
        <>
        <div key={i} >
            ₹<span>{reward}.00</span>
        </div>
        </>
          
        ))}
      </div> */}

      <br />
    </div>
  );
};

export default Start_Try;
