import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Popup from '../pages/popup'
import api from '../pages/api'
import adminApi from '../pages/adminapi'
import apiAdmin from '../pages/adminapi'
import Naviba from './naviba'
import Loading from '../loading'

const Coin = () => {

    const [title, setTitle] = useState([])
    const [img, setImg] = useState([])
    const [valid, setValid] = useState([])
    const [body, setBody] = useState([])
    const [stars, setStars] = useState([])

    const [data, setData] = useState([])
    const [alert, setAlert] = useState(false);

    const [store_coins, setStore_coins] = useState([])
    const [load, setLoad] = useState(true);


    useEffect(()=>{
      GetStoreCoins()
    },[])


    const PostDat = (e) =>{
        try{
            setAlert(false)
            e.preventDefault()
            axios.post(`${"http://localhost"}/coin/new/data`,{title, img, valid, body, stars})
            .then(res =>{
                if(res.data.Status === "OK"){
                    GetStoreCoins()
                    setData("New Coin Created")
                    setAlert(true)
                }else{
                    setData("Something went Wrong")
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

    const GetStoreCoins = () =>{
        try{
            setTimeout(()=>{
                apiAdmin.get(`${"http://localhost"}/get/coin/data/2`)
                .then(res=>{
                if(res.data.data){
                    setStore_coins(res.data.data);
                    setLoad(false);
                }
                else if(res.data.Logout === "OUT"){
                    localStorage.removeItem("token");
                    setLoad(false);
                    window.location.reload();
                }else{
                    setLoad(false);
                    console.warn("Unexpected response structure:", res.data);
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
            }, 1000)
            
        }catch(error){
            setLoad(false);
            console.log(error)
        }
      
  }

  return (
    <div>
    {load ? <Loading /> : 
      <center>
        
        <h1 className='coins-h1-01'>Coins Add</h1>

        <div>
            <h2 className='coins-h2-01'>Add New Coins</h2><br/>

            <form onSubmit={PostDat}>
                <div className='coins-main-cnt-01'>
                    <input type='text' placeholder='title' onChange={e=>{setTitle(e.target.value)}} required /><br/>
                    <input type='url' placeholder='Image Link' onChange={e=>{setImg(e.target.value)}} required /><br/>
                    <input type='text' placeholder='Valid' onChange={e=>{setValid(e.target.value)}} required /><br/>
                    <input type='text' placeholder='Body' onChange={e=>{setBody(e.target.value)}} required /><br/>
                    <input type='number' placeholder='stars' onChange={e=>{setStars(e.target.value)}} required /><br/>
                    <button type='submit' >Post</button>
                </div>
            </form>
            
        </div>
        <br/>
        <hr style={{width : "80%"}} />

        <div className='cart-page-main-cnt-02-sub-cnt-01'>
          {store_coins.map((data, i) =>{
                const Dele = (e) =>{
                    try{
                        e.preventDefault()
                        setAlert(false)
                        axios.delete(`${"http://localhost"}/delete/coin/by/${data._id}`)
                        .then(res=>{
                            if(res.data.Status === "OK"){
                                GetStoreCoins();
                            }else{
                                GetStoreCoins();
                                setData("Something went Wrong")
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
              return(
                  <div key={i} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01'>
                      <strong className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-strong-01'>{data.title}</strong>
                      <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-01'>
                          <img src={data.img} alt='img' />
                      </div><br/>
                      <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-01'>Valid : <strong>{data.valid}</strong></span><br/>
                      <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-02'>Stars : <strong>{data.stars}</strong></span><br/>
                      <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-02'>
                        <strong onClick={Dele}>Delete</strong>
                      </div>
                  </div>
              )
          })}
        </div>

        <div style={{height : "50px"}}>

        </div>


      </center>}
      {alert &&
        <Popup data={data} val={alert} />
      }
      <Naviba />
    </div>
  )
}

export default Coin
