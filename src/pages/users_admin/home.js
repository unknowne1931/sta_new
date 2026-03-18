import React, { useEffect, useState } from 'react'
import api_user_admin from '../user_admin'
import Loading from '../../loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faWallet } from '@fortawesome/free-solid-svg-icons';

const Admin_Users_Home = () => {

    const user = localStorage.getItem("ssid_admin");
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(()=>{
        get_all_lang()
    },[])
    
    const get_all_lang = () =>{
        try{
            api_user_admin.get(`http://localhost/get/user/admin/languages/to/post/${user}`)
            .then(res=>{
                if(res.data.data){
                    setData(res.data.data)
                    setLoad(false)
                }else if(res.data.Status === 505){
                    localStorage.removeItem("ssid_admin")
                    localStorage.removeItem("admin_token")
                    window.location.href='/admin/user/login'
                }
                else{
                    setLoad(false)
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


                <div className='user_admin_home_page-cnt-01'>
                    <h1 className='user_admin_home_page-cnt-01-h1-01'>Admin <span>{data.user}</span></h1>
                    <br/>

                    <div className='user_admin_home_page-cnt-01-sub-cnt-01'>
                        <div className='user_admin_home_page-cnt-01-sub-cnt-01-sub-cnt-01' onClick={()=>{window.location.href='/admin/user/wallet'}}>
                            <FontAwesomeIcon className='icon--01' icon={faWallet} /><br/><br/>
                            <span>Wallet</span>
                        </div>

                        <div className='user_admin_home_page-cnt-01-sub-cnt-01-sub-cnt-01' onClick={()=>{window.location.href='/admin/user/add'}}>
                            <FontAwesomeIcon className='icon--01' icon={faPlus} /><br/><br/>
                            <span>Add Question</span>
                        </div>

                        <div className='user_admin_home_page-cnt-01-sub-cnt-01-sub-cnt-01' onClick={()=>{window.location.href='/admin/user/questions'}} >
                            <FontAwesomeIcon className='icon--01' icon={faList} /><br/><br/>
                            <span>View Question</span>
                        </div>

                    </div>

                </div>

                
            </center>
        }
    </div>
  )
}

export default Admin_Users_Home
