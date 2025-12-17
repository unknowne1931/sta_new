import React, {useState} from 'react'
import { faBars, faEye, faEyeSlash, faHome, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Popup from './popup';
import { useLocation } from 'react-router-dom';

const Changepass = () => {

    const location = useLocation();
    const queryParm = new URLSearchParams(location.search);
    const token = queryParm.get('id');
    const id = queryParm.get('user');

    const [pass, setPass] = useState([]);
    const [cnf_pass, setCnf_Pass] = useState([]);
    const [show, setShow] = useState(false)

    const [data, setData] = useState([])
    const [alert, setAlert] = useState(false)

    const UpDate = (e) =>{
      e.preventDefault();
      try{
        setAlert(false)
        if(pass === cnf_pass){
          axios.post(`${"http://kalanirdhari.in"}/update/new/pass/by/token`, {pass, token,id})
          .then(res=>{
            if(res.data.Status === "OK"){
              setData("Password Updated")
              setAlert(true)
              window.location.href='/login'
            }else if(res.data.Status === "NO Token"){
              setData("Token not Valid")
              setAlert(true)
            }else{
              setData("Try Again")
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
        }else{
          setData("Password and Confirm Password must match")
          setAlert(true)
        }
      }catch(error){
        console.log(error)
      }
      
      
    }

  return (
    <div>
      <center>

      
      <div className='signup-form-cnt-01'>
          <div className='signup-h2-main-cnt-01'>
            <h2><span>Update</span> Password</h2>
          </div>

            <form onSubmit={UpDate}>
                <div className='signup-form-cnt-01-sub-cnt-01'>
                  <input className='signup-input-02' onChange={e=>{setPass(e.target.value)}} type={show ? "text" : "password"} placeholder='Password' required /> {pass.length >= 1 && <div>{show ?  <FontAwesomeIcon icon={faEyeSlash} onClick={()=>{setShow(false)}} style={{cursor : "pointer", fontSize : "20px"}} /> : <FontAwesomeIcon icon={faEye} onClick={()=>{setShow(true)}} style={{cursor : "pointer", fontSize : "20px" }} /> }</div>} <br/>
                </div>
                <br/>
                <div className='signup-form-cnt-01-sub-cnt-01'>
                  <input className='signup-input-02' onChange={e=>{setCnf_Pass(e.target.value)}} type={show ? "text" : "password"} placeholder='Cnf-Password' required /> <br/>
                </div>
                <button type='submit' className='signup-submit-btn-01'>create</button>
            </form>

            <div className='signup-h2-main-cnt-02'>
              <span className='signup-login-text-01' onClick={()=>{window.location.href = "/login"}} >Login</span>
            </div>
            
        </div>
      </center>
      {alert &&
        <Popup data={data} val={alert} />
      }
    </div>
  )
}

export default Changepass
