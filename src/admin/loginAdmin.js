import axios from 'axios'
import React, { useState } from 'react'

const LoginAdmin = () => {
    const [username, setUsername] = useState([])
    const [pass, setPass] = useState([])

    const [otp, setOTP] = useState([])
    const [show, setShow] = useState(false);

    document.body.style.backgroundColor = "#0648b1ff";

    const SendOtp = (e) =>{
        try{
            e.preventDefault()
            axios.post(`${"http://192.168.31.133"}/login/to/admin/account`,{username})
            .then(res =>{
                if(res.data.Status === "OK"){
                    setShow(true)
                }else{
                    alert("Uername not Found")
                }
            })
            .catch(error=>{
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

    const Login = (e) =>{
        try{
            e.preventDefault()
            axios.post(`${"http://192.168.31.133"}/verify/otp/and/pass/by/admin`,{username, pass, otp})
            .then(res =>{
                if(res.data.Status === "OK"){
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("username", username);
                    window.location.reload()
                }else{
                    alert("Uername not Found")
                    setShow(false)
                }
            })
            .catch(error=>{
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
      <center>
            <div className='Home-cnt-01-sub-01'>
                <strong style={{color : "white"}}>sta<span>W</span>ro</strong>
                <hr/>
            </div>
            <h1 className='admin-signup-h1-01'>Admin Login</h1>

            <div className='admin-signup-h1-01_sun'>
                {show ?

                    <div className='loginadmin-main-cnt-01'>
                    <form onSubmit={Login}>
                        <input type='password' placeholder='Pass' onChange={e=>{setPass(e.target.value)}} autoComplete='off' required /><br/>
                        <input type='otp' placeholder='OTP' onChange={e=>{setOTP(e.target.value)}} autoComplete='none' required /><br/>
                        <button type='submit'>Login</button>
                    </form>
                    </div>

                :

                    <div className='loginadmin-main-cnt-01'>
                        <form onSubmit={SendOtp}>
                            <input type='text' placeholder='Username' onChange={e=>{setUsername(e.target.value)}} autoComplete='none' required /><br/>
                            <button type='submit'>OTP</button>
                        </form>
                    </div>

                }
            </div>

            <br/>

            <div className='only_admin'>
                <h1>Only Admin : </h1>
                <br/>
                <li>Only Admin can Access this page.</li><br/>
                <li>Don't Refresh this Page</li>
            </div>

            <br/>

            
            <br/>
            <hr  style={{width : "80%", color : "white"}}/>

            <div className='admoin'>
                <h2>Return To Home</h2>
                <button onClick={()=>{window.location.replace='/'}}>Home</button>
            </div>

            

            
      </center>
    </div>
  )
}

export default LoginAdmin
