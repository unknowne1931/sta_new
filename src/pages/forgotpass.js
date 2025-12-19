import axios from 'axios';
import React, {useState} from 'react'
import Popup from './popup';

const Forgotpass = () => {
    const [user_name, setUser_name] = useState([]);
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState(false);
    const [load, setLoad] = useState(false);

    const Req = (e) =>{
      e.preventDefault();
      try{
        setLoad(true)
        setAlert(false)
        axios.post(`${"http://localhost"}/pass/send/requests`,{data : user_name})
        .then(res=>{
          if(res.data.Status === "OK"){
            setLoad(false)
            setData("A password Re-Set link has been sent to your email.")
            setAlert(true)
          }else if(res.data.Status === "NO"){
            setLoad(false)
            setData("This username or E-Mail address was not found")
            setAlert(true)
          }else{
            setLoad(false)
            setData("Try again")
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
      {load ?
      
      <div>
        
        <center className='sign-up-load-cnt-01'>
          
          <div>
            <h1>Loading...</h1>
          </div>
        </center> 
      </div>
        :
      
      <center>
        
      <div className='signup-form-cnt-01'>
                <div className='signup-h2-main-cnt-01'>
                    <h2>Forgotpass</h2>
                </div>

                <form onSubmit={Req}>
                    <input className='signup-input-01' onChange={e=>{setUser_name(e.target.value)}} type='text' placeholder='Username / email' required /><br/>
                    <button type='submit' className='signup-submit-btn-01'>send</button>
                </form>
                <div className='signup-h2-main-cnt-02'>
                    <span className='signup-login-text-01' onClick={()=>{window.location.href = "/login"}} >Login</span>
                </div>
            </div>
      </center>}
      {alert &&
      <Popup data={data} val={alert} />
      }
      </div>
  )
}

export default Forgotpass
