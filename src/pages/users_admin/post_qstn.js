import axios from 'axios';
import React, { useState } from 'react'
import Popup from '../popup';
import api_user_admin from '../user_admin';
import Navibar_user from './navibar_user';

const Post_qstn = () => {

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

    const user = localStorage.getItem('ssid_admin')

    const PostData = (e) =>{
        try{
            setAlert(false);
            e.preventDefault();
            api_user_admin.post(`${"http://192.168.31.133"}/get/a/users/admin/posted/questions/from/all/users`,{user, img, Questio, a, b, c, d, Ans, tough, seconds})
            .then(res =>{
                if(res.data.Status === "OK"){
                    const qno = res.data.qno
                    setData(`Question No : ${qno}  Posted Successfully`);
                    setAlert(true);
                    window.location.reload()
                }else if(res.data.Status === "IN"){
                    setData("This Question Exist");
                    setAlert(true);
                    window.location.reload()
                }else if(res.data.Status === 505){
                    localStorage.removeItem("ssid_admin")
                    localStorage.removeItem("admin_token")
                    window.location.href='/admin/user/login'
                }
                else{
                    setData("Something Went Wrong");
                    setAlert(true);
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

  return (
    <div>

      <center>
        <div className="Home-cnt-01-sub-01">
            <strong>
                sta<span>W</span>ro
            </strong>
            <hr />
        </div>
        <h1 className='main-h1-01'>Add Question</h1>
        <br/>

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
                    <option value='a'>{a}</option>
                    <option value='b'>{b}</option>
                    <option value='c'>{c}</option>
                    <option value='d'>{d}</option>
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
      </center>
      {alert &&
        <Popup data={data} val={alert} />
      }
      <Navibar_user />
    </div>
  )
}

export default Post_qstn
