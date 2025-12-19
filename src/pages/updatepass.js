import React,{useState} from 'react'
import { faBars, faEye, faEyeSlash, faHome, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Popup from './popup';

const Updatepass = () => {

    const [pass, setPass] = useState([]);
    const [cnf_pass, setCnf_Pass] = useState([]);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState(false);

    const user = localStorage.getItem("user");

    const PasUp = (e) =>{
      e.preventDefault();
      try{
        setAlert(false)
        axios.post(`${"https://kalanirdhari.in"}/update/password/without/token`,{pass : cnf_pass, oldpass: pass, user})
        .then(res=>{
          if(res.data.Status === "OK"){
            setData("Password Updated")
            setAlert(true)
            window.location.reload();

          }else if(res.data.Status === "NO"){
            setData("Old Password is Incorrect")
            setAlert(true)
          }else{
            setData("Something went Wrong")
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
      <center>
        
        <h1 className='updatepass-h1-01'>Password <span>Update</span></h1>

        <div className='signup-form-cnt-01'>
            <form onSubmit={PasUp}>
                <div className='signup-form-cnt-01-sub-cnt-01'>
                  <input className='signup-input-02' onChange={e=>{setPass(e.target.value)}} type={show ? "text" : "password"} placeholder='Old Password' required /> {pass.length >= 1 && <div>{show ?  <FontAwesomeIcon icon={faEyeSlash} onClick={()=>{setShow(false)}} style={{cursor : "pointer", fontSize : "20px"}} /> : <FontAwesomeIcon icon={faEye} onClick={()=>{setShow(true)}} style={{cursor : "pointer", fontSize : "20px"}} /> }</div>} <br/>
                </div>
                <br/>
                <div className='signup-form-cnt-01-sub-cnt-01'>
                  <input className='signup-input-02' onChange={e=>{setCnf_Pass(e.target.value)}} type={show ? "text" : "password"} placeholder='New Password' required /> <br/>
                </div>
                <button type='submit' className='signup-submit-btn-01'>Update</button>
            </form>
        </div>
      </center>
      {alert &&
        <Popup data={data} val={alert} />
      }
    </div>
  )
}

export default Updatepass
