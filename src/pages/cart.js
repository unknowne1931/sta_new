import { faArrowRotateForward, faClockRotateLeft, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState, useEffect} from 'react'
import api from './api'
import Popup from './popup'
import axios from 'axios'
import Loading from '../loading'

const Cart = () => {

    const [store_coins, setStore_coins] = useState([]);
    const user = localStorage.getItem("user");
    const [my_Coins, setMy_Coins] = useState([]);
    const [starBal, setStarBal] = useState([]);
    const [alert, setAlert] = useState(false);
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(()=>{
        GetStoreCoins();
        GetMyCoins();
        GetStarsBala();
    },[])


    const GetStarsBala = () =>{
        try{
            setAlert(false)
            api.get(`${"http://localhost"}/get/stars/balance`)
            .then(res =>{
                if(res.data.data){
                    setStarBal(res.data.data);
                }else if(res.data.Status === "OKK"){

                }else if(res.data.Logout === "OUT"){
                    localStorage.removeItem("ssid");
                    window.location.reload();
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

    const GetMyCoins = () =>{
        try{
            setAlert(false)
            api.get(`${"http://localhost"}/get/coins/data/by/id`)
            .then(res=>{
                if(res.data.data){
                    setMy_Coins(res.data.data);
                }
                else if(res.data.Logout === "OUT"){
                    localStorage.removeItem("ssid");
                    window.location.reload();
                }else{
                    setData("Something went Wrong")
                    setAlert(true)
                }

                }
            ).catch(error=>{
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
                setAlert(false)
                api.get(`${"http://localhost"}/get/coin/data`)
                .then(res=>{
                if(res.data.data){
                    setStore_coins(res.data.data);
                    setLoad(false)
                }
                else if(res.data.Logout === "OUT"){
                    setLoad(false)
                    localStorage.removeItem("ssid");
                    window.location.reload();
                }else{
                    setLoad(false)
                    setData("Something went Wrong")
                    setAlert(true)
                }

                }).catch(error=>{
                    if (error.response) {
                        setLoad(false)
                        console.error("API Error:", error.response.status, error.response.data);
                    } else if (error.request) {
                        setLoad(false)
                        console.error("No response from server. Please check your connection.");
                    } else {
                        setLoad(false)
                        console.error("Error occurred:", error.message);
                    }
                })
            },1000)
            
        }catch(error){
            setLoad(false)
            console.log(error)
        }
        
        
    }


    


  return (
    <div>
        {load ? <Loading /> : 
      <center>

        

        <div className='cart_main_cnttt_0111-1'>
            <div className='cart_main_cnttt_0111-1_pos-1'>
                <h1 className='cart-page-main-h1-01'>Cart / <span>shop</span></h1>
            </div>
            

            <div className='cart_main_cnttt_0111-1_pos-2' onClick={()=>{window.location.href='/cart/history'}} >
                <div className='cart_main_cnttt_0111-1_pos' onClick={()=>{
                    window.location.href='/cart/history'
                }} >
                    claimed / pending
                </div>
            </div>    
        </div>

        

        <div className='cart-page-main-cnt-03'>
            <div className='cart-page-main-cnt-03_star_bal'>Star Balance</div>
            <h1>Stars : <FontAwesomeIcon icon={faStar} className='cart-page-main-cnt-03-icon-01' /><span>{starBal.balance}</span></h1>
        </div>
        
        <div className='cart-page-main-cnt-01'>
            <span className='cart-page-main-cnt-01-span-01' >My <span>Coins</span></span>
            <br/>

            {my_Coins.length < 1 && 
                    <h2 id='1' className='cart-page-main-cnt-01-sub-cnt-01-h2-01'>No Coins Found.</h2>
            }

            <div className='cart-page-main-cnt-01-sub-cnt-01'>

                
                {my_Coins.map((data, i) =>{

                    const ClaimCoin = (e) =>{
                        e.preventDefault();
                        try{
                            setAlert(false);
                            api.post(`${"http://localhost"}/claim/reqst/coins/admin`,{user, id : data._id})
                            .then(res=>{
                                if(res.data.Status === "OK"){
                                    delay(5000)
                                    GetMyCoins();
                                    setData("Request Sent")
                                    setAlert(true)
                                    
                                }else if(res.data.Status === "No-BANK"){
                                    setData("Add Bank Account or UPI to claim coins.")
                                    setAlert(true)
                                    window.location.href = "/account/upi";

                                }
                                else{
                                    setData("Something went Wrong, Try again.")
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
                        <div key={i} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01'>
                            <strong className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-strong-01'>{data.title}</strong>
                            <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-01'>
                                <img src={data.img} alt='img' />
                            </div><br/>
                            <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-03'>{data.body}</span>
                            <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-01'>Valid : <strong>{data.valid}</strong></span><br/>
                            <div onClick={ClaimCoin} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-02'>
                                <strong >Claim</strong>
                            </div>
                        </div>
                    )
                })}
    
            </div>
        </div>
        <br/>

        <div className='cart-page-main-cnt-02'>

            <span className='cart-page-main-cnt-01-span-01'>Buy <span> Coins</span></span>
            <br/>

            {store_coins.length < 1 && 
                <h2 id='1' className='cart-page-main-cnt-01-sub-cnt-01-h2-01'>No Coins Found.</h2>
            }

            <div className='cart-page-main-cnt-02-sub-cnt-01'>

                {store_coins.map((data, i) =>{

                    const BuyCoins = (e) =>{
                        try{
                            setAlert(false);
                            e.preventDefault();
                            api.post(`${"http://localhost"}/get/my/conis/get`, { user, id : data._id })
                            .then(res=>{
                                if(res.data.Status === "OK"){
                                    GetMyCoins()
                                    GetStarsBala()
                                    setData("Coin Bought")
                                    setAlert(true)
                                }else if(res.data.Status === "Low Bal"){
                                    setData("Not Enough Stars")
                                    setAlert(true)
                                }else{
                                    setData("Something went Wrong")
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
                        <div key={i} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01'>
                            <strong className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-strong-01'>{data.title}</strong>
                            <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-01'>
                                <img src={data.img} alt='img' />
                            </div><br/>
                            <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-01'>Valid : <strong>{data.valid}</strong></span><br/>
                            <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-02-modify'>Stars : <strong>{data.stars}</strong></span><br/>
                            <div onClick={BuyCoins} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-02'>
                                <strong  >Get</strong>
                            </div>
                        </div>
                    )
                })}

            </div>

        </div>
        <div style={{height : "50px"}}>

        </div>
        {alert &&
            <Popup data={data} val={alert} />
        }
        
      </center>}
    </div>
  )
}

export default Cart
