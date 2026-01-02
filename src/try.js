import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getFromDB, saveToDB } from './db';
import img from './image/to.gif'; // Adjust the path as necessary
import img2 from './image/insta_1.png'; // Adjust the path as necessary
import img3 from "./image/wr.gif"
import img4 from "./image/vi.gif"
import ScratchCard from './scratch';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Loading from './loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

const Try = () => {
    const [data, setData] = useState('');
    const [show, setShow] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [rupee, setRupee] = useState('')
    const [deviceId, setDeviceId] = useState('');
    const [load, setLoad] = useState(true)

    const timerRef = useRef(null);
    const uniqueKey = `targetSecond-${data?._id || 'default'}`;

    useEffect(() => {
        const initFingerprint = async () => {
            const id = await getFromDB("di");
            if (!id) {
                const fp = await FingerprintJS.load();
                const result = await fp.get();
                setDeviceId(result.visitorId);
                await saveToDB("di", result.visitorId);
                console.log("Device ID saved:", result.visitorId);
            } else {
                setDeviceId(id);
                console.log("Device ID loaded from DB:", id);
            }
        };
        initFingerprint();
    }, []);

    useEffect(() => {
        get_Data();
    }, []);

    useEffect(() => {
        if (imageLoaded && data?.seconds && !timerStarted) {
            resumeCountdown();
        }
    }, [imageLoaded, data]);

    useEffect(() => {
        return () => {
            pauseCountdown(); // cleanup
        };
    }, []);

    const get_Data = async () => {
        setLoad(true)
        const ip = await getFromDB('di');
        fetch(`https://kalanirdhari.in/get/singel/qst/${ip}`)
            .then(res => res.json())
            .then((res) => {
                console.log("Data fetched:", res.data);
                console.log(res.data)
                if (res.Status === "OK") {
                    setData(res.data);
                    setShow("!");
                    setLoad(false)
                } else if(res.Status === "Yes") {
                    setShow("Yes")
                    setRupee(res.rupee)
                    setLoad(false)
                }
                else if (res.Status === "Time_Out") {
                    setShow("Time_Out");
                    setLoad(false)
                } else if (res.Status === "NO") {
                    setShow("No");
                    setLoad(false)
                }
                else {
                    setShow("Default");
                }
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setShow("Default")
                setLoad(false)
            });
    };

    const pauseCountdown = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            console.log("⏸ Countdown paused");
        }
    };


    const resumeCountdown = async () => {
        pauseCountdown(); // Clear existing timer
        const ip = await getFromDB('di');

        const existingTarget = await getFromDB(uniqueKey);
        const now = Date.now();
        const seconds = parseInt(data.seconds);
        let targetTime;

        if (existingTarget) {
            const storedTime = parseInt(existingTarget);
            if (now >= storedTime) {
                targetTime = now + seconds * 1000;
                await saveToDB(uniqueKey, targetTime);
            } else {
                targetTime = storedTime;
            }
        } else {
            targetTime = now + seconds * 1000;
            await saveToDB(uniqueKey, targetTime);
        }

        const updateSeconds = () => {
            const remaining = Math.ceil((targetTime - Date.now()) / 1000);
            if (remaining > 0) {
                setSecondsLeft(remaining);
            } else {
                setSecondsLeft(0);
                pauseCountdown();

                if (!submitted) {
                    axios.post("https://kalanirdhari.in/time/out/by/singel/qst/data", {
                        ip
                    }).then(res => {
                        setShow("Time_Out");
                    }).catch(err => {
                        console.error("Error posting timeout:", err);
                    });
                }
            }
        };

        updateSeconds();
        timerRef.current = setInterval(updateSeconds, 1000);
        setTimerStarted(true);
    };

    const handleOptionClick = async (option) => {
        setLoad(true)
        const ip = await getFromDB('di');
        if (submitted) return;
        setSubmitted(true);
        pauseCountdown();
        console.log(`Submitted answer: ${option}`);

        // ✅ Optional: Send answer to backend
        axios.post("https://kalanirdhari.in/get/singel/qst/ans", {
            ip,
            qno: data.qno,
            ans: option
        }).then(res => {
            if (res.data.Status === "CORRECT") {
                setRupee(res.data.rupee)
                setShow("Yes")
                setLoad(false)
            } else if (res.data.Status === "CORRECT NO REWARD") {
                setLoad(false)
                alert("Correct But You cant claim Rewards, Offer Ended")
                window.location.href = '/'
            } else if (res.data.Status === "EX CORRECT") {
                setLoad(false)
                alert("You Have Answerd Before this")
                window.location.href = '/'
            } else if (res.data.Status === "INCORRECT") {
                setShow("No")
                setLoad(false)
            } else {
                setLoad(false)
                alert(`Something went Wrong : ${res.data.Status}`)
            }
        }).catch(err => {
            setLoad(false)
            console.error("Error posting answer:", err);
        });
    };


    const styles = {
        page: {
            margin: 0,
            background: "#f2f2f2",
            fontFamily: "Arial, sans-serif",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        },
        container: {
            position: "relative",
            width: "300px",
            height: "200px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            overflow: "hidden",
            background: "white",
        },
        message: {
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #FFD700, #FF8C00)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
            zIndex: 0,
        },
        canvas: {
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            cursor: "crosshair",
        },
    };

    const share = () => {
    const shareUrl = `https://stawro.com/start/try`;
    const title = "Answer 1 Question & Win Up To ₹ 100.00";
    const message = `${title} ${shareUrl}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };


    return (
        <>
            
             <>
                {show === "!" && (
                <div>

                    {data.Questio && 
                        <>
                            <div className='try_main_cnt_01'>
                            <div className='try_main_cnt_01_left'>
                                <h1>
                                    Seconds Left:
                                    <span className='try_main_cnt_01_left_time1'>
                                        {secondsLeft !== null ? secondsLeft : 'Loading...'}
                                    </span>
                                </h1>
                            </div>
                        </div>

                        <br />

                        <div className='try_main_cnt_02'>
                            <h1>{data.Questio}</h1>
                        </div>

                        <div className='try_main_cnt_03'>
                            <img
                                src={data.img}
                                onLoad={() => {
                                    console.log("Image Loaded");
                                    setImageLoaded(true);
                                }}
                                alt='icon'
                                className='try_main_cnt_03_img'
                            />
                        </div>

                        <br />

                        <div className='try_main_cnt_04'>
                            <button className='try_main_cnt_04_btn' onClick={() => handleOptionClick("a")}>{data.a}</button>
                            <button className='try_main_cnt_04_btn' onClick={() => handleOptionClick("b")}>{data.b}</button>
                            <button className='try_main_cnt_04_btn' onClick={() => handleOptionClick("c")}>{data.c}</button>
                            <button className='try_main_cnt_04_btn' onClick={() => handleOptionClick("d")}>{data.d}</button>
                        </div>

                        <br />
                        </>
                    }
                    


                </div>
            )}

            {show === "Yes" && (
                <div className='try_yes_main_01'>

                    <div className='Home-cnt-01-sub-01'>
                        <strong>sta<span>W</span>ro</strong>
                        <hr />
                    </div>

                    <h1>Woohoo! <span>Victory</span> is <strong>Yours</strong>!</h1>
                    <ScratchCard rupee={rupee} />
                    {/* <div className='try_yes_main_01_sub_01'>
                        <img src={img4} />
                    </div> */}
                    <br/>
                    

                    <div className='try_main_cnt_06'>
                        <h1 style={{color : "white"}} >Play more Like this</h1>

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
                </div>
            )}

            {show === "No" && (
                <div>
                    <div className='Home-cnt-01-sub-01'>
                        <strong>sta<span>W</span>ro</strong>
                        <hr />
                    </div>


                    <h1 className='time_out_main_h1_01'>Wrong Answer</h1>

                    <span className='time_out_main_span_01'>Coming up next... Stay tuned!</span>

                    <div className='try_main_cnt_05' style={{ border: "none" }} >
                        <img src={img3} alt='Timeout' className='try_main_cnt_03_img' />
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


                </div>
            )}

            {show === "Time_Out" && (
                <div>
                    <div className='Home-cnt-01-sub-01'>
                        <strong>sta<span>W</span>ro</strong>
                        <hr />
                    </div>


                    <h1 className='time_out_main_h1_01'>Time Out</h1>

                    <span className='time_out_main_span_01'>Coming up next... Stay tuned!</span>

                    <div className='try_main_cnt_05'>
                        <img src={img} alt='Timeout' className='try_main_cnt_03_img' />
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


                </div>
            )}

            {show === "Default" &&
            
                <>
                    <div className='Home-cnt-01-sub-01'>
                        <strong>sta<span>W</span>ro</strong>
                        <hr />
                    </div>
                    <br/>

                    <div className='refresh_btn_01' onClick={()=>{window.location.reload()}}>
                        <h1>Click to refresh or just reload the page</h1>
                        <div>
                            
                        </div>
                    </div>
                    <br/>

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
                </>
            }

            <br />
             </>
             

        </>
    );
};

export default Try;
