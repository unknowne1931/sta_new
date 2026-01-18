import React, { useEffect, useState, useRef } from 'react';
import Popup from './popup';
import axios from 'axios';
import api from './api';
import veri from "../image/verify.gif";
import { getFromDB, removeFromDB, saveToDB } from '../db';

const Start = () => {
  const [data, setData] = useState("");
  const [verify, setVerify] = useState(false);
  const [alert, setAlert] = useState(false);
  const [QData, setQData] = useState({});
  const [remaining, setRemaining] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const user = localStorage.getItem("user");
  const intervalRef = useRef(null);
  const latestSeconds = useRef(0);

  useEffect(() => {
    checkSavedTimerOrFetch();
  }, []);

  const checkSavedTimerOrFetch = async () => {

    setAlert(false)
    const target = await getFromDB('targetSecond');
    const savedId = await getFromDB('qno_id');

    if (target && savedId) {
      const now = Date.now();
      const timeLeft = Math.floor((target - now) / 1000);

      if (timeLeft > 0) {
        const response = await api.get(`http://localhost/get/question/no/by/user/name`);
        const data = response.data?.data;

        if (data && data._id === savedId) {
          setQData(data);
          latestSeconds.current = data.seconds;

          if (!data.img) {
            setImageLoaded(true);
            startCountdown(target);
          }else if(response.data.Status === "BAD"){
            setData(`${response.data.message} || And take screenshot to Claim Refund ${response.data.id}`)
            setAlert(true)
            setImageLoaded(false);
          } 
          else {
            // image will trigger countdown on load
          
            setImageLoaded(false);
          }
          return;
        }
      }
    }

    // fallback to new question
    GetQuestion();
  };

  const GetQuestion = async () => {
    try {
      setAlert(false)
      setImageLoaded(false);
      const response = await api.get(`http://localhost/get/question/no/by/user/name`);
      const resData = response.data;

      if (resData.data) {
        const sec = resData.data.seconds;
        latestSeconds.current = sec;
        const questionId = resData.data._id;
        const savedId = await getFromDB('qno_id');

        if (savedId !== questionId) {
          await removeFromDB('targetSecond');
        }

        await saveToDB('qno_id', questionId);
        setVerify(false);
        setQData(resData.data);

        if (!resData.data.img) {
          const target = Date.now() + sec * 1000;
          await saveToDB('targetSecond', target);
          setImageLoaded(true);
          startCountdown(target);
        }

      } else if (resData.Status === "BAD") {
        setVerify(false);
        // setData(resData.message)
        setData(`${resData.data.message} || And take screenshot to Claim Refund ${resData.data.id}.`)
        setAlert(true)
        console.error("Bad status from server.");
      } else if (resData.Logout === "OUT") {
        setVerify(false);
        localStorage.removeItem("ssid");
        window.location.reload();
      }
    } catch (error) {
      setVerify(false);
      console.error("Error fetching question:", error.message);
    }
  };

  const startCountdown = (target) => {
    clearInterval(intervalRef.current);
    updateCountdown(target);
    intervalRef.current = setInterval(() => updateCountdown(target), 1000);
  };

  const updateCountdown = async (target) => {
    const now = Date.now();
    const secondsLeft = Math.max(0, Math.floor((target - now) / 1000));
    setRemaining(secondsLeft);

    if (secondsLeft <= 0) {
      clearInterval(intervalRef.current);
      await removeFromDB('targetSecond');
      await removeFromDB('start_time_out');
      console.log("Time Out");
      await saveToDB( "start_time_out" ,{
        qno_id: QData._id,
        seconds: QData.seconds,
        Qst : QData.Question,
        options : QData.options,
        img : QData.img,
        Ans : QData.Ans,
        cat : QData.cat,
        tough : QData.tough,
        vr : "false",
        usa : '',
      });
      window.location.replace('/play?id=timeout');
      // window.location.href = `/play?id=${QData._id}&sec=${QData.seconds}`;
    }
  };

  const QuitGame = async (e) => {
    e.preventDefault();
    clearInterval(intervalRef.current);
    await removeFromDB('targetSecond');
    setAlert(false);
    try {
      const response = await api.delete(`http://localhost/delete/by/user/id/for/valid/data`);
      const resData = response.data;
      if (resData.Status === "OK") {
        setData("You are quitting the game.");
        setAlert(true);
        window.location.replace('/');
        // window.location.href = '/';
      } else {
        setData("Something went wrong.");
        setAlert(true);
        window.location.replace('/');
        // window.location.href = '/';
      }
    } catch (error) {
      console.error("Error quitting game:", error.message);
    }
  };

  const VerifyAnswer = async (answer) => {
    clearInterval(intervalRef.current);
    setVerify(true);
    setAlert(false);
    await removeFromDB('targetSecond');
    try {
      const response = await api.post(`http://localhost/verify/answer/question/number`, {
        answer,
        id: QData._id,
        seconds : parseInt(QData.seconds)- parseInt(remaining),
        Ans : QData.Ans
      });
      const resData = response.data;

      if (resData.Status === "OK") {
        await removeFromDB('targetSecond');
        GetQuestion();
      } else if (resData.Status === "OKK") {
        const { id } = resData;
        setVerify(false);
        window.location.replace(`/claim/cupon?id=${id}`);
        // window.location.href = `/claim/cupon?id=${id}`;
      } else if (resData.Status === "STARS") {
        setVerify(false);
        setData(`You won the game, and you got ${resData.stars} stars`);
        setAlert(true);
        window.location.replace('/cart');
      } else {
        await removeFromDB('start_game_out');
        setData("Wrong Answer");
        setAlert(true);
        setVerify(false);
        await saveToDB( "start_game_out" ,{
        qno_id: QData._id,
        seconds: QData.seconds,
        Qst : QData.Question,
        options : QData.options,
        img : QData.img,
        Ans : QData.Ans,
        cat : QData.cat,
        tough : QData.tough,
        vr : "true",
        usa : answer,
      });

      window.location.replace('/play?id=wronganswer');

        // window.location.replace(`/play?id=${QData._id}&sec=${QData.seconds}&qst=${QData.Question}&a=${QData.a}&b=${QData.b}&c=${QData.c}&d=${QData.d}&img=${QData.img}&ans=${QData.Ans}&usa=${answer}&vr=true&cat=${QData.cat}&tough=${QData.tough}`);

        // window.location.replace('/play');
      }
    } catch (error) {
      setVerify(false);
      console.error("Error verifying answer:", error.message);
    }
  };


  return (
    <div>
      <center>
        <div className="Home-cnt-01-sub-01">
          <strong>sta<span>W</span>ro</strong>
          <hr />
        </div>

        {remaining > 0 && (
          <div style={{ fontSize: '20px', color: remaining <= 5 ? 'red' : 'black' }}>
            ⏳ Time Left: {remaining}s
          </div>
        )}

        {QData?.cat &&
          <h2>Cat : {QData.cat}</h2>
        }

        <br />
        {QData.Question && (
          <div className="game_start-main-cnt-01">
            <div className="game_start-main-cnt-01-span-01">
              {QData.Question}.
            </div>
            <br />
            {QData.img && (
              <div className="game_start-main-cnt-01-img-cnt-01">
                <img
                  src={`data:image/png;base64,${QData.img}`}
                  alt="Question related"
                  onLoad={async () => {
                    const existingTarget = await getFromDB('targetSecond');
                    if (!existingTarget) {
                      const target = Date.now() + latestSeconds.current * 1000;
                      await saveToDB('targetSecond', target);
                      startCountdown(target);
                    } else {
                      startCountdown(existingTarget);
                    }
                    setImageLoaded(true);
                  }}
                  
                  onError={async () => {
                    const target = Date.now() + latestSeconds.current * 1000;
                    await saveToDB('targetSecond', target);
                    setImageLoaded(true);
                    startCountdown(target);
                  }}
                />
              </div>
            )}
            <br/>
            {remaining > 0 && (
              <div className='sec_nds' style={{ fontSize: '20px', color: remaining <= 5 ? 'red' : 'black' }}>
                {remaining}s
              </div>
            )}
            <br />

            <div className='game_opt_cntr-01'>
              {imageLoaded && (
                <>
                  {QData.options && QData.options.map((option, index) => (  
                    <div key={index} className="game_start-main-cnt-01-sub-cnt-01">
                      <button onClick={() => VerifyAnswer(option)}>{option}</button>
                    </div>
                  ))}
                </>
              )}
            </div>

            
            {/* <div className="game_start-main-cnt-01-sub-cnt-01">
              <button onClick={() => VerifyAnswer(QData.a)}>{QData.a}</button>
              <button onClick={() => VerifyAnswer(QData.b)}>{QData.b}</button>
            </div>
            <div className="game_start-main-cnt-01-sub-cnt-01">
              <button onClick={() => VerifyAnswer(QData.c)}>{QData.c}</button>
              <button onClick={() => VerifyAnswer(QData.d)}>{QData.d}</button>
            </div> */}
            
          </div>
        )}
      </center>

      {verify && (
        <div className="verify_pop_up-cnt-01">
          <img src={veri} alt="Verifying..." />
        </div>
      )}

      {alert && <Popup data={data} val={alert} />}
      <div style={{ height: "50px" }}></div>
    </div>
  );
};

export default Start;
