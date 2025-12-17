import React, { useEffect, useState } from 'react'
import Naviba from './naviba'
import apiAdmin from '../pages/adminapi'

const Questionview = () => {

    const [lang, setLang] = useState([]);
    const [qdata, setQData] = useState([]);
    const [ALLLData, setALLLDAta] = useState([]);

    useEffect(()=>{
        GetAllDAta()
    },[])


    const GetAllDAta = () =>{
        try{
            apiAdmin.get("http://kalanirdhari.in/get/all/admin/new/languages/data")
            .then(res =>{
                if(res.data.Data){
                    setALLLDAta(res.data.Data)
                }else if(res.data.Logout === "OUT"){
                    localStorage.removeItem("token");
                    window.location.reload()
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


    const GetListsQuest = (e)=>{
        try{
            e.preventDefault();
            apiAdmin.get(`${"http://kalanirdhari.in"}/get/admin/all/question/lists/${lang}`)
            .then(res=>{
            if(res.data.data){
                setQData(res.data.data);
            }
            else if(res.data.Logout === "OUT"){
                localStorage.removeItem("token");
                window.location.reload();
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

  return (
    <div>
      <center>
        
        <br/>
        <h1 className='admin_questionview-h1-01' >Questions List</h1>
    
        <div className='admin_questionview-main-to-btn-01'>
            <button onClick={()=>{window.location.href='/admin/check'}}>View All Questions</button>
        </div>

        <div>
            <form onSubmit={GetListsQuest}>
                <select onChange={e=>{setLang(e.target.value)}} >
                    <option >select</option>
                    {ALLLData.map((langu, i) =>{
                        return(
                            <option value={langu}>{langu}</option>
                        )
                    })}
                    
                </select><br/>
                <button type='submit' className='admin_questionview-btn-01' >Get</button>
            </form>
            <br/>

            {qdata.length > 0 &&
                <h2 className='admin_questionview-h1-02'>Total Questions : <strong>{qdata.length}</strong> </h2>
            }
            <div>

                <div className="admin_questions-view_main_cnt-01_may_be">

                    {qdata.map((user, i)=>{
                        
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
                                <strong style={{fontSize : "2rem", color : "black"}}>Seconds : {user.seconds}</strong>
                                <br/>
                                <span style={{fontSize : "2em"}} >Tough : <strong>{user.tough}</strong></span><br/>
                                <strong>- - - -</strong>
                                <div style={{height : "50px"}}></div>



                            </div>
                        )
                    })}


                </div>


                


            </div>
        </div>

        <div style={{height : "50px"}}></div>

      </center>
      <Naviba />
    </div>
  )
}

export default Questionview
