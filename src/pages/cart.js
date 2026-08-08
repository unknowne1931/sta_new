// import { faArrowRotateForward, faClockRotateLeft, faStar } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React, { useState, useEffect } from 'react'
// import api from './api'
// import Popup from './popup'
// import axios from 'axios'
// import Loading from '../loading'

// const Cart = () => {

//     const [store_coins, setStore_coins] = useState([]);
//     const user = localStorage.getItem("user");
//     const [my_Coins, setMy_Coins] = useState([]);
//     const [starBal, setStarBal] = useState([]);
//     const [alert, setAlert] = useState(false);
//     const [data, setData] = useState([]);
//     const [load, setLoad] = useState(true);

//     const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//     useEffect(() => {
//         GetStoreCoins();
//         GetMyCoins();
//         GetStarsBala();
//     }, [])


//     const GetStarsBala = () => {
//         try {
//             setAlert(false)
//             api.get(`${"http://192.168.31.133"}/get/stars/balance`)
//                 .then(res => {
//                     if (res.data.data) {
//                         setStarBal(res.data.data);
//                     } else if (res.data.Status === "OKK") {

//                     } else if (res.data.Logout === "OUT") {
//                         localStorage.removeItem("ssid");
//                         window.location.reload();
//                     } else {
//                         setData("Something went Wrong")
//                         setAlert(true)
//                     }
//                 }).catch(error => {
//                     if (error.response) {
//                         console.error("API Error:", error.response.status, error.response.data);
//                     } else if (error.request) {
//                         console.error("No response from server. Please check your connection.");
//                     } else {
//                         console.error("Error occurred:", error.message);
//                     }
//                 })
//         } catch (error) {
//             console.log(error)
//         }

//     }

//     const GetMyCoins = () => {
//         try {
//             setAlert(false)
//             api.get(`${"http://192.168.31.133"}/get/coins/data/by/id`)
//                 .then(res => {
//                     if (res.data.data) {
//                         setMy_Coins(res.data.data);
//                     }
//                     else if (res.data.Logout === "OUT") {
//                         localStorage.removeItem("ssid");
//                         window.location.reload();
//                     } else {
//                         setData("Something went Wrong")
//                         setAlert(true)
//                     }

//                 }
//                 ).catch(error => {
//                     if (error.response) {
//                         console.error("API Error:", error.response.status, error.response.data);
//                     } else if (error.request) {
//                         console.error("No response from server. Please check your connection.");
//                     } else {
//                         console.error("Error occurred:", error.message);
//                     }
//                 })
//         } catch (error) {
//             console.log(error)
//         }

//     }

//     const GetStoreCoins = () => {
//         try {
//             setTimeout(() => {
//                 setAlert(false)
//                 api.get(`${"http://192.168.31.133"}/get/coin/data`)
//                     .then(res => {
//                         if (res.data.data) {
//                             setStore_coins(res.data.data);
//                             setLoad(false)
//                         }
//                         else if (res.data.Logout === "OUT") {
//                             setLoad(false)
//                             localStorage.removeItem("ssid");
//                             window.location.reload();
//                         } else {
//                             setLoad(false)
//                             setData("Something went Wrong")
//                             setAlert(true)
//                         }

//                     }).catch(error => {
//                         if (error.response) {
//                             setLoad(false)
//                             console.error("API Error:", error.response.status, error.response.data);
//                         } else if (error.request) {
//                             setLoad(false)
//                             console.error("No response from server. Please check your connection.");
//                         } else {
//                             setLoad(false)
//                             console.error("Error occurred:", error.message);
//                         }
//                     })
//             }, 1000)

//         } catch (error) {
//             setLoad(false)
//             console.log(error)
//         }


//     }





//     return (
//         <div>
//             {load ? <Loading /> :
//                 <center>



//                     <div className='cart_main_cnttt_0111-1'>
//                         <div className='cart_main_cnttt_0111-1_pos-1'>
//                             <h1 className='cart-page-main-h1-01'>Cart / <span>Shop</span></h1>
//                         </div>


//                         {/* <div className='cart_main_cnttt_0111-1_pos-2' onClick={()=>{window.location.href='/cart/history'}} >
//                 <div className='cart_main_cnttt_0111-1_pos' onClick={()=>{
//                     window.location.href='/cart/history'
//                 }} >
//                     claimed / pending
//                 </div>
//             </div>     */}



