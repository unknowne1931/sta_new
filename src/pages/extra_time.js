import React, { useEffect, useState } from 'react'
import api from './api'

const Extra_time = () => {

    const [data, setData] = useState([])

    useEffect(() => {
            document.body.style.backgroundColor = "#05467cff";
    
            return () => {
                document.body.style.backgroundColor = "";
            };
        }, []);

    useEffect(() => {
        get_up_sec()
    }, [])

    function get_up_sec() {
        api.get("http://192.168.31.133/get/verifyed/seonds/updates/data/and/avug/cal")
            .then(res => {
                if (res.data.data) {
                    setData(res.data.data)
                } else {
                    console.log("No data Found")
                }
            })
    }

    function Time(utcTime) {
        if (!utcTime) return "";

        return new Date(utcTime).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "medium",
        });
    }


    return (
        <div>
            <div className='Home-cnt-01-sub-01_logo'>
                <strong style={{color : "white"}} >sta<span>W</span>ro</strong>
                <hr />
            </div>
            <div className='extra_time_top_1'>
                <h1>Seconds <span>Update</span></h1>
            </div>
            <div className='extra_new_seconds_update_container'>

                {[...data].reverse().map((get, i) => {
                    return (
                        <>
                        <div className='extra_new_seconds_update_container_sub_01' >
                            <h2 className={get.down_up === "UP" ? "UP_green" : "Down_red"} style={{fontSize : "2.5rem"}} >Seconds {get.down_up === "UP" ? "UP" : "Down" } : <strong>{get.seconds}</strong> Sec</h2>
                            <span style={{fontSize : "1.8rem"}} >Category : <strong>{get.sub_lang}</strong> </span><br/>
                            <span style={{fontSize : "1.8rem"}}>Type : <strong>{get.tough}</strong> </span><br />
                            <span style={{fontSize : "1.8rem"}}>Before This : <strong>{get.bef_sec}</strong> Sec</span><br/>
                            <span style={{fontSize : "1.8rem"}} >After This : <strong>{get.af_sec}</strong> Sec </span><br/>
                            <span style={{ fontSize: "1.5rem" }}>Time : <strong>{Time(get.createdAt)}</strong></span>
                        </div>
                        <br/>
                        </>
                    )
                })}


                
            </div>
        </div>
    )
}

export default Extra_time
