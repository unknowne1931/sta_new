import {
  faArrowUpAZ,
  faBank,
  faPlusCircle,
  faArrowDownUpAcrossLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import api from "../pages/api";
import Loading from "../loading";
import { getFromDB, saveToDB } from "../db"; // assuming you have IndexedDB helper functions
import Popup from "./popup";

const Account = () => {
  const [balance, setBalance] = useState([]);
  const [btn1, setBtn1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false)
  const [data, setData] = useState([]);

  const user = localStorage.getItem("user");

  useEffect(() => {
    getCachedBalance();
  }, []);

  const getCachedBalance = async () => {
    const cached = await getFromDB(`balance_${user}`);
    if (cached && !isExpired(cached.timestamp)) {
      setBalance(cached.data);
      setBtn1(true);
      setLoading(false);
      console.log("Loaded from IndexedDB");
    } else {
      GetBalance();
    }
  };

  const isExpired = (timestamp) => {
    const now = Date.now();
    const oneMinute = 1000 * 60 * 5;
    return now - timestamp > oneMinute;
  };

  const New = async () => {
    try {
      setAlert(false);

      const valid_to_claim = (await getFromDB("new")) || "";
      const refer_ui = (await getFromDB("refer_ui")) || "";

      const res = await api.post("https://kalanirdhari.in/get/balance/new/data", {
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

  const GetBalance = async () => {
    try {
      setTimeout(async () => {
        const res = await api.get(`https://kalanirdhari.in/get/acount/balence`);
        if (res.data.data) {
          setBtn1(true);
          setBalance(res.data.data);
          setLoading(false);
          saveToDB(`balance_${user}`, {
            data: res.data.data,
            timestamp: Date.now(),
          });
        } else if (res.data.Status === "NO") {
          setBtn1(false);
          setLoading(false);
        } else if (res.data.Logout === "OUT") {
          localStorage.removeItem("ssid");
          window.location.reload();
        } else {
          setLoading(false);
          console.warn("Unexpected response structure:", res.data);
        }
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    setAlert(false)
    const res = await loadRazorpayScript();
    if (!res) {
      setData("Failed to load Razorpay SDK");
      setAlert(true)
      return;
    }

    // 🟡 Step 1: Create Order from backend
    const orderData = await fetch("https://kalanirdhari.in/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 100, user }), // 💸 amount in rupees, not paise
    }).then((res) => res.json());

    const options = {
      key: "rzp_live_V4tRMNPowzPDU5", // 🔑 from Razorpay dashboard
      amount: orderData.amount,
      currency: "INR",
      name: "staWro",
      description: "staWro",
      order_id: orderData.id, // Razorpay order ID from backend
      handler: function (response) {
        GetBalance()
        // 🟢 No need to verify manually if webhook is set
        setData("Payment successful!");
        setAlert(true)
        console.log("Razorpay Response:", response);
      },
      prefill: {
        name: user,
      },
      notes: {
        user: user, // 🧠 Important: Sent to webhook!
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };





  return (
    <div>
      {loading ? <Loading /> : (
        <center>
          <div className="Home-cnt-01-sub-01">
            <strong>
              sta<span>W</span>ro
            </strong>
            <hr />
          </div>
          <div className="account-main-cnt-01">
            <span className="account-main-cnt-01-span-01" onClick={New}>Wallet</span>
            <div className="account-main-cnt-01-sub-01">
              {!btn1 && <button className="get_bln" onClick={() => { window.location.href = '/play' }}>Get Free ₹05.00</button>}
              {btn1 && balance.balance && (
                <span className="account-main-cnt-01-sub-01-sub-span-01">
                  Account Balance ₹<span>{balance.balance}.00</span>
                </span>
              )}
              <h2>
                {/* add navi */}
                <button className="wal_add_more" onClick={initiatePayment} >
                  Add More
                </button>

              </h2>
            </div>
          </div>
          <br />
          <div className="account-main-cnt-02">
            <div className="account-main-cnt-02-sub-cnt-01" onClick={() => window.location.href = "/account/upi"}>
              <span><FontAwesomeIcon icon={faBank} className="account-main-cnt-02-sub-cnt-01-sub-icon-01" /></span>
              <br /><br />
              <span className="account-main-cnt-02-sub-cnt-01-span-01">AC/UPI</span>
            </div>
            <div className="account-main-cnt-02-sub-cnt-01" onClick={() => window.location.href = "/account/history"}>
              <span><FontAwesomeIcon icon={faArrowUpAZ} className="account-main-cnt-02-sub-cnt-01-sub-icon-01" /></span>
              <br /><br />
              <span className="account-main-cnt-02-sub-cnt-01-span-01">History</span>
            </div>
            <div className="account-main-cnt-02-sub-cnt-01" onClick={() => window.location.href = "/account/pending"}>
              <span><FontAwesomeIcon icon={faArrowDownUpAcrossLine} className="account-main-cnt-02-sub-cnt-01-sub-icon-01" /></span>
              <br /><br />
              <span className="account-main-cnt-02-sub-cnt-01-span-01">Pending</span>
            </div>
          </div>
        </center>
      )}

      {alert &&
        <Popup data={data} val={alert} />
      }



    </div>
  );
};

export default Account;