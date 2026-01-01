import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const SignUpAdmin = () => {

    const location = useLocation();
    const queryParm = new URLSearchParams(location.search);
    const show = queryParm.get('show');
    const id = queryParm.get('id');

    const [username, setUsername] = useState([]);
    const [pass, setPass] = useState([]);
    const [quest, setQuest] = useState([]);
    const [answ, setAnsw] = useState([]);

    const PostData = (e) =>{
        try{
            e.preventDefault();
            if(answ.length > 2 && id.length > 2){
                axios.post(`${"http://localhost"}/get/new/user/admin/account`,{username, pass, quest, answ, id})
                .then(res=>{
                    if(res.data.Status === "OK"){
                        alert("Account Created")
                    }else{
                        alert("Something Went Wrong")
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
            }else{
                alert("Sorry Try Again")
            }
        }catch(error){
            console.log(error)
        }
        
        
    }

  return (
    <div>
        {show === "true" &&
            <center>
                
                <div className='Home-cnt-01-sub-01'>
                    <strong>sta<span>W</span>ro</strong>
                    <hr/>
                </div>
                
                <h1 className='admin-signup-h1-01'>Admin Sign Up</h1>
                <span className='admin-span-01'>welcome to Admin</span>

                <div className='admin-signup-page-main-cnt-01'>
                    <form onSubmit={PostData}>
                        <input type='text' onChange={e=>{setUsername(e.target.value)}} placeholder='Username' required /><br/>
                        <input type='password' onChange={e=>{setPass(e.target.value)}} placeholder='Password' required /><br/>
                        <select onChange={e=>{setQuest(e.target.value)}}>
                            <option value="" >Question</option>
                            <option value="Movie" >What is your favorite Movie?</option>
                            <option value="Food" >What is your favorite Food?</option>
                            <option value="Bird" >What is your favorite Bird?</option>
                            <option value="Hero" >Who is your favorite Hero?</option>
                            <option value="Number" >What is your favorite Number?</option>
                            <option value="Animal" >What is your favorite Animal?</option>
                        </select><br/>
                        <input type='text' onChange={e=>{setAnsw(e.target.value)}} placeholder='Answer' required /><br/>
                        <button type='submit'>Sign-Up</button>
                    </form>
                </div>
            </center>
        }
    </div>
  )
}

export default SignUpAdmin
