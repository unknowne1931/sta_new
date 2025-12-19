import React, { useEffect, useState } from 'react'
import Loading from '../../loading'
import api_user_admin from '../user_admin'
import Popup from '../popup'
import Navibar_user from './navibar_user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const View_qstn = () => {
    
    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    const [dat, setDat] = useState([]);
    const [alert, setAlert] = useState(false);

    const user = localStorage.getItem('ssid_admin')

    useEffect(()=>{
        Get_Data()
    },[])

    const Get_Data = () =>{
        try{
            api_user_admin.get(`https://kalanirdhari.in/get/admin/sub/users/posted/datas/011/${user}`)
            .then(res =>{
                if(res.data.data){
                    setData(res.data.data)
                    setLoad(false)
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
        
        <h1 className='main-h1-01' >View Questions</h1><br/>

        {data.length <= 0 && <h2 className='admin_questionview-h1-02'><strong>0 : </strong> Questions Found.</h2> }
            
        {data.length > 0 &&
            <h2 className='admin_questionview-h1-02'>Total Questions : <strong>{data.length}</strong> </h2>
        }
            <div>
                {data.map((user, i)=>{

                    const DeleOne_fromId = () =>{
                        try{
                            setAlert(false)
                            api_user_admin.delete(`https://kalanirdhari.in/delete/users/admin/qno/from/admin/users/${user._id}`)
                            .then(res =>{
                                if(res.data.Status === "OK"){
                                    Get_Data()
                                }else{
                                    setDat("Something went Wrong, Try again Later");
                                    setAlert(true)
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
                    
                    return(
                        <div className="admin_questions-view-sub-cnt-01">
                            
                            
                            <h2><strong>{parseInt(user.qno) == i+1 && (user.qno)} {parseInt(user.qno) != i+1 && (user.qno)}  </strong> : {user.Questio}</h2>
                            <br/>
                            <div className={user.img === "" ?  "pop-up-data-01-sub-cnt-01-main-sub-cnt-01-img-cnt-02" :  "pop-up-data-01-sub-cnt-01-main-sub-cnt-01-img-cnt-01"}>
                                <img src={user.img} alt='image' />
                            </div>
                            <br/>
                            <div className='admin_questions-view-sub-cnt-01-btn-01'>
                                <button className={user.Ans === "a" ? "Admin_QuestionView-Answer" : "admin_questions-view-sub-cnt-01-btn-01-01" } >{user.a}</button>
                                <button className={user.Ans === "b" ? "Admin_QuestionView-Answer" : "admin_questions-view-sub-cnt-01-btn-01-01" } >{user.b}</button>
                            </div>
                            <div className='admin_questions-view-sub-cnt-01-btn-01'>
                                <button className={user.Ans === "c" ? "Admin_QuestionView-Answer" : "admin_questions-view-sub-cnt-01-btn-01-01" }>{user.c}</button>
                                <button className={user.Ans === "d" ? "Admin_QuestionView-Answer" : "admin_questions-view-sub-cnt-01-btn-01-01" } >{user.d}</button>
                            </div>
                            <br/>
                            {/* <span style={{fontSize : "2em"}} >Tough : <strong>{user.tough}</strong></span><br/>
                            <br/> */}
                            <button onClick={DeleOne_fromId} className='button-01'><FontAwesomeIcon icon={faTrash} /> {user.qno}</button><br/>
                            <strong>- - - -</strong>
                            <div style={{height : "50px"}}></div>

                        </div>
                    )
                })}
            </div>

      </center>}
      {alert &&
        <Popup data={data} val={alert} />
      }

      <Navibar_user />
    </div>
  )
}

export default View_qstn