//                     </div>

//                     <div className='cart-page-main-cnt-04'>

//                         <div className='cart-page-main-cnt-03'>
//                             <div className='cart-page-main-cnt-03_star_bal'>Star Balance</div>
//                             <h1>Stars :
//                                 {/* <FontAwesomeIcon icon={faStar} className='cart-page-main-cnt-03-icon-01' /> */}
//                                 <span>{starBal.balance}</span></h1>
//                         </div>

//                         {/* <div className='cart_main_cnttt_0111-1_pos-2' onClick={() => { window.location.href = '/cart/history' }} >
//                           <div className='cart_main_cnttt_0111-1_pos' onClick={() => {
//                               window.location.href = '/cart/history'
//                           }} >
//                               claimed / pending
//                           </div>
//                       </div> */}


//                         <div className='cart-page-main-cnt-05'>

//                             Claims / Pending Page

//                         </div>

//                     </div>



//                     <br />







//                     <div className='cart-page-main-cnt-01'>
//                         <span className='cart-page-main-cnt-01-span-01' >My <span>Coins</span></span>
//                         <br />

//                         {my_Coins.length < 1 &&
//                             <h2 id='1' className='cart-page-main-cnt-01-sub-cnt-01-h2-01'>No Coins Found.</h2>
//                         }

//                         <div className='cart-page-main-cnt-01-sub-cnt-01'>


//                             {my_Coins.map((data, i) => {

//                                 const ClaimCoin = (e) => {
//                                     e.preventDefault();
//                                     try {
//                                         setAlert(false);
//                                         api.post(`${"http://192.168.31.133"}/claim/reqst/coins/admin`, { user, id: data._id })
//                                             .then(res => {
//                                                 if (res.data.Status === "OK") {
//                                                     delay(5000)
//                                                     GetMyCoins();
//                                                     setData("Request Sent")
//                                                     setAlert(true)

//                                                 } else if (res.data.Status === "No-BANK") {
//                                                     setData("Add Bank Account or UPI to claim coins.")
//                                                     setAlert(true)
//                                                     window.location.href = "/account/upi";

//                                                 }
//                                                 else {
//                                                     setData("Something went Wrong, Try again.")
//                                                     setAlert(true)
//                                                 }
//                                             })
//                                             .catch(error => {
//                                                 if (error.response) {
//                                                     console.error("API Error:", error.response.status, error.response.data);
//                                                 } else if (error.request) {
//                                                     console.error("No response from server. Please check your connection.");
//                                                 } else {
//                                                     console.error("Error occurred:", error.message);
//                                                 }
//                                             })
//                                     } catch (error) {
//                                         console.log(error)
//                                     }

//                                 }

//                                 return (
//                                     <div key={i} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01'>
//                                         <strong className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-strong-01'>{data.title}</strong>
//                                         <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-01'>
//                                             <img src={data.img} alt='img' />
//                                         </div>
//                                         <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-03'>{data.body}</span>
//                                         <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-01'>Valid : <strong>{data.valid}</strong></span>
//                                         <div onClick={ClaimCoin} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-02'>
//                                             <strong >Claim</strong>
//                                         </div>
//                                     </div>
//                                 )
//                             })}

//                         </div>
//                     </div>
//                     <br />

//                     <div className='cart-page-main-cnt-02'>

//                         <span className='cart-page-main-cnt-01-span-01'>Buy <span> Coins</span></span>
//                         <br />

//                         {store_coins.length < 1 &&
//                             <h2 id='1' className='cart-page-main-cnt-01-sub-cnt-01-h2-01'>No Coins Found.</h2>
//                         }

//                         <div className='cart-page-main-cnt-02-sub-cnt-01'>

//                             {store_coins.map((data, i) => {

//                                 const BuyCoins = (e) => {
//                                     try {
//                                         setAlert(false);
//                                         e.preventDefault();
//                                         api.post(`${"http://192.168.31.133"}/get/my/conis/get`, { user, id: data._id })
//                                             .then(res => {
//                                                 if (res.data.Status === "OK") {
//                                                     GetMyCoins()
//                                                     GetStarsBala()
//                                                     setData("Coin Bought")
//                                                     setAlert(true)
//                                                 } else if (res.data.Status === "Low Bal") {
//                                                     setData("Not Enough Stars")
//                                                     setAlert(true)
//                                                 } else {
//                                                     setData("Something went Wrong")
//                                                     setAlert(true)
//                                                 }
//                                             })
//                                             .catch(error => {
//                                                 if (error.response) {
//                                                     console.error("API Error:", error.response.status, error.response.data);
//                                                 } else if (error.request) {
//                                                     console.error("No response from server. Please check your connection.");
//                                                 } else {
//                                                     console.error("Error occurred:", error.message);
//                                                 }
//                                             })
//                                     } catch (error) {
//                                         console.log(error)
//                                     }
//                                 }

