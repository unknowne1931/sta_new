import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiAdmin from '../pages/adminapi';

function Test() {
    const [timeLeft, setTimeLeft] = useState(null); // countdown state
    const [data, setData] = useState({}); // better to default to object since you expect qst, img, options

    const [show, setShow] = useState(false);

    const { id } = useParams();

    // background color effect
    useEffect(() => {
        document.body.style.backgroundColor = "#05467cff";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    // countdown effect
    useEffect(() => {
        let timer;
        if (timeLeft !== null && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleStart = () => {
        apiAdmin.get(`http://localhost/get/singel/ticket/to/test/${id}`)
            .then(res => {
                if (res.data.data) {
                    setData(res.data.data);
                    setTimeLeft(res.data.data.seconds);
                } else if (res.data.Logout === "OUT") {
                    localStorage.removeItem("token");
                    window.location.reload();
                } else {
                    console.log("No Data Found");
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const reset_seconds_and_refund = (text, t2, level, cat) => {
        apiAdmin.post("http://localhost/refund/data/and/add/to/users", { id: id, text: text, ex_seconds: t2, level, cat })
        .then(res=>{
            if(res.data.Status === "OK"){
                window.location.replace("/admin/ticket")
            }else{
                window.location.reload()
            }
        }).catch(error =>{
            console.log(error)
        })
    }

    return (
        <>
            <div className='tesst_main_01'>
                <h1>Testing</h1>
                <br />

                {timeLeft <= 0 && (
                    <div className='tesst_button_01'>
                        <button onClick={handleStart}>Start</button>
                    </div>
                )}


                {timeLeft >= 1 &&
                    <>
                        {timeLeft !== null && (
                            <h2 className='tesst_h2'>
                                Seconds : <span>{timeLeft}</span>
                            </h2>
                        )}





                        {data?.qst && (
                            <h1>
                                Question : <strong>{data.qst}</strong>
                            </h1>
                        )}

                        {data?.img && (
                            <div>
                                <img src={`data:image/png;base64,${data.img}`} alt="question" />
                            </div>
                        )}

                        {data?.options &&
                            data.options.map((dat, i) => (
                                <button className='tesst_buttonns' key={i}>{dat}</button>
                            ))}
                    </>
                }


                {data?._id && 
                <>
                <br/>
                {show ? 
                    <button className='tesst_btn_1' onClick={()=>{setShow(false)}}>Hide</button>
                    :
                    <button className='tesst_btn_2' onClick={()=>{setShow(true)}} >Show</button>
                }
                </>}


                


                {show &&

                    <>
                        {data.exp_sec === "" &&
                            <div className='tesst_refund_sub'>
                                <button onClick={() => { reset_seconds_and_refund("refund", "no", data.tough, data.cat) }} >Only Refund</button>
                            </div>
                        }

                        <br />

                        {data.exp_sec === "" &&
                            <div className='tesst_refund_sub'>
                                <button onClick={() => { reset_seconds_and_refund("non-refund", "no", data.tough, data.cat) }} >Non-Refund</button>
                            </div>
                        }

                        <br />

                        {data.exp_sec === "" &&
                            <div className='tesst_refund_sub'>
                                <button onClick={() => { reset_seconds_and_refund("refund", "1", data.tough, data.cat) }} >Refund And Reset Seconds</button>
                            </div>
                        }
                    </>

                }







            </div>
        </>
    );
}

export default Test;