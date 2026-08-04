import React, { useEffect, useState, useRef } from "react";
import Popup from "./popup";
import api from "./api";
import veri from "../image/verify.gif";
import { getFromDB, removeFromDB, saveToDB } from "../db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faGift, faRss, faRupee, faTimes } from "@fortawesome/free-solid-svg-icons";

const Start = () => {
  const [data, setData] = useState("");
  const [verify, setVerify] = useState(false);
  const [alert, setAlert] = useState(false);
  const [QData, setQData] = useState(null);
  const [remaining, setRemaining] = useState(0);

  const intervalRef = useRef(null);
  const latestSeconds = useRef(0);

  useEffect(() => {
    init();
    return () => clearInterval(intervalRef.current);
  }, []);

  /* -------------------- INIT -------------------- */

  const init = async () => {
    setAlert(false);

    const target = await getFromDB("targetSecond");
    const savedId = await getFromDB("qno_id");

    if (target && savedId) {
      const now = Date.now();
      const left = Math.floor((target - now) / 1000);

      if (left > 0) {
        const res = await api.get("http://192.168.31.133/get/question/no/by/user/name/bf/all/xx");
        if(res.data?.Status === "EXIT"){
          window.location.replace("/play")
        }
        const q = res.data?.data;

        if (q && q._id === savedId) {
          setQData(q);
          latestSeconds.current = q.seconds;
          startCountdown(target);
          return;
        }
      }
    }

    GetQuestion();
  };

  /* -------------------- FETCH QUESTION -------------------- */

  const GetQuestion = async () => {
    try {
      setAlert(false);
      setVerify(false);

      const res = await api.get("http://192.168.31.133/get/question/no/by/user/name/bf/all/xx");
      const q = res.data?.data;

      if(res.data?.Status === "EXIT"){
          window.location.replace("/play")
        }

      if (!q) {
        if (res.data?.Status === "BAD") {
          alert(res.data.message)
          setData(`${res.data.message} || Screenshot to claim refund ${res.data.id}`);
          setAlert(true);
        }
        return;
      }

      latestSeconds.current = q.seconds;
      setQData(q);

      await saveToDB("qno_id", q._id);

      const target = Date.now() + q.seconds * 1000;
      await saveToDB("targetSecond", target);
      startCountdown(target);

    } catch (err) {
      alert("Fetch error:", err.message)
      console.error("Fetch error:", err.message);
    }
  };

  /* -------------------- TIMER -------------------- */

  const startCountdown = (target) => {
    clearInterval(intervalRef.current);
    tick(target);
    intervalRef.current = setInterval(() => tick(target), 1000);
  };

  const tick = async (target) => {
    const now = Date.now();
    const left = Math.max(0, Math.floor((target - now) / 1000));
    setRemaining(left);

    if (left <= 0) {
      clearInterval(intervalRef.current);
      await removeFromDB("targetSecond");

      await saveToDB("start_time_out", {
        qno_id: QData?._id,
        seconds: QData?.seconds,
        Qst: QData?.Question,
        options: QData?.options,
        img: QData?.img,
        Ans: QData?.Ans,
        cat: QData?.cat,
        tough: QData?.tough,
        vr: "false",
        usa: "",
      });

      window.location.replace("/play?id=timeout");
    }
  };

  /* -------------------- VERIFY -------------------- */


  const VerifyAnswer = async (answer) => {
    clearInterval(intervalRef.current);
    setVerify(true);
    setAlert(false);
    await removeFromDB("targetSecond");

    try {
      api.post("http://192.168.31.133/verify/answer/question/number/all/xs", {
        answer,
        id: QData._id,
        Ans: QData.Ans,
        sec : remaining
        // sec: parseInt(QData.seconds) - parseInt(remaining),
      })
      .then(async (res)=>{
        if(res.data.Status === "OK"){
          setVerify(false);
          GetQuestion();
        }else if(res.data.Status === "OKK"){
          window.location.replace(`/claim/cupon?id=${res.data.id}`);
        }else if(res.data.Status === "STARS"){
          setData(`You won ${res.data.stars} stars`);
          setAlert(true);
          window.location.replace("/cart");
        }else if(res.data.Status === "Cheated"){
          window.location.replace("/play")
        }
        else if(res.data.Status === "BAD"){
          await saveToDB("start_game_out", {
          qno_id: QData._id,
          seconds: QData.seconds,
          Qst: QData.Question,
          options: QData.options,
          img: QData.img,
          Ans: QData.Ans,
          cat: QData.cat,
          tough: QData.tough,
          vr: "true",
          usa: answer,
        });

        setVerify(false);
        window.location.replace("/play?id=wronganswer");
        }
      })

    } catch (err) {
      alert(err, err.message)
      setVerify(false);
      console.error("Verify error:", err.message);
    }
  }



  const VerifyAnswe = async (answer) => {
    clearInterval(intervalRef.current);
    setVerify(true);
    setAlert(false);
    await removeFromDB("targetSecond");

    try {
      const res = await api.post(
        "http://192.168.31.133/verify/answer/question/number",
        
        {
          answer,
          id: QData._id,
          seconds: QData.seconds - remaining,
          Ans: QData.Ans,
        }
      );

      const r = res.data;

      if (r.Status === "OK") {
        setVerify(false);
        GetQuestion();
        return;
      }

      if (r.Status === "OKK") {
        window.location.replace(`/claim/cupon?id=${r.id}`);
        return;
      }

      if (r.Status === "STARS") {
        setData(`You won ${r.stars} stars`);
        setAlert(true);
        window.location.replace("/cart");
        return;
      }

      // WRONG ANSWER
      await saveToDB("start_game_out", {
        qno_id: QData._id,
        seconds: QData.seconds,
        Qst: QData.Question,
        options: QData.options,
        img: QData.img,
        Ans: QData.Ans,
        cat: QData.cat,
        tough: QData.tough,
        vr: "true",
        usa: answer,
      });

      setVerify(false);
      window.location.replace("/play?id=wronganswer");

    } catch (err) {
      alert(err, err.message)
      setVerify(false);
      console.error("Verify error:", err.message);
    }
  };

  /* -------------------- HELPERS -------------------- */

  const hasValidImage =
    typeof QData?.img === "string" && QData.img.length > 100;

  /* -------------------- UI -------------------- */

  return (
    <div>
      <center>
        <div className="Home-cnt-01-sub-01">
          <strong>sta<span>W</span>ro</strong>
          <hr />
        </div>


        {remaining > 0 
          &&

          <>
            <div className="start_new_oppp_c1">

            <div
              className="start_new_oppp_c1_sub_01"
              style={{ backgroundColor: remaining <= 3 ? "red" : "blue" }}
            >
                <div>
                  <FontAwesomeIcon icon={faClock} style={{fontSize : "3.5rem"}} />
                </div>
                <div style={{fontSize : "4rem"}}>
                  {remaining}
                </div>

              </div>

              <div className="start_new_oppp_c1_sub_01" style={{backgroundColor : "green"}}>
                <div>
                  <FontAwesomeIcon icon={faGift} style={{fontSize : "3.5rem"}} />
                </div>
                <div>
                  {remaining <= 10 &&
                    <>
                    {remaining * 10}.00 ₹
                    </>
                  }

                  {remaining > 10 &&
                    <>
                    00.00 ₹
                    </>
                  }
                  
                </div>

              </div>

            </div>
          </>
        }




        {/* {QData?.cat && <h2>Question Number : {QData.Qno}</h2>} */}

        {QData?.Question && (
          <div className="game_start-main-cnt-01">
            <div className="game_start-main-cnt-01-span-01">
              {QData.Question}
            </div>

            {hasValidImage && (
              <div className="game_start-main-cnt-01-img-cnt-01">
                <img
                  src={`data:image/png;base64,${QData.img}`}
                  alt="Question"
                />
              </div>
            )}


            {remaining <=10 && 

            <div className="game_opt_cntr-01">
              {QData.options?.map((opt, i) => (
                <div key={i} className="game_start-main-cnt-01-sub-cnt-01">
                  <button onClick={() => VerifyAnswer(opt)}>
                    {opt}
                  </button>
                </div>
              ))}
            </div>}


            {remaining > 10 && 
              <>
                <div style={{marginTop : "30px"}}>
                  
                  <h1>Options will display after 11 seconds</h1>
                </div>
              </>
              
            }



          </div>
        )}
      </center>

      {verify && (
        <div className="verify_pop_up-cnt-01">
          <img src={veri} alt="Verifying" />
        </div>
      )}

      {alert && <Popup data={data} val={alert} />}
      <div style={{ height: 50 }} />
    </div>
  );
};

export default Start;
