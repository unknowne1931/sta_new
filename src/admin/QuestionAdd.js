import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Popup from '../pages/popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRemove, faX } from '@fortawesome/free-solid-svg-icons';
import apiAdmin from '../pages/adminapi';
import api from '../pages/api';

const QuestionAdd = () => {

    // user, img, Questio, a, b, c, d, Ans, lang

    const user = localStorage.getItem("username");

    const [img, setImg] = useState('');
    const [Questio, setQuestio] = useState([]);
    const [a, setA] = useState([]);
    const [b, setB] = useState([]);
    const [c, setC] = useState([]);
    const [d, setD] = useState([]);
    const [Ans, setAns] = useState([]);
    const [lang, setLang] = useState([]);
    const [tough, setTough] = useState([]);
    const [ALL, setALL] = useState([]);
    const [ALLLData, setALLLDAta] = useState([]);
    const [seconds, setSeconds] = useState([]);
    
    const [show3, setShow3] = useState(false);
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState(false);
    const [One, setOne] = useState('')

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


    const PostData = (e) =>{
        try{
            setAlert(false);
            e.preventDefault();
            axios.post(`${"http://kalanirdhari.in"}/get/posted/count/questions`,{user, img, Questio, a, b, c, d, Ans, lang, tough, seconds})
            .then(res =>{
                if(res.data.Status === "OK"){
                    const qno = res.data.qno
                    setData(`Question No : ${qno}  Posted Successfully`);
                    setAlert(true);
                }else{
                    setData("Something Went Wrong");
                    setAlert(true);
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

    const PostAllLang = (e) => {
        try{
            e.preventDefault();
            setAlert(false);
            apiAdmin.post("http://kalanirdhari.in/add/all/admin/new/languages/data",{lang : ALL})
            .then(res =>{
                if(res.data.Status === "OK"){
                    GetAllDAta()
                    setShow3(false)

                }else if(res.data.Status === "IN"){
                    setData(`${ALL} is Existed`)
                    setAlert(true)
                }
                else{
                    setData("Something Went Wrong")
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
        
        <br/>
        <h1 className='admin_questionadd-h1-01'><span>Add</span> Questions</h1>

        <div className='admin_questionadd-cnt-01'>
            <form onSubmit={PostData}>
                <textarea placeholder='Type a Question' onChange={e=>{setQuestio(e.target.value)}} required></textarea><br/>
                <input type='url' placeholder='Image URL' onChange={e=>{setImg(e.target.value)}} autoCorrect='on' autoComplete='off' /><br/>
                <input type='text' placeholder='Option A' onChange={e=>{setA(e.target.value)}} autoCorrect='on' autoComplete='off' required /><br/>
                <input type='text' placeholder='Option B' onChange={e=>{setB(e.target.value)}} autoCorrect='on' autoComplete='off' required /><br/>
                <input type='text' placeholder='Option C' onChange={e=>{setC(e.target.value)}} autoCorrect='on' autoComplete='off' required /><br/>
                <input type='text' placeholder='Option D' onChange={e=>{setD(e.target.value)}} autoCorrect='on' autoComplete='off' required /><br/>
                <input type='number' placeholder='Seconds' onChange={e=>{setSeconds(e.target.value)}} autoCorrect='on' required /><br/>
                <select required onChange={e=>{setAns(e.target.value)}} >
                    <option value=''>Answer</option>
                    <option value='A'>{a}</option>
                    <option value='B'>{b}</option>
                    <option value='C'>{c}</option>
                    <option value='D'>{d}</option>
                </select><br/>
                <select required onChange={e=>{setLang(e.target.value)}} >
                    <option value=''>Language</option>
                    {ALLLData.map((data, i) =>{
                        return(
                            <option value={data}>{data}</option>
                        )
                    })}
                    {/* <option value='Kannada'>Kannada</option>
                    <option value='English'>English</option>
                    <option value='Hindi'>Hindi</option>
                    <option value='Telugu'>Telugu</option> */}
                </select><br/>

                <select required onChange={e=>{setTough(e.target.value)}}>
                    <option value=''>Select</option>
                    <option value='Too Easy' className='easy_type_01'>Too Easy</option>
                    <option value='Easy' className='easy_type_02'>Easy</option>
                    <option value='Medium' className='easy_type_03'>Medium</option>
                    <option value='Tough' className='easy_type_04'>Tough</option>
                    <option value='Too Tough' className='easy_type_05'>Too Tough</option>

                </select><br/>

                <button type='submit' >Post</button>
            </form>
            

        </div>
        <br/>

        <div style={{height : "40px"}}></div>
        
        <hr style={{width : "95%"}} />

        <div style={{height : "40px"}}></div>


        <h1 className='admin_questionadd-h1-may-be-01'>Add New Topics</h1>

        <div className='admin_questionadd-maybe-subb-cnt-01'>

            {!show3 &&
            <div>
                {ALLLData.map((users, i) =>{

                    const DeleOne = () =>{
                        try{
                            setAlert(false)
                            apiAdmin.delete(`http://kalanirdhari.in/delete/all/selected/data/with/onley/one/${users}`)
                            .then(res =>{
                                if(res.data.Status === "OK"){
                                    GetAllDAta()
                                }else if(res.data.Status === "BAD"){
                                    setData("Data Not Exist in Data Base")
                                    setAlert(true)
                                }else{
                                    setData("Admin sir ,Something went Wrong")
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
                    return(
                        <button className={One !== users ? "admin_questionadd-maybe-subb-cnt-01-btn-02" : "admin_questionadd-maybe-subb-cnt-01-btn-04"} onClick={()=>{if(One !== users){setOne(users)}else if(One === users){DeleOne()}}} > {One === users ? <FontAwesomeIcon icon={faRemove} /> : users} </button>
                    )
                })}
                
                <button className='admin_questionadd-maybe-subb-cnt-01-btn-01' onClick={()=>{setShow3(true)}} >< FontAwesomeIcon icon={faPlus}/> </button>
            </div>}

            {show3 &&
                <form onSubmit={PostAllLang}>
                    <input type='text' placeholder='Add New Topics' onChange={e=>{setALL(e.target.value)}} className='admin_questionadd-maybe-subb-cnt-01-input-01' required /><br/>
                    <button type='submit' className='admin_questionadd-maybe-subb-cnt-01-btn-01' >< FontAwesomeIcon icon={faPlus}/> </button>
                    <button onClick={()=>{setShow3(false)}} className='admin_questionadd-maybe-subb-cnt-01-btn-01' >< FontAwesomeIcon icon={faX}/> </button>
                </form>
            }


            
            
        </div>

        <div style={{height : "50px"}}></div>

      </center>
      {alert &&
        <Popup data={data} val={alert} />
      }
    </div>
  )
}

export default QuestionAdd
