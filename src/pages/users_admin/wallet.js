import React, { useEffect, useState } from 'react'
import api_user_admin from '../user_admin';
import Navibar_user from './navibar_user';
import Loading from '../../loading';

const Wallet = () => {

    const user = localStorage.getItem('ssid_admin');
    const [data, setData] = useState([]);
    const [all_data, setAll_Data] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(()=>{
        
        get_qno_len();
        Get_All_Data();

    },[])

    

    const get_qno_len = () =>{
        try{
            api_user_admin.get(`http://localhost/get/admin/sub/users/posted/datas/011/${user}`)
            .then(res=>{
                if(res.data.data){
                    setData(res.data.data)
                }else if(res.data.Status === 505){
                    localStorage.removeItem("ssid_admin")
                    localStorage.removeItem("admin_token")
                    window.location.href='/admin/user/login'
                }else{
                    console.warn("Unexpected response structure:", res.data);
                }
            }).catch(error=>{
                if (error.response) {
                    console.error("API Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("No response from server. Please check your connection.");
                } else {
                    console.error("Error occurred:", error.message);
                }
            })
        }catch(error){
            console.log(error)
        }
        
    }

    const Get_All_Data = () =>{
        try{
            api_user_admin.get(`http://localhost/get/wallet/amount/credits/links/by/${user}`)
            .then(res=>{
                if(res.data.Datas){
                    setAll_Data(res.data.Datas)
                    setLoad(false)
                }else if(res.data.Status === 505){
                    localStorage.removeItem("ssid_admin")
                    localStorage.removeItem("admin_token")
                    window.location.href='/admin/user/login'
                }else{
                    setLoad(false)
                    console.warn("Unexpected response structure:", res.data);
                }
            }).catch(error=>{
                setLoad(false)
                if (error.response) {
                    console.error("API Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("No response from server. Please check your connection.");
                } else {
                    console.error("Error occurred:", error.message);
                }
            })
        }catch(error){
            setLoad(false)
            console.log(error)
        }
    }

  return (
    <div>
        {load ? <Loading /> :
        <center>
            <div className="Home-cnt-01-sub-01">
                <strong>
                    sta<span>W</span>ro
                </strong>
                <hr />
            </div>

            <h1 className='main-h1-01'>Wallet</h1><br/>

            <div className='users_admin_page-main-cnt-01'>
                <h1>Earned : <strong>₹ {all_data.Rupee}.00</strong></h1>
                <h2>Selected Questions : <strong>{all_data.Total_Quest}</strong></h2>
                <h2>Total Questions : <strong>{data.length}</strong></h2>
            </div>
            <br/>

            <div style={{height: "50px"}}></div>

            <div className='users_admin_page-main-cnt-02'>
                <h2>Outs : <span>{all_data.Out}</span> </h2>
                <h2>Answerd : <span>{all_data.Ans}</span> </h2>
            </div>
        </center>}
        <Navibar_user />   
    </div>
  )
}

export default Wallet
