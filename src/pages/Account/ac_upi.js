import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Popup from '../popup';
import api from '../api';
import Loading from '../../loading';
import { getFromDB, saveToDB } from '../../db';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const Ac_upi = () => {

    // const location = useLocation;
    // const queryParm = new URLSearchParams(location.search);
    // const code = queryParm.get('code');

    const [show1, setShow1] = useState(true)

    const user = localStorage.getItem("user")
    const [app, setApp] = useState('')
    const [h_name, setH_Name] = useState([]);
    const [bank, setBank] = useState('');
    const [acc_no, setAcc_no] = useState([]);
    const [ifsc, setIFSC] = useState('');

    const [isdata, setIsData] = useState([]);
    const [isBank, setIsBank] = useState(false);
    const [update, setUpdate] = useState(false);
    const [data, setData] = useState([])
    const [alert, setAlert] = useState(false);
    const [load, setLoad] = useState(true);
    const [reward_data, setReward_Data] = useState([])


    const [info, setInfo] = useState([])

    const di = getFromDB("di")



    useEffect(() => {
        async function fetchData() {
          const cached = await getFromDB('DB_Bank'); // ✅ await is important
      
          if (cached) {
            setIsData(true)
            setInfo(cached)
            if(cached.type === "UPI"){
                setIsBank(false)
                setLoad(false)
            }else{
                setIsBank(true)
                setLoad(false)
            }
          } else {
            setIsData(false)
            console.log("🌐 Fetch from server...");
            GetData()
          }
        }
      
        fetchData();
        get_reward();
      }, []);


    const get_reward = async () => {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const id = result.visitorId
        const u_id = localStorage.getItem("user")
        api.get(`http://localhost/get/singel/reward/data/by/${id}/${u_id}`)
        .then(res=>{
            if(res.data.data){
                console.log(res.data.data)
                setReward_Data(res.data.data)
            }else{
                console.log("No Data Found")
            }
        }).catch(error =>{
            console.log(error)
        })
    }


    const GetData = () =>{
        try{
            setTimeout(()=>{
                api.get(`${"http://localhost"}/get/bank/account/data`)
                .then(res =>{
                    if(res.data.data){
                        setIsData(true)
                        setInfo(res.data.data)
                        saveToDB("DB_Bank" , res.data.data)
                        const dat = res.data.data
                        if(dat.type === "UPI"){
                            setIsBank(false)
                            setLoad(false)
                        }else{
                            setIsBank(true)
                            setLoad(false)
                        }
                    }else if(res.data.Status === "No"){
                        setIsData(false);
                        setLoad(false)
                    }else if(res.data.Logout === "OUT"){
                        setLoad(false)
                        localStorage.removeItem("ssid");
                        window.location.reload()
                    }else{
                        setLoad(false)
                        console.warn("Unexpected response structure:", res.data);
                    }
                })
                .catch(error=>{
                    setLoad(false)
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
            setLoad(false)
            console.log(error)
        }
        

    }

    const UPIpost = (e) =>{
        e.preventDefault()
        setData('Adding a bank account via UPI is not allowed. We are working on it, so please add only a bank account manually.')
        setAlert(true)
        // e.preventDefault()
        // try{

        //     if(app !== ''){
        //         api.post(`${"http://localhost"}/bank/upi/data/collect`,{user, ac_h_nme : h_name, bank_nme : "No", Acc_no : acc_no, ifsc : "No", app , type : "UPI"})
        //         .then(res=>{
        //             if(res.data.Status === "OK"){
        //                 setData("Account Added")
        //                 setAlert(true)
        //                 GetData()
        //             }else{
        //                 setData("Something Went Wrong")
        //                 setAlert(true)
        //             }
        //         }).catch(error=>{
        //             if (error.response) {
        //                 console.error("API Error:", error.response.status, error.response.data);
        //             } else if (error.request) {
        //                 console.error("No response from server. Please check your connection.");
        //             } else {
        //                 console.error("Error occurred:", error.message);
        //             }
        //         })
        //     }else{
        //         setData("All field are manditory")
        //         setAlert(true)
        //     }

        // }catch(error){
        //     console.log(error)
        // }
        
        
    }

    const BankUp = (e) =>{
        setAlert(false)
        e.preventDefault()
        try{
            api.post(`${"http://localhost"}/bank/upi/data/collect`,{user, ac_h_nme : h_name, bank_nme : bank, Acc_no : acc_no, ifsc, app : "No" , type : "BANK"})
            .then(res=>{
                if(res.data.Status === "OK"){
                    setData("Account Added")
                    setAlert(true)
                    GetData()
                }else{
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
        {load ? <Loading /> : 
      <center>
        
        <h1 className='account-subb-part-01'>Bank / UPI</h1>

        {isdata === true &&
        <div className={update ? "ac_upi-main-cnt-03" : 'ac_upi-main-cnt-02'}>
            {isBank ?
            <div className={update ? "ac_upi-main-cnt-02-sub-02" : "ac_upi-main-cnt-02-sub-01"}>
                {update ? 
                <div>
                    <form>
                        <input type='text' placeholder='Account Holder Name' /><br/>
                        <input type='text' placeholder='Account Number' /><br/>
                        <input type='text' placeholder='Bank Name' /><br/>
                        <input type='text' placeholder='IFSC Code' /><br/>
                        <button>update</button>

                    </form>

                </div>
                :
                <div>
                    {info.type === "BANK" &&
                    <div className='upi_data_cnt'>
                        <h2>Bank Account Added :</h2>
                        <strong>Account Holder Name : <span>{info.ac_h_nme}</span></strong><br/>
                        <strong>Account Number : <span>{info.Acc_no}</span></strong><br/>
                        <strong>Bank Name : <span>{info.bank_nme}</span></strong><br/>
                        <strong>IFSC Code : <span>{info.ifsc}</span></strong><br/>
                    </div>
                    }
                </div>
                }
                
            </div>
            :
            <div className={update ? "ac_upi-main-cnt-02-sub-02" : "ac_upi-main-cnt-02-sub-01"}>
                {update ?
                <div>
                    <form>
                        <input type='text' placeholder='Account Holder Name' /><br/>
                        <input type='text' placeholder='UPI ID' /><br/>
                        <select onChange={e=>{setApp(e.target.value)}} >
                            <option value="">Select Payments</option>
                            <option value="phone pay">Phone Pay</option>
                            <option value="google pay">Google Pay</option>
                            <option value="paytm">Paytm</option>
                        </select><br/>
                        <button>update</button>

                    </form>
                </div>
                :
                <div>
                    {info.type === "UPI" &&
                    <div className='upi_data_cnt'>
                        <h2>UPI Account Added :</h2>
                        <strong>Account Holder Name : <span>{info.ac_h_nme}</span></strong><br/>
                        <strong>UPI ID : <span>{info.Acc_no}</span></strong><br/>
                        <strong>App : <span>{info.app}</span></strong><br/>
                    </div>}
                    
                </div>
                }
                
            </div>
            }
        </div> }
        
        {isdata === false && 
        <div>
{/* 
            <div className='account-subb-part-strong-01'>
                <strong>
                    Add any one Bank Account / UPI    
                </strong>
            </div> */}


            <div className='bank_nme_cnt-01'>
                <span onClick={()=>{setShow1(true)}}>Bank</span>
                <span onClick={()=>{setShow1(false)}} >UPI</span>
            </div>

            {show1 ?

                <div className='container_banks_in_put_01'>
                    <h2>Bank</h2>
                    <form onSubmit={BankUp}>
                    <input className='inn_01' type='text' placeholder='Account Holder Name' onChange={e=>{setH_Name(e.target.value)}} required /><br/>
                    <input className='inn_01' type='text' placeholder='Bank Name' onChange={e=>{setBank(e.target.value)}} required /><br/>
                    <input className='inn_01' type='text' placeholder='Account No' onChange={e=>{setAcc_no(e.target.value)}} required /><br/>
                    <input className='inn_01' type='text' placeholder='IFSC Code' onChange={e=>{setIFSC(e.target.value)}} required /><br/>
                    <button className='sub_022' type='submit'>Add</button>
                </form>
                </div>

                :

                <div className='container_banks_in_put_01'>
                    <h2>UPI</h2>
                    <form onSubmit={UPIpost}>
                    <input className='inn_01' type='text' placeholder='Account Holder Name' onChange={e=>{setH_Name(e.target.value)}} required /><br/>
                    <input className='inn_01' type='text' placeholder='UPI ID/ Mobile No' onChange={e=>{setAcc_no(e.target.value)}} required /><br/>
                    <select required className='inn_02' onChange={e=>{setApp(e.target.value)}} >
                        <option value="">Select Payments</option>
                        <option value="phone pay">Phone Pay</option>
                        <option value="google pay">Google Pay</option>
                        <option value="paytm">Paytm</option>
                    </select><br/>
                    <button className='sub_022' type='submit'>Add</button>
                </form>
                </div>

            }




            {/* <div className='ac_upi-main-cnt-01'>
                <form onSubmit={BankUp}>
                    <input type='text' placeholder='Account Holder Name' onChange={e=>{setH_Name(e.target.value)}} required /><br/>
                    <input type='text' placeholder='Bank Name' onChange={e=>{setBank(e.target.value)}} required /><br/>
                    <input type='text' placeholder='Account No' onChange={e=>{setAcc_no(e.target.value)}} required /><br/>
                    <input type='text' placeholder='IFSC Code' onChange={e=>{setIFSC(e.target.value)}} required /><br/>
                    <button type='submit'>post</button>
                </form>
            </div>
            <br/>
            <br/>



            <div className='ac_upi-main-cnt-01'>
                <form onSubmit={UPIpost}>
                    <input type='text' placeholder='Account Holder Name' onChange={e=>{setH_Name(e.target.value)}} required /><br/>
                    <input type='text' placeholder='UPI ID/ Mobile No' onChange={e=>{setAcc_no(e.target.value)}} required /><br/>
                    <select onChange={e=>{setApp(e.target.value)}} >
                        <option value="">Select Payments</option>
                        <option value="phone pay">Phone Pay</option>
                        <option value="google pay">Google Pay</option>
                        <option value="paytm">Paytm</option>
                    </select><br/>
                    <button type='submit'>post</button>
                </form>
            </div> */}

        </div>}

        <br/>

        <br/>


        <h2 className='reward_h2_clain_m' >Reward Claim Requested</h2>
        <div className='rward_cnt_01'>

            

                {reward_data._id &&
                    <div className='rward_cnt_01_sub_cop'>
                        <h2>₹ {reward_data.rupee}</h2>
                        <div className='rward_cnt_01_sub_cop_sub'>
                            Waiting for Funds.
                        </div>
                    </div>
                }
            

        </div>

        



      </center>}
      <div style={{height:"50px"}}>
      </div>
      {alert &&
      <Popup data={data} val={alert} />
      }
      </div>
  )
}

export default Ac_upi
