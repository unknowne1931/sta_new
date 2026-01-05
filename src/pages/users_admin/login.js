import React, { useState } from 'react'
import apiAdmin from '../adminapi';
import axios from 'axios';
import Popup from '../popup';

const Login = () => {
    const [show1, setShow1] = useState(false);

    const [username, setUsername] = useState([]);
    const [pass, setPass] = useState([]);
    const [ssid, setSsid] = useState([]);
    const [otp, setOTP] = useState('')

    const [alert, setAlert] = useState(false);
    const [data, setData] = useState([]);

    const Post_Login = (e) =>{
      setAlert(false)
      try{
        e.preventDefault();
        axios.post('http://localhost/get/and/login/users/admin/pages/auth',{username, password : pass})
        .then(res =>{
          if(res.data.Status === "OK"){
            setShow1(true)
            setSsid(res.data.data)
          }else{
            setAlert(true);
            setData('Something went Wrong / username or Password Wrong')
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

    const Verify_otp = (e) =>{
      e.preventDefault()
      setAlert(false)
      try{
        apiAdmin.post('http://localhost/verify/users/language/modele/and/otp', {otp, id : ssid})
        .then(res=>{
          if(res.data.Status === "OK"){
            localStorage.setItem('admin_token' , res.data.Token)
            localStorage.setItem('ssid_admin', res.data.ssid)
            window.location.reload()
          }else{
            setData('Something went Wrong / Wrong OTP')
            setAlert(true)
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

  return (
    <div>
        <div className="Home-cnt-01-sub-01">
          <strong>
            sta<span>W</span>ro
          </strong>
          <hr />
        </div>
      <center>
        <h1 className='users_login-page-h1-01'>User-Login</h1>
        <div>
            {show1 ?
                <form onSubmit={Verify_otp}>
                    <div>
                      <h2 style={{fontFamily : "monospace"}}>Enter Correct OTP sent To your Mail</h2>
                    </div>
                    <input className='user_admin-input-field-01' type='text' autoComplete='off' onChange={e=>{setOTP(e.target.value)}}  placeholder='OTP' /><br/>
                    <button type='submit' className='user_admin-button-login'>Login</button>
                </form>
                :
                <form onSubmit={Post_Login}>
                    <input className='user_admin-input-field-01' onChange={e=>{setUsername(e.target.value)}} type='text' placeholder='username' required autoComplete='off' /><br/>
                    <input className='user_admin-input-field-01' onChange={e=>{setPass(e.target.value)}} type='password' placeholder='password' required autoComplete='off' /><br/>
                    <button className='user_admin-button-login'>Login</button>
                </form>
            }
            
        </div>
      </center>
      {alert &&
        <Popup data={data} val={alert} />
      }
    </div>
  )
}

export default Login
