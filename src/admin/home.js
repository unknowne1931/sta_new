import React, { useEffect, useState } from 'react'
import Naviba from './naviba'
import apiAdmin from '../pages/adminapi'
import Popup from '../pages/popup';
import Loading from '../loading';

const AdminHome = () => {

    const [live, setLive] = useState([]);
    const [win_data, setWin_data] = useState([]);
    const [total_list, setTotal_List] = useState([]);
    const [pass, setPass] = useState([])

    const [alert, setAlert] = useState(false)
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [load, setLoad] = useState(true);

    document.body.style.backgroundColor = "#0648b1ff";

    useEffect(()=>{

        GetTotalWinners();
        GetTotal()
        GetLive()
    },[])

    useEffect(()=>{
        const interval = setInterval(() => {
            GetTotal()
            GetTotalWinners()
            GetLive()
          }, 2000);
      
          // Cleanup function to clear interval when component unmounts
          return () => clearInterval(interval);
    },[])

    const ShowChartSet = (e) =>{
        setAlert(false);
        e.preventDefault()
        if(pass === "193148"){
            setShow(true);
        }else{
            setData("Password Wrong");
            setAlert(true)
        }
    }


    const GetTotal = () =>{
        try{
            apiAdmin.get(`${"https://kalanirdhari.in"}/get/aal/tottttal/users`)
            .then(res =>{
                if(res.data.users){
                    setTotal_List(res.data.users)
                }else if(res.data.Logout === "OUT"){
                    localStorage.removeItem("token")
                }
                else{
                    console.log("Unexpected Error", res.data)
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

    const GetTotalWinners = () =>{
        try{
            apiAdmin.get(`${"https://kalanirdhari.in"}/get/total/users/by/winners/datas/all`)
            .then(res =>{
                if(res.data.users){
                    setWin_data(res.data.users)
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

    const GetLive = () =>{
        try{
            setTimeout(()=>{
                apiAdmin.get(`${"https://kalanirdhari.in"}/admin/get/all/users/data/logined`)
                .then(res =>{
                    if(res.data.users){
                        setLive(res.data.users);
                        setLoad(false);
                    }else if(res.data.Logout === "OUT"){
                        setLoad(false);
                        localStorage.removeItem("token")
                    }
                    else{
                        setLoad(false);
                        console.warn("Unexpected response structure:", res.data);
                    }
                })
                .catch(error=>{
                    setLoad(false);
                    if (error.response) {
                        console.error("API Error:", error.response.status, error.response.data);
                    } else if (error.request) {
                        console.error("No response from server. Please check your connection.");
                    } else {
                        console.error("Error occurred:", error.message);
                    }
                })
            },1000)
            
        }catch(error){
            setLoad(false);
            console.log(error)
        }
        
    }

    const PostLineData = (e) =>{
        try{
            e.preventDefault()
            setAlert(false);
            apiAdmin.post(`${"https://kalanirdhari.in"}/length/and/calcul/ation/of/chart`)
            .then(res =>{
                if(res.data.Status === "OK"){
                    setData("Data Saved")
                    setAlert(true)
                }else if(res.data.Status === "OK"){
                    setData("The Todays data existed Before")
                    setAlert(true)
                }else{
                    setData("Something went wrong")
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
        {load ? <Loading /> :
      <center>
        
        <br/>
        <h1 className='admin-home-h1-01'>Admin Home</h1>

        <div className='admin-home-main-cnt-01'>


            {/* Live Players Container */}
            <div className='admin-home-main-cnt-01-sub-cnt-01'>
                <span className='admin-home-main-cnt-01-sub-cnt-01-span-01'>Live Players : {live.length}</span><br/>
                <div className='admin-home-main-cnt-01-sub-cnt-01-sunb-cnt-01'>

                    {live.map((user, i) =>{
                        return(
                            <div key={i} className='admin-home-main-cnt-01-sub-cnt-01-sunb-cnt-01-sub-cnt-01'>
                                <span>Username : <strong>{user.username}</strong> </span><br/>
                                <span>Time : <strong>{user.time}</strong></span><br/>
                                <span></span><br/>
                            </div>        
                        )
                    })}

                </div>

            </div>



            {/* Won Players Container */}
            <div className='admin-home-main-cnt-01-sub-cnt-01'>
                <span className='admin-home-main-cnt-01-sub-cnt-01-span-01'>Won Players : {win_data.length}</span><br/>
                
                <div className='admin-home-main-cnt-01-sub-cnt-01-sunb-cnt-01'>
                    {win_data.map((user, i)=>{
                        return(
                            <div className='admin-home-main-cnt-01-sub-cnt-01-sunb-cnt-01-sub-cnt-01'>
                                <span>User : <strong>{user.user}</strong> </span><br/>
                                <span>Rank : <strong>{user.no}</strong> </span><br/>
                            </div>
                        )
                    })}
                </div>

            </div>



            {/* Total Players Container */}
            <div className='admin-home-main-cnt-01-sub-cnt-01'>
                <span className='admin-home-main-cnt-01-sub-cnt-01-span-01'>Total Players : {total_list.length}</span><br/>
                
                <div className='admin-home-main-cnt-01-sub-cnt-01-sunb-cnt-01'>
                    {total_list.map((user, i)=>{
                        return(
                            <div className='admin-home-main-cnt-01-sub-cnt-01-sunb-cnt-01-sub-cnt-01'>
                                <span>User : <strong>{user.user}</strong> </span><br/>
                            </div>
                        )
                    })}
                </div>

            </div>



        </div>

        {show ?
            <div className='Admin_Home_show-main-cnt-02'>
                <button onClick={PostLineData}>save data</button>
            </div>
        :
            <div className='Admin_Home_show-main-cnt-01'>
                <form onSubmit={ShowChartSet}>
                    <input type='password' onChange={e=>{setPass(e.target.value)}} placeholder='Password' required /><br/>
                    <button type='submit'>show</button>
                </form>
                
            </div>
        }

        
        
        <div>

        </div>

      </center>}
      
      {alert &&
        <Popup data={data} val={alert} />
      }

      <Naviba />
      
    </div>
    
  )
}

export default AdminHome
