import React, { useEffect, useState } from 'react'
import Naviba from './naviba'
import apiAdmin from '../pages/adminapi'
import axios from 'axios';
import Popup from '../pages/popup';

const AddBalance = () => {

    const [users_data, setUsers_Data] = useState([]);
    const [utr, setUTR] = useState([]);
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState(false);

    useEffect(()=>{
        GetUsersData()
    },[])
    
    const GetUsersData = () =>{
        try{
            apiAdmin.get(`${"http://localhost"}/get/all/users/usernames/by/id/to/update/balance`)
            .then(res=>{
                if(res.data.users){
                    setUsers_Data(res.data.users)
                }else if(res.data.Logout === "OUT"){
                    localStorage.removeItem("token")
                }
                else{
                    console.warn("Unexpected response structure:", res.data);
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

    const PostUTR = (e) =>{
        e.preventDefault();
        try{
            setAlert(false);
            const data = utr.trim()
            axios.post(`${"http://localhost"}/post/utr/ids/by/admin`,{utr : data})
            .then(res =>{
                if(res.data.Status === "OK"){
                    setData("Data Posted")
                    setAlert(true)
                }else if(res.data.Status === "BAD"){
                    setData("Data Exist")
                    setAlert(true)
                }
                else{
                    setData("Soemthing went Wrong")
                    setAlert(true)
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
        
        <br/>

        <div className='admin_addBalance-main-cnt-01'>
            <form onSubmit={PostUTR}>
                <textarea placeholder='UTR' onChange={e=>{setUTR(e.target.value)}} required > </textarea><br/>
                <button type='submit' >Post</button>
            </form>
        </div>
      </center>
      <Naviba />

      {alert &&
        <Popup data={data} val={alert} />
      }
    </div>
  )
}

export default AddBalance
