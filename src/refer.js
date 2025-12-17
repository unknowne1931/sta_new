import React, { useEffect, useState } from 'react'
import img1 from "./image/refer_1.jpg"
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { getFromDB, saveToDB } from './db';

const Refer = () => {

  const [dev_id, setDev_ID] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const di = await getFromDB("di");

      if (di) {
        setDev_ID(di);
      } else {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setDev_ID(result.visitorId);
        await saveToDB("di", result.visitorId);
        console.log("Device ID saved:", result.visitorId);
      }
    };
    fetchData();
  }, []);


  const share = async () => {

    const di = await getFromDB("di");
    const shareUrl = `https://stawro.com/get/start?referralCode=${localStorage.getItem("user")}&ssid=${dev_id}`;
    const title = "Answer 1 Question & Win Up To ₹ 100.00";
    const message = `${title} ${shareUrl}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      <div className='refer_page_01-cnt_main_02'>
        <div className='Home-cnt-01-sub-01'>
          <strong>
            sta<span>W</span>ro
          </strong>
          <hr />
        </div>
        <h2>Use Phone Only</h2>
      </div>
      <div className='refer_page_01-cnt_main_01'>
        <div className='Home-cnt-01-sub-01'>
          <strong>
            sta<span>W</span>ro
          </strong>
          <hr />
        </div>

        <div className='refer_page_01_txt-01'>
          <h1>Refer & <span>Earn</span></h1>
          <p>Refer <strong>friends</strong> and earn rewards!</p>
        </div>

        <div className='refer_page_01'>
          <img src={img1} alt="Refer" />
          <div className='refer_page_01_sub_01' onClick={share} >
            <span>Refer</span>
          </div>
        </div>

        <br />
        <br />

        <div className='refer_page_01_sub_02'>
          <h2>Refer & Earn ₹<span>50</span> .</h2>

          <div className='refer_page_01_sub_02_cnt'>
            <h2>
              Get <strong>₹50</strong> when your friend signs up with your link and completes their <strong>first transaction</strong>.
            </h2>
            <p><strong>Deposit minimum ₹20 to get ₹50 instantly.</strong></p>
            <p>Share your referral link with friends.</p>
            <p>They sign up using your link.</p>
            <p>
              After your friend completes their first transaction, you get <strong>₹50</strong> to <strong>staWro</strong> wallet.
            </p>
          </div>


          <div className='refer_page_01_sub_02_cnt_btn' onClick={share} >
            <span>Refer Now</span>
          </div>
        </div>

      </div>
    </>

  )
}

export default Refer










