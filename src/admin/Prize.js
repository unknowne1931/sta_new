import React, { useEffect, useState } from 'react'
import Naviba from './naviba'
import axios from 'axios'
import apiAdmin from '../pages/adminapi';
import Popup from '../pages/popup';
import Loading from '../loading';

const Prize = () => {
    const [rupee, setRupee] = useState([]);
    const [get_rupe, setGet_Rupee] = useState([]);
    const [stars_sta, setStars_Data] = useState([]);
    const [stars_count, setStars_count] = useState([]);
    const [stars, setStars] = useState([]);

    const [alert, setAlert] = useState(false);
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(()=>{
        GetStarsData();
        GetRupeeVal();
        
    },[])

    const GetStarsData = () =>{
        try{
            apiAdmin.get(`${"http://192.168.31.133"}/stars/get/all/data/by/stars`)
            .then(res =>{
                if(res.data.data){
                    setStars_Data(res.data.data)
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


    const GetRupeeVal = () =>{
        try{
            setTimeout(()=>{
                fetch(`${"http://192.168.31.133"}/get/rupee/data/play`)
                .then(res => res.json())
                .then(data =>{
                    if(data.data){
                        setGet_Rupee(data.data)
                        setLoad(false);
                    }else{
                        setLoad(false);
                        console.warn("Unexpected response structure:", data.data);
                    }
                }).catch(error=>{
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

    const RupeePo = (e) =>{
        try{
            e.preventDefault();
            axios.post(`${"http://192.168.31.133"}/rupee/get/for/game`,{rupee})
            .then(res=>{
                if(res.data.Status === "OK"){
                    GetRupeeVal()
                }else{
                    alert("Data Not Posted")
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

    const PostorUpdate = async (e) => {
        try{
            e.preventDefault();
            axios.post(`${"http://192.168.31.133"}/stars/count/one/stars`,{ stars, count: stars_count })
            .then(res =>{
                if(res.data.Status === "OK"){
                    GetStarsData()
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
         
      };
      


  return (
    <div>
        {load ? <Loading /> : 
      <center>
        
        <h1 className='admin_prize-h1-01'>Prizes</h1>
        <div className='admin_prize-div-cnt-01'>
            <span className='admin_prize-div-cnt-01-span-01'>Entry Fee: ₹ <strong>{get_rupe.rupee}.00</strong></span>
            
            <form onSubmit={RupeePo} >
                <input type='text' placeholder='Rupee' onChange={e=>{setRupee(e.target.value)}} required /><br/>
                <button type='submit'>Post</button>
            </form>
        
        </div>

        <br/>

        <div className='admin_prize-div-cnt-02'>

            {stars_sta.map((user, i)=>{

                return(
                    <form style={{margin : "10px"}} key={i} onSubmit={PostorUpdate}>
                        <strong>{user.count}</strong><br/>
                        <input type='text' placeholder={`${user.stars} stars`} onChange={e=>{setStars_count(e.target.value);setStars(user.stars)}} required /><br/>
                        <button type='submit'>post</button>
                    </form>
                )
            })}
            <br/>

        </div>


      </center>}
      <Naviba />
      {alert &&
        <Popup data={data} val={alert} />
      }

    </div>
  )
}

export default Prize