//                                 return (
//                                     <div key={i} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01'>
//                                         <strong className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-strong-01'>{data.title}</strong>
//                                         <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-01'>
//                                             <img src={data.img} alt='img' />
//                                         </div><br />
//                                         <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-01'>Valid : <strong>{data.valid}</strong></span><br />
//                                         <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-02-modify'>Stars : <strong>{data.stars}</strong></span><br />
//                                         <div onClick={BuyCoins} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-02'>
//                                             <strong  >Get</strong>
//                                         </div>
//                                     </div>
//                                 )
//                             })}

//                         </div>

//                     </div>
//                     <div style={{ height: "50px" }}>

//                     </div>
//                     {alert &&
//                         <Popup data={data} val={alert} />
//                     }

//                 </center>}
//         </div>
//     )
// }

// export default Cart
































































import { faArrowRotateForward, faClockRotateLeft, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import api from './api'
import Popup from './popup'
import axios from 'axios'
import Loading from '../loading'

const Cart = () => {


    const [sel_nav, setSel_Nav] = useState("My Coin")
    const [padding_data, setPending_Data] = useState([]);

    const [store_coins, setStore_coins] = useState([]);
    const user = localStorage.getItem("user");
    const [my_Coins, setMy_Coins] = useState([]);
    const [starBal, setStarBal] = useState([]);
    const [alert, setAlert] = useState(false);
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        GetStoreCoins();
        GetMyCoins();
        GetStarsBala();
        GetPendingData();
    }, [])


    const GetStarsBala = () => {
        try {
            setAlert(false)
            api.get(`${"http://192.168.31.133"}/get/stars/balance`)
                .then(res => {
                    if (res.data.data) {
                        setStarBal(res.data.data);
                    } else if (res.data.Status === "OKK") {

                    } else if (res.data.Logout === "OUT") {
                        localStorage.removeItem("ssid");
                        window.location.reload();
                    } else {
                        setData("Something went Wrong")
                        setAlert(true)
                    }
                }).catch(error => {
                    if (error.response) {
                        console.error("API Error:", error.response.status, error.response.data);
                    } else if (error.request) {
                        console.error("No response from server. Please check your connection.");
                    } else {
                        console.error("Error occurred:", error.message);
                    }
                })
        } catch (error) {
            console.log(error)
        }

    }

    const GetMyCoins = () => {
        try {
            setAlert(false)
            api.get(`${"http://192.168.31.133"}/get/coins/data/by/id`)
                .then(res => {
                    if (res.data.data) {
                        setMy_Coins(res.data.data);
                    }
                    else if (res.data.Logout === "OUT") {
                        localStorage.removeItem("ssid");
                        window.location.reload();
                    } else {
                        setData("Something went Wrong")
                        setAlert(true)
                    }

                }
                ).catch(error => {
                    if (error.response) {
                        console.error("API Error:", error.response.status, error.response.data);
                    } else if (error.request) {
                        console.error("No response from server. Please check your connection.");
                    } else {
                        console.error("Error occurred:", error.message);
                    }
                })
        } catch (error) {
            console.log(error)
        }

    }

    const GetStoreCoins = () => {
        try {
            setTimeout(() => {
                setAlert(false)
                api.get(`${"http://192.168.31.133"}/get/coin/data`)
                    .then(res => {
                        if (res.data.data) {
                            setStore_coins(res.data.data);
                            setLoad(false)
                        }
                        else if (res.data.Logout === "OUT") {
                            setLoad(false)
                            localStorage.removeItem("ssid");
                            window.location.reload();
                        } else {
                            setLoad(false)
                            setData("Something went Wrong")
                            setAlert(true)
                        }

                    }).catch(error => {
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
            }, 1000)

        } catch (error) {
            setLoad(false)
            console.log(error)
        }


    }

    const GetPendingData = () => {
        try {
            setTimeout(() => {
                api.get(`${"http://192.168.31.133"}/get/pending/notification`)
                    .then(res => {
                        if (res.data.data) {
                            setPending_Data(res.data.data);
                            setLoad(false)
                        } else if (res.data.Logout === "OUT") {
                            localStorage.removeItem("ssid");
                            setLoad(false)
                            window.location.reload()
                        } else {
                            setLoad(false)
                            console.warn("Unexpected response structure:", res.data);
                        }
                    })
                    .catch(error => {
                        setLoad(false)
                        if (error.response) {
                            console.error("API Error:", error.response.status, error.response.data);
                        } else if (error.request) {
                            console.error("No response from server. Please check your connection.");
                        } else {
                            console.error("Error occurred:", error.message);
                        }
                    })
            }, 1000)

        } catch (error) {
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
                            <h1 className='cart-page-main-h1-01'>Cart / <span>Shop</span></h1>
                        </div>


                    </div>

                    <div className='cart-page-main-cnt-04'>

                        <div className='cart-page-main-cnt-03'>
                            <div className='cart-page-main-cnt-03_star_bal'>Star Balance</div>
                            <h1>Stars :
                                {/* <FontAwesomeIcon icon={faStar} className='cart-page-main-cnt-03-icon-01' /> */}
                                <span>{starBal.balance}</span></h1>
                        </div>


                    </div>

                    <div className='cart_sel_t_buy_main_01'>

                        <div className={sel_nav === "My Coin" && "underline"}  onClick={() => { setSel_Nav("My Coin") }} >
                            My Coin
                        </div>

                        <div className={sel_nav === "Buy Coin" && "underline"} onClick={() => { setSel_Nav("Buy Coin") }} >
                            Buy Coin
                        </div>

                        <div className={sel_nav === "Pending" && "underline"} onClick={() => { setSel_Nav("Pending") }} >
                            Pending
                        </div>

                        <div className={sel_nav === "Claimed" && "underline"} onClick={() => { setSel_Nav("Claimed") }} >
                            Claimed
                        </div>

                    </div>


                    {sel_nav === "My Coin" &&

                        <div className='cart_sel_t_buy_main_02'>

                            {my_Coins.map((data, i) => {

                                const ClaimCoin = (e) => {
                                    e.preventDefault();
                                    try {
                                        setAlert(false);
                                        api.post(`${"http://192.168.31.133"}/claim/reqst/coins/admin`, { user, id: data._id })
                                            .then(res => {
                                                if (res.data.Status === "OK") {
                                                    delay(5000)
                                                    GetMyCoins();
                                                    setData("Request Sent")
                                                    setAlert(true)

                                                } else if (res.data.Status === "No-BANK") {
                                                    setData("Add Bank Account or UPI to claim coins.")
                                                    setAlert(true)
                                                    window.location.href = "/account/upi";

                                                }
                                                else {
                                                    setData("Something went Wrong, Try again.")
                                                    setAlert(true)
                                                }
                                            })
                                            .catch(error => {
                                                if (error.response) {
                                                    console.error("API Error:", error.response.status, error.response.data);
                                                } else if (error.request) {
                                                    console.error("No response from server. Please check your connection.");
                                                } else {
                                                    console.error("Error occurred:", error.message);
                                                }
                                            })
                                    } catch (error) {
                                        console.log(error)
                                    }

                                }


                                return (
                                    <>
                                        {/* <h1>{data._id}</h1> */}
                                        <div key={i} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01'>
                                            <strong className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-strong-01'>{data.title}</strong>
                                            <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-01'>
                                                <img src={data.img} alt='img' />
                                            </div>
                                            <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-03'>{data.body}</span>
                                            <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-01'>Valid : <strong>{data.valid}</strong></span>
                                            <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-02' onClick={ClaimCoin} >
                                                <strong >Claim</strong>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}


                            {my_Coins.length < 1 &&
                                <>
                                <div style={{
                                    width : "90%",
                                    // border : "1px solid",
                                    margin : "auto",
                                    color : "Gray"
                                }}>
                                    <h1>No Coins Found</h1>
                                </div>
                                
                                </>
                            }

                        </div>

                    }


                    {sel_nav === "Buy Coin" &&

                        <>

                            <div className='cart_sel_t_buy_main_02'>
                                {store_coins.map((data, i) => {

                                    const BuyCoins = (e) => {
                                        try {
                                            setAlert(false);
                                            e.preventDefault();
                                            api.post(`${"http://192.168.31.133"}/get/my/conis/get`, { user, id: data._id })
                                                .then(res => {
                                                    if (res.data.Status === "OK") {
                                                        GetMyCoins()
                                                        GetStarsBala()
                                                        setData("Coin Bought")
                                                        setAlert(true)
                                                    } else if (res.data.Status === "Low Bal") {
                                                        setData("Not Enough Stars")
                                                        setAlert(true)
                                                    } else {
                                                        setData("Something went Wrong")
                                                        setAlert(true)
                                                    }
                                                })
                                                .catch(error => {
                                                    if (error.response) {
                                                        console.error("API Error:", error.response.status, error.response.data);
                                                    } else if (error.request) {
                                                        console.error("No response from server. Please check your connection.");
                                                    } else {
                                                        console.error("Error occurred:", error.message);
                                                    }
                                                })
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }





                                    return (
                                        <>
                                            <div key={i} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01'>
                                                <strong className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-strong-01'>{data.title}</strong>
                                                <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-01'>
                                                    <img src={data.img} alt='img' />
                                                </div><br />
                                                <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-01'>Valid : <strong>{data.valid}</strong></span><br />
                                                <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-02-modify'>Stars : <strong>{data.stars}</strong></span><br />
                                                <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-02' onClick={BuyCoins} >
                                                    <strong  >Get</strong>
                                                </div>
                                            </div>

                                            
                                        </>
                                    )
                                })}

                            {store_coins.length < 1 &&
                                <>
                                    <div style={{
                                        width: "90%",
                                        // border : "1px solid",
                                        margin: "auto",
                                        color: "Gray"
                                    }}>
                                        <h1>No Coins Found</h1>
                                    </div>

                                </>
                            }


                            </div>

                        </>

                    }

                    {sel_nav === "Pending" &&

                        <>
                            {padding_data.map((user, i) => {
                                if (user.sub === "pending") {
                                    return (
                                        <div key={i} className='account-pending-main-cnt-01-sub-cnt-01'>
                                            <span className='account-pending-main-cnt-01-sub-cnt-01-sub-span-01'>Request <span style={{ color: "white" }}>sent</span> to claim "<strong style={{ color: "white" }}>{user.type === "Money" && <span>₹</span>}{user.title}</strong>". </span><br />
                                            <span className='account-pending-main-cnt-01-sub-cnt-01-sub-span-02'>{user.Time}</span>
                                        </div>
                                    )
                                }
                            })}

                            
                            {padding_data.length < 1 &&
                                <>
                                    <div style={{
                                        width: "90%",
                                        // border : "1px solid",
                                        margin: "auto",
                                        color: "Gray"
                                    }}>
                                        <h1>No Pending Data Found</h1>
                                    </div>

                                </>
                            }
                        </>

                    }

                    {sel_nav === "Claimed" &&
                        <>
                            {padding_data.map((user, i) => {
                                if (user.sub === "completed") {
                                    return (
                                        <div key={i} className='account-pending-main-cnt-01-sub-cnt-01'>
                                            <span className='account-pending-main-cnt-01-sub-cnt-01-sub-span-01'><span style={{ color: "white" }}>Claimed</span> reward of "<strong style={{ color: "white" }}>{user.type === "Money" && <span>₹</span>} {user.title}</strong>". </span><br />
                                            <span className='account-pending-main-cnt-01-sub-cnt-01-sub-span-02'>{user.Time}</span><br />
                                        </div>
                                    )
                                }
                            })}

                            {padding_data.length < 1 &&
                                <>
                                    <div style={{
                                        width: "90%",
                                        // border : "1px solid",
                                        margin: "auto",
                                        color: "Gray"
                                    }}>
                                        <h1>No Claimed Data Found</h1>
                                    </div>

                                </>
                            }
                        </>
                    }

                    <br/>





                    {/* <div className='cart_sohp_3_page_connectors'>

                        <div>
                            My Coins
                        </div>

                        <div>
                            Buy Coins
                        </div>

                        <div>
                            Status
                        </div>

                    </div> */}










                    {alert &&
                        <Popup data={data} val={alert} />
                    }

                </center>}
        </div>
    )
}

export default Cart
