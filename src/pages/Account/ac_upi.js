// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom';
// import Popup from '../popup';
// import api from '../api';
// import Loading from '../../loading';
// import { getFromDB, saveToDB } from '../../db';
// import FingerprintJS from '@fingerprintjs/fingerprintjs';

// const Ac_upi = () => {

//     // const location = useLocation;
//     // const queryParm = new URLSearchParams(location.search);
//     // const code = queryParm.get('code');

//     const [show1, setShow1] = useState(true)

//     const user = localStorage.getItem("user")
//     const [app, setApp] = useState('')
//     const [h_name, setH_Name] = useState([]);
//     const [bank, setBank] = useState('');
//     const [acc_no, setAcc_no] = useState([]);
//     const [ifsc, setIFSC] = useState('');

//     const [isdata, setIsData] = useState([]);
//     const [isBank, setIsBank] = useState(false);
//     const [update, setUpdate] = useState(false);
//     const [data, setData] = useState([])
//     const [alert, setAlert] = useState(false);
//     const [load, setLoad] = useState(true);
//     const [reward_data, setReward_Data] = useState([])


//     const [info, setInfo] = useState([])

//     const di = getFromDB("di")



//     useEffect(() => {
//         async function fetchData() {
//           const cached = await getFromDB('DB_Bank'); // ✅ await is important
      
//           if (cached) {
//             setIsData(true)
//             setInfo(cached)
//             if(cached.type === "UPI"){
//                 setIsBank(false)
//                 setLoad(false)
//             }else{
//                 setIsBank(true)
//                 setLoad(false)
//             }
//           } else {
//             setIsData(false)
//             console.log("🌐 Fetch from server...");
//             GetData()
//           }
//         }
      
//         fetchData();
//         get_reward();
//       }, []);


//     const get_reward = async () => {
//         const fp = await FingerprintJS.load();
//         const result = await fp.get();
//         const id = result.visitorId
//         const u_id = localStorage.getItem("user")
//         api.get(`http://192.168.31.133/get/singel/reward/data/by/${id}/${u_id}`)
//         .then(res=>{
//             if(res.data.data){
//                 console.log(res.data.data)
//                 setReward_Data(res.data.data)
//             }else{
//                 console.log("No Data Found")
//             }
//         }).catch(error =>{
//             console.log(error)
//         })
//     }


//     const GetData = () =>{
//         try{
//             setTimeout(()=>{
//                 api.get(`${"http://192.168.31.133"}/get/bank/account/data`)
//                 .then(res =>{
//                     if(res.data.data){
//                         setIsData(true)
//                         setInfo(res.data.data)
//                         saveToDB("DB_Bank" , res.data.data)
//                         const dat = res.data.data
//                         if(dat.type === "UPI"){
//                             setIsBank(false)
//                             setLoad(false)
//                         }else{
//                             setIsBank(true)
//                             setLoad(false)
//                         }
//                     }else if(res.data.Status === "No"){
//                         setIsData(false);
//                         setLoad(false)
//                     }else if(res.data.Logout === "OUT"){
//                         setLoad(false)
//                         localStorage.removeItem("ssid");
//                         window.location.reload()
//                     }else{
//                         setLoad(false)
//                         console.warn("Unexpected response structure:", res.data);
//                     }
//                 })
//                 .catch(error=>{
//                     setLoad(false)
//                     if (error.response) {
//                         console.error("API Error:", error.response.status, error.response.data);
//                     } else if (error.request) {
//                         console.error("No response from server. Please check your connection.");
//                     } else {
//                         console.error("Error occurred:", error.message);
//                     }
//                 })
//             },1000)
            
//         }catch(error){
//             setLoad(false)
//             console.log(error)
//         }
        

//     }

//     const UPIpost = (e) =>{
//         e.preventDefault()
//         setData('Adding a bank account via UPI is not allowed. We are working on it, so please add only a bank account manually.')
//         setAlert(true)
//         // e.preventDefault()
//         // try{

//         //     if(app !== ''){
//         //         api.post(`${"http://192.168.31.133"}/bank/upi/data/collect`,{user, ac_h_nme : h_name, bank_nme : "No", Acc_no : acc_no, ifsc : "No", app , type : "UPI"})
//         //         .then(res=>{
//         //             if(res.data.Status === "OK"){
//         //                 setData("Account Added")
//         //                 setAlert(true)
//         //                 GetData()
//         //             }else{
//         //                 setData("Something Went Wrong")
//         //                 setAlert(true)
//         //             }
//         //         }).catch(error=>{
//         //             if (error.response) {
//         //                 console.error("API Error:", error.response.status, error.response.data);
//         //             } else if (error.request) {
//         //                 console.error("No response from server. Please check your connection.");
//         //             } else {
//         //                 console.error("Error occurred:", error.message);
//         //             }
//         //         })
//         //     }else{
//         //         setData("All field are manditory")
//         //         setAlert(true)
//         //     }

//         // }catch(error){
//         //     console.log(error)
//         // }
        
        
//     }

//     const BankUp = (e) =>{
//         setAlert(false)
//         e.preventDefault()
//         try{
//             api.post(`${"http://192.168.31.133"}/bank/upi/data/collect`,{user, ac_h_nme : h_name, bank_nme : bank, Acc_no : acc_no, ifsc, app : "No" , type : "BANK"})
//             .then(res=>{
//                 if(res.data.Status === "OK"){
//                     setData("Account Added")
//                     setAlert(true)
//                     GetData()
//                 }else{
//                     setData("Something Went Wrong")
//                     setAlert(true)
//                 }
//             }).catch(error=>{
//                 if (error.response) {
//                     console.error("API Error:", error.response.status, error.response.data);
//                 } else if (error.request) {
//                     console.error("No response from server. Please check your connection.");
//                 } else {
//                     console.error("Error occurred:", error.message);
//                 }
//             })
//         }catch(error){
//             console.log(error)
//         }
        
//     }


//   return (
//     <div className='bank_UPI_main_cnt-01'>
//         {load ? <Loading /> : 
//       <center>
        
//         <h1 className='account-subb-part-01'>{info.type === "BANK" ? "User Bank Account" : "User UPI Account"}</h1>

//         {isdata === true &&
//         <>
//         {/* <h1>{info.type}</h1> */}
//         <div className={update ? "ac_upi-main-cnt-03" : 'ac_upi-main-cnt-02'}>
//             {isBank ?
//             <div className={update ? "ac_upi-main-cnt-02-sub-02" : "ac_upi-main-cnt-02-sub-01"}>
//                 {update ? 
//                 <div>
//                     <form>
//                         <input type='text' placeholder='Account Holder Name' /><br/>
//                         <input type='text' placeholder='Account Number' /><br/>
//                         <input type='text' placeholder='Bank Name' /><br/>
//                         <input type='text' placeholder='IFSC Code' /><br/>
//                         <button>update</button>

//                     </form>

//                 </div>
//                 :
//                 <div>
//                     {info.type === "BANK" &&
//                     <div className='upi_data_cnt'>
//                         <h2>Bank Account Added :</h2>
//                         <strong>Account Holder Name : <span>{info.ac_h_nme}</span></strong><br/>
//                         <strong>Account Number : <span>{info.Acc_no}</span></strong><br/>
//                         <strong>Bank Name : <span>{info.bank_nme}</span></strong><br/>
//                         <strong>IFSC Code : <span>{info.ifsc}</span></strong><br/>
//                     </div>
//                     }
//                 </div>
//                 }
                
//             </div>
//             :
//             <div className={update ? "ac_upi-main-cnt-02-sub-02" : "ac_upi-main-cnt-02-sub-01"}>
//                 {update ?
//                 <div>
//                     <form>
//                         <input type='text' placeholder='Account Holder Name' /><br/>
//                         <input type='text' placeholder='UPI ID' /><br/>
//                         <select onChange={e=>{setApp(e.target.value)}} >
//                             <option value="">Select Payments</option>
//                             <option value="phone pay">Phone Pay</option>
//                             <option value="google pay">Google Pay</option>
//                             <option value="paytm">Paytm</option>
//                         </select><br/>
//                         <button>update</button>

//                     </form>
//                 </div>
//                 :
//                 <div>
//                     {info.type === "UPI" &&
//                     <div className='upi_data_cnt'>
//                         <h2>UPI Account Added :</h2>
//                         <strong>Account Holder Name : <span>{info.ac_h_nme}</span></strong><br/>
//                         <strong>UPI ID : <span>{info.Acc_no}</span></strong><br/>
//                         <strong>App : <span>{info.app}</span></strong><br/>
//                     </div>}
                    
//                 </div>
//                 }
                
//             </div>
//             }
//         </div>
//         </>
        
        
//         }
        
//         {isdata === false && 
//         <div>
// {/* 
//             <div className='account-subb-part-strong-01'>
//                 <strong>
//                     Add any one Bank Account / UPI    
//                 </strong>
//             </div> */}


//             <div className='bank_nme_cnt-01'>
//                 <span onClick={()=>{setShow1(true)}}>Bank</span>
//                 <span onClick={()=>{setShow1(false)}} >UPI</span>
//             </div>

//             {show1 ?

//                 <div className='container_banks_in_put_01'>
//                     <h2>Bank</h2>
//                     <form onSubmit={BankUp}>
//                     <input className='inn_01' type='text' placeholder='Account Holder Name' onChange={e=>{setH_Name(e.target.value)}} required /><br/>
//                     <input className='inn_01' type='text' placeholder='Bank Name' onChange={e=>{setBank(e.target.value)}} required /><br/>
//                     <input className='inn_01' type='text' placeholder='Account No' onChange={e=>{setAcc_no(e.target.value)}} required /><br/>
//                     <input className='inn_01' type='text' placeholder='IFSC Code' onChange={e=>{setIFSC(e.target.value)}} required /><br/>
//                     <button className='sub_022' type='submit'>Add</button>
//                 </form>
//                 </div>

//                 :

//                 <div className='container_banks_in_put_01'>
//                     <h2>UPI</h2>
//                     <form onSubmit={UPIpost}>
//                     <input className='inn_01' type='text' placeholder='Account Holder Name' onChange={e=>{setH_Name(e.target.value)}} required /><br/>
//                     <input className='inn_01' type='text' placeholder='UPI ID/ Mobile No' onChange={e=>{setAcc_no(e.target.value)}} required /><br/>
//                     <select required className='inn_02' onChange={e=>{setApp(e.target.value)}} >
//                         <option value="">Select Payments</option>
//                         <option value="phone pay">Phone Pay</option>
//                         <option value="google pay">Google Pay</option>
//                         <option value="paytm">Paytm</option>
//                     </select><br/>
//                     <button className='sub_022' type='submit'>Add</button>
//                 </form>
//                 </div>

//             }




//             {/* <div className='ac_upi-main-cnt-01'>
//                 <form onSubmit={BankUp}>
//                     <input type='text' placeholder='Account Holder Name' onChange={e=>{setH_Name(e.target.value)}} required /><br/>
//                     <input type='text' placeholder='Bank Name' onChange={e=>{setBank(e.target.value)}} required /><br/>
//                     <input type='text' placeholder='Account No' onChange={e=>{setAcc_no(e.target.value)}} required /><br/>
//                     <input type='text' placeholder='IFSC Code' onChange={e=>{setIFSC(e.target.value)}} required /><br/>
//                     <button type='submit'>post</button>
//                 </form>
//             </div>
//             <br/>
//             <br/>



//             <div className='ac_upi-main-cnt-01'>
//                 <form onSubmit={UPIpost}>
//                     <input type='text' placeholder='Account Holder Name' onChange={e=>{setH_Name(e.target.value)}} required /><br/>
//                     <input type='text' placeholder='UPI ID/ Mobile No' onChange={e=>{setAcc_no(e.target.value)}} required /><br/>
//                     <select onChange={e=>{setApp(e.target.value)}} >
//                         <option value="">Select Payments</option>
//                         <option value="phone pay">Phone Pay</option>
//                         <option value="google pay">Google Pay</option>
//                         <option value="paytm">Paytm</option>
//                     </select><br/>
//                     <button type='submit'>post</button>
//                 </form>
//             </div> */}

//         </div>}

//         <br/>

//         <br/>


//         <h2 className='reward_h2_clain_m' >Reward Claim Requested</h2>
//         <div className='rward_cnt_01'>

            

//                 {reward_data._id &&
//                     <div className='rward_cnt_01_sub_cop'>
//                         <h2>₹ {reward_data.rupee}</h2>
//                         <div className='rward_cnt_01_sub_cop_sub'>
//                             Waiting for Funds.
//                         </div>
//                     </div>
//                 }
            

//         </div>

        



//       </center>}
//       <div style={{height:"50px"}}>
//       </div>
//       {alert &&
//       <Popup data={data} val={alert} />
//       }
//       </div>
//   )
// }

// export default Ac_upi















// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';
// // import { useLocation } from 'react-router-dom';
// // import Popup from '../popup';
// // import api from '../api';
// // import Loading from '../../loading';
// // import { getFromDB, saveToDB } from '../../db';
// // import FingerprintJS from '@fingerprintjs/fingerprintjs';

// // const Ac_upi = () => {
// //   const [show1, setShow1] = useState(true);
// //   const user = localStorage.getItem('user');
// //   const [app, setApp] = useState('');
// //   const [h_name, setH_Name] = useState('');
// //   const [bank, setBank] = useState('');
// //   const [acc_no, setAcc_no] = useState('');
// //   const [ifsc, setIFSC] = useState('');

// //   const [isdata, setIsData] = useState(false);
// //   const [isBank, setIsBank] = useState(true);
// //   const [update, setUpdate] = useState(false);
// //   const [data, setData] = useState([]);
// //   const [alert, setAlert] = useState(false);
// //   const [load, setLoad] = useState(true);
// //   const [reward_data, setReward_Data] = useState([]);
// //   const [info, setInfo] = useState({});

// //   const di = getFromDB('di');

// //   useEffect(() => {
// //     async function fetchData() {
// //       const cached = await getFromDB('DB_Bank');
// //       if (cached) {
// //         setIsData(true);
// //         setInfo(cached);
// //         if (cached.type === 'UPI') {
// //           setIsBank(false);
// //           setLoad(false);
// //         } else {
// //           setIsBank(true);
// //           setLoad(false);
// //         }
// //       } else {
// //         setIsData(false);
// //         console.log('🌐 Fetch from server...');
// //         GetData();
// //       }
// //     }
// //     fetchData();
// //     get_reward();
// //   }, []);

// //   const get_reward = async () => {
// //     const fp = await FingerprintJS.load();
// //     const result = await fp.get();
// //     const id = result.visitorId;
// //     const u_id = localStorage.getItem('user');
// //     api
// //       .get(`http://192.168.31.133/get/singel/reward/data/by/${id}/${u_id}`)
// //       .then((res) => {
// //         if (res.data.data) {
// //           console.log(res.data.data);
// //           setReward_Data(res.data.data);
// //         } else {
// //           console.log('No Data Found');
// //         }
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });
// //   };

// //   const GetData = () => {
// //     try {
// //       setTimeout(() => {
// //         api
// //           .get(`${'http://192.168.31.133'}/get/bank/account/data`)
// //           .then((res) => {
// //             if (res.data.data) {
// //               setIsData(true);
// //               setInfo(res.data.data);
// //               saveToDB('DB_Bank', res.data.data);
// //               const dat = res.data.data;
// //               if (dat.type === 'UPI') {
// //                 setIsBank(false);
// //                 setLoad(false);
// //               } else {
// //                 setIsBank(true);
// //                 setLoad(false);
// //               }
// //             } else if (res.data.Status === 'No') {
// //               setIsData(false);
// //               setLoad(false);
// //             } else if (res.data.Logout === 'OUT') {
// //               setLoad(false);
// //               localStorage.removeItem('ssid');
// //               window.location.reload();
// //             } else {
// //               setLoad(false);
// //               console.warn('Unexpected response structure:', res.data);
// //             }
// //           })
// //           .catch((error) => {
// //             setLoad(false);
// //             if (error.response) {
// //               console.error('API Error:', error.response.status, error.response.data);
// //             } else if (error.request) {
// //               console.error('No response from server. Please check your connection.');
// //             } else {
// //               console.error('Error occurred:', error.message);
// //             }
// //           });
// //       }, 1000);
// //     } catch (error) {
// //       setLoad(false);
// //       console.log(error);
// //     }
// //   };

// //   const UPIpost = (e) => {
// //     e.preventDefault();
// //     setData('Adding a bank account via UPI is not allowed. We are working on it, so please add only a bank account manually.');
// //     setAlert(true);
// //   };

// //   const BankUp = (e) => {
// //     setAlert(false);
// //     e.preventDefault();
// //     try {
// //       api
// //         .post(`${'http://192.168.31.133'}/bank/upi/data/collect`, {
// //           user,
// //           ac_h_nme: h_name,
// //           bank_nme: bank,
// //           Acc_no: acc_no,
// //           ifsc,
// //           app: 'No',
// //           type: 'BANK',
// //         })
// //         .then((res) => {
// //           if (res.data.Status === 'OK') {
// //             setData('Account Added');
// //             setAlert(true);
// //             GetData();
// //           } else {
// //             setData('Something Went Wrong');
// //             setAlert(true);
// //           }
// //         })
// //         .catch((error) => {
// //           if (error.response) {
// //             console.error('API Error:', error.response.status, error.response.data);
// //           } else if (error.request) {
// //             console.error('No response from server. Please check your connection.');
// //           } else {
// //             console.error('Error occurred:', error.message);
// //           }
// //         });
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   return (
// //     <div className="ac-upi-wrapper">
// //       {load ? (
// //         <Loading />
// //       ) : (
// //         <div className="ac-upi-container">
// //           <div className="header-section">
// //             <h1 className="page-title">💳 Bank / UPI</h1>
// //             <div className="header-underline"></div>
// //           </div>

// //           {isdata === true && (
// //             <div className={`card ${update ? 'card-update' : 'card-view'}`}>
// //               <div className="card-header">
// //                 <span className="card-badge">{isBank ? '🏦 Bank' : '📱 UPI'}</span>
// //                 <button className="btn-toggle" onClick={() => setUpdate(!update)}>
// //                   {update ? 'Cancel' : '✏️ Update'}
// //                 </button>
// //               </div>
// //               <div className="card-body">
// //                 {isBank ? (
// //                   <div className="detail-view">
// //                     {update ? (
// //                       <form className="update-form">
// //                         <input type="text" placeholder="Account Holder Name" />
// //                         <input type="text" placeholder="Account Number" />
// //                         <input type="text" placeholder="Bank Name" />
// //                         <input type="text" placeholder="IFSC Code" />
// //                         <button className="btn-primary">Update</button>
// //                       </form>
// //                     ) : (
// //                       <div className="info-grid">
// //                         <div className="info-item">
// //                           <span className="label">Account Holder</span>
// //                           <span className="value">{info.ac_h_nme}</span>
// //                         </div>
// //                         <div className="info-item">
// //                           <span className="label">Account Number</span>
// //                           <span className="value">{info.Acc_no}</span>
// //                         </div>
// //                         <div className="info-item">
// //                           <span className="label">Bank Name</span>
// //                           <span className="value">{info.bank_nme}</span>
// //                         </div>
// //                         <div className="info-item">
// //                           <span className="label">IFSC Code</span>
// //                           <span className="value">{info.ifsc}</span>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <div className="detail-view">
// //                     {update ? (
// //                       <form className="update-form">
// //                         <input type="text" placeholder="Account Holder Name" />
// //                         <input type="text" placeholder="UPI ID" />
// //                         <select>
// //                           <option value="">Select Payments</option>
// //                           <option value="phone pay">Phone Pay</option>
// //                           <option value="google pay">Google Pay</option>
// //                           <option value="paytm">Paytm</option>
// //                         </select>
// //                         <button className="btn-primary">Update</button>
// //                       </form>
// //                     ) : (
// //                       <div className="info-grid">
// //                         <div className="info-item">
// //                           <span className="label">Account Holder</span>
// //                           <span className="value">{info.ac_h_nme}</span>
// //                         </div>
// //                         <div className="info-item">
// //                           <span className="label">UPI ID</span>
// //                           <span className="value">{info.Acc_no}</span>
// //                         </div>
// //                         <div className="info-item">
// //                           <span className="label">App</span>
// //                           <span className="value">{info.app}</span>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           {isdata === false && (
// //             <div className="add-section">
// //               <div className="toggle-tabs">
// //                 <button
// //                   className={`tab-btn ${show1 ? 'active' : ''}`}
// //                   onClick={() => setShow1(true)}
// //                 >
// //                   🏦 Bank
// //                 </button>
// //                 <button
// //                   className={`tab-btn ${!show1 ? 'active' : ''}`}
// //                   onClick={() => setShow1(false)}
// //                 >
// //                   📱 UPI
// //                 </button>
// //               </div>

// //               <div className="form-card">
// //                 {show1 ? (
// //                   <div className="form-content">
// //                     <h2>Add Bank Account</h2>
// //                     <form onSubmit={BankUp}>
// //                       <input
// //                         className="form-input"
// //                         type="text"
// //                         placeholder="Account Holder Name"
// //                         onChange={(e) => setH_Name(e.target.value)}
// //                         required
// //                       />
// //                       <input
// //                         className="form-input"
// //                         type="text"
// //                         placeholder="Bank Name"
// //                         onChange={(e) => setBank(e.target.value)}
// //                         required
// //                       />
// //                       <input
// //                         className="form-input"
// //                         type="text"
// //                         placeholder="Account Number"
// //                         onChange={(e) => setAcc_no(e.target.value)}
// //                         required
// //                       />
// //                       <input
// //                         className="form-input"
// //                         type="text"
// //                         placeholder="IFSC Code"
// //                         onChange={(e) => setIFSC(e.target.value)}
// //                         required
// //                       />
// //                       <button className="btn-submit" type="submit">
// //                         Add Account
// //                       </button>
// //                     </form>
// //                   </div>
// //                 ) : (
// //                   <div className="form-content">
// //                     <h2>Add UPI</h2>
// //                     <form onSubmit={UPIpost}>
// //                       <input
// //                         className="form-input"
// //                         type="text"
// //                         placeholder="Account Holder Name"
// //                         onChange={(e) => setH_Name(e.target.value)}
// //                         required
// //                       />
// //                       <input
// //                         className="form-input"
// //                         type="text"
// //                         placeholder="UPI ID / Mobile No"
// //                         onChange={(e) => setAcc_no(e.target.value)}
// //                         required
// //                       />
// //                       <select
// //                         className="form-select"
// //                         required
// //                         onChange={(e) => setApp(e.target.value)}
// //                       >
// //                         <option value="">Select Payments</option>
// //                         <option value="phone pay">Phone Pay</option>
// //                         <option value="google pay">Google Pay</option>
// //                         <option value="paytm">Paytm</option>
// //                       </select>
// //                       <button className="btn-submit" type="submit">
// //                         Add UPI
// //                       </button>
// //                     </form>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           <div className="reward-section">
// //             <h2 className="reward-title">🎁 Reward Claim Requested</h2>
// //             {reward_data._id && (
// //               <div className="reward-card">
// //                 <div className="reward-amount">₹ {reward_data.rupee}</div>
// //                 <div className="reward-status">⏳ Waiting for Funds.</div>
// //               </div>
// //             )}
// //           </div>

// //           <div className="footer-spacer"></div>
// //         </div>
// //       )}

// //       {alert && <Popup data={data} val={alert} />}

// //       <style>{`
// //         /* ----- RESET & BASE ----- */
// //         .ac-upi-wrapper {
// //           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //           background: #f4f7fc;
// //           min-height: 100vh;
// //           padding: 2rem 1.5rem;
// //           display: flex;
// //           justify-content: center;
// //           align-items: flex-start;
// //           box-sizing: border-box;
// //         }

// //         .ac-upi-container {
// //           max-width: 820px;
// //           width: 100%;
// //           margin: 0 auto;
// //         }

// //         /* ----- HEADER ----- */
// //         .header-section {
// //           text-align: center;
// //           margin-bottom: 2rem;
// //         }

// //         .page-title {
// //           font-size: 2.2rem;
// //           font-weight: 700;
// //           color: #1e293b;
// //           letter-spacing: -0.5px;
// //           margin: 0;
// //         }

// //         .header-underline {
// //           width: 60px;
// //           height: 4px;
// //           background: linear-gradient(135deg, #2563eb, #7c3aed);
// //           margin: 0.5rem auto 0;
// //           border-radius: 4px;
// //         }

// //         /* ----- CARD (view / update) ----- */
// //         .card {
// //           background: white;
// //           border-radius: 20px;
// //           box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
// //           overflow: hidden;
// //           margin-bottom: 2rem;
// //           transition: all 0.2s ease;
// //         }

// //         .card-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           padding: 1.2rem 1.8rem;
// //           background: #f8fafc;
// //           border-bottom: 1px solid #e9edf2;
// //           flex-wrap: wrap;
// //           gap: 0.6rem;
// //         }

// //         .card-badge {
// //           font-weight: 600;
// //           font-size: 1rem;
// //           color: #1e293b;
// //           background: #e2e8f0;
// //           padding: 0.3rem 1rem;
// //           border-radius: 30px;
// //         }

// //         .btn-toggle {
// //           background: transparent;
// //           border: 1px solid #cbd5e1;
// //           color: #334155;
// //           padding: 0.4rem 1.2rem;
// //           border-radius: 30px;
// //           font-weight: 500;
// //           font-size: 0.85rem;
// //           cursor: pointer;
// //           transition: 0.15s;
// //         }

// //         .btn-toggle:hover {
// //           background: #f1f5f9;
// //           border-color: #94a3b8;
// //         }

// //         .card-body {
// //           padding: 1.8rem;
// //         }

// //         /* ----- INFO GRID (view mode) ----- */
// //         .info-grid {
// //           display: grid;
// //           grid-template-columns: 1fr 1fr;
// //           gap: 1.2rem 1.8rem;
// //         }

// //         .info-item {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 0.2rem;
// //         }

// //         .info-item .label {
// //           font-size: 0.75rem;
// //           text-transform: uppercase;
// //           letter-spacing: 0.4px;
// //           color: #64748b;
// //           font-weight: 600;
// //         }

// //         .info-item .value {
// //           font-size: 1rem;
// //           font-weight: 500;
// //           color: #0f172a;
// //           background: #f1f5f9;
// //           padding: 0.4rem 0.8rem;
// //           border-radius: 10px;
// //           word-break: break-all;
// //         }

// //         /* ----- UPDATE FORM (inside card) ----- */
// //         .update-form {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 1rem;
// //         }

// //         .update-form input,
// //         .update-form select {
// //           padding: 0.7rem 1rem;
// //           border: 1px solid #d1d9e6;
// //           border-radius: 12px;
// //           font-size: 0.95rem;
// //           background: #fafcff;
// //           transition: 0.15s;
// //           width: 100%;
// //           box-sizing: border-box;
// //         }

// //         .update-form input:focus,
// //         .update-form select:focus {
// //           border-color: #2563eb;
// //           outline: none;
// //           box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
// //         }

// //         .btn-primary {
// //           background: #2563eb;
// //           color: white;
// //           border: none;
// //           padding: 0.8rem;
// //           border-radius: 30px;
// //           font-weight: 600;
// //           font-size: 1rem;
// //           cursor: pointer;
// //           transition: 0.15s;
// //           margin-top: 0.3rem;
// //           width: 100%;
// //         }

// //         .btn-primary:hover {
// //           background: #1d4ed8;
// //           transform: scale(1.01);
// //         }

// //         /* ----- ADD SECTION (when no data) ----- */
// //         .add-section {
// //           background: white;
// //           border-radius: 20px;
// //           box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
// //           padding: 1.8rem 1.8rem 2.2rem;
// //           margin-bottom: 2rem;
// //         }

// //         .toggle-tabs {
// //           display: flex;
// //           gap: 0.5rem;
// //           background: #f1f5f9;
// //           padding: 0.4rem;
// //           border-radius: 40px;
// //           margin-bottom: 2rem;
// //         }

// //         .tab-btn {
// //           flex: 1;
// //           border: none;
// //           background: transparent;
// //           padding: 0.6rem 1rem;
// //           border-radius: 30px;
// //           font-weight: 600;
// //           font-size: 0.95rem;
// //           color: #475569;
// //           cursor: pointer;
// //           transition: 0.15s;
// //           text-align: center;
// //         }

// //         .tab-btn.active {
// //           background: white;
// //           color: #1e293b;
// //           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
// //         }

// //         .tab-btn:hover:not(.active) {
// //           background: #e2e8f0;
// //         }

// //         .form-content h2 {
// //           font-size: 1.4rem;
// //           font-weight: 600;
// //           color: #0f172a;
// //           margin-top: 0;
// //           margin-bottom: 1.5rem;
// //         }

// //         .form-input,
// //         .form-select {
// //           width: 100%;
// //           padding: 0.8rem 1rem;
// //           margin-bottom: 1.2rem;
// //           border: 1px solid #d1d9e6;
// //           border-radius: 14px;
// //           font-size: 0.95rem;
// //           background: #fafcff;
// //           transition: 0.15s;
// //           box-sizing: border-box;
// //         }

// //         .form-input:focus,
// //         .form-select:focus {
// //           border-color: #2563eb;
// //           outline: none;
// //           box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
// //         }

// //         .btn-submit {
// //           width: 100%;
// //           background: linear-gradient(135deg, #2563eb, #7c3aed);
// //           color: white;
// //           border: none;
// //           padding: 0.9rem;
// //           border-radius: 40px;
// //           font-weight: 700;
// //           font-size: 1.05rem;
// //           cursor: pointer;
// //           transition: 0.2s;
// //           margin-top: 0.3rem;
// //           letter-spacing: 0.3px;
// //         }

// //         .btn-submit:hover {
// //           transform: scale(1.02);
// //           box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
// //         }

// //         /* ----- REWARD SECTION ----- */
// //         .reward-section {
// //           background: white;
// //           border-radius: 20px;
// //           padding: 1.5rem 1.8rem;
// //           box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
// //           margin-top: 1.5rem;
// //         }

// //         .reward-title {
// //           font-size: 1.2rem;
// //           font-weight: 600;
// //           color: #0f172a;
// //           margin-top: 0;
// //           margin-bottom: 1.2rem;
// //         }

// //         .reward-card {
// //           background: #f8fafc;
// //           border-radius: 16px;
// //           padding: 1.2rem 1.5rem;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           flex-wrap: wrap;
// //           gap: 0.8rem;
// //           border-left: 5px solid #f59e0b;
// //         }

// //         .reward-amount {
// //           font-size: 1.8rem;
// //           font-weight: 700;
// //           color: #0f172a;
// //         }

// //         .reward-status {
// //           background: #fef3c7;
// //           color: #92400e;
// //           padding: 0.3rem 1.2rem;
// //           border-radius: 30px;
// //           font-weight: 500;
// //           font-size: 0.9rem;
// //         }

// //         .footer-spacer {
// //           height: 50px;
// //         }

// //         /* ============================================
// //            RESPONSIVE: TABLETS & SMALL LAPTOPS
// //            ============================================ */
// //         @media (max-width: 768px) {
// //           .ac-upi-wrapper {
// //             padding: 1.5rem 1rem;
// //           }

// //           .ac-upi-container {
// //             max-width: 100%;
// //           }

// //           .page-title {
// //             font-size: 1.9rem;
// //           }

// //           .card-header {
// //             padding: 1rem 1.2rem;
// //           }

// //           .card-body {
// //             padding: 1.5rem;
// //           }

// //           .info-grid {
// //             grid-template-columns: 1fr 1fr;
// //             gap: 1rem;
// //           }

// //           .add-section {
// //             padding: 1.5rem 1.2rem;
// //           }

// //           .reward-section {
// //             padding: 1.2rem 1.2rem;
// //           }
// //         }

// //         /* ============================================
// //            RESPONSIVE: MOBILE (≤ 550px)
// //            ============================================ */
// //         @media (max-width: 550px) {
// //           .ac-upi-wrapper {
// //             padding: 0.8rem 0.6rem;
// //           }

// //           .page-title {
// //             font-size: 1.6rem;
// //           }

// //           .header-underline {
// //             width: 40px;
// //           }

// //           /* card */
// //           .card-header {
// //             flex-direction: column;
// //             align-items: stretch;
// //             text-align: center;
// //             gap: 0.5rem;
// //             padding: 0.8rem 1rem;
// //           }

// //           .card-badge {
// //             align-self: center;
// //           }

// //           .btn-toggle {
// //             width: 100%;
// //             text-align: center;
// //           }

// //           .card-body {
// //             padding: 1rem;
// //           }

// //           .info-grid {
// //             grid-template-columns: 1fr;
// //             gap: 0.8rem;
// //           }

// //           .info-item .value {
// //             font-size: 0.95rem;
// //             padding: 0.3rem 0.7rem;
// //           }

// //           /* add section */
// //           .add-section {
// //             padding: 1rem 0.8rem 1.5rem;
// //             border-radius: 16px;
// //           }

// //           .toggle-tabs {
// //             gap: 0.3rem;
// //             padding: 0.3rem;
// //           }

// //           .tab-btn {
// //             font-size: 0.85rem;
// //             padding: 0.4rem 0.6rem;
// //           }

// //           .form-content h2 {
// //             font-size: 1.2rem;
// //             margin-bottom: 1rem;
// //           }

// //           .form-input,
// //           .form-select {
// //             padding: 0.7rem 0.9rem;
// //             font-size: 0.9rem;
// //             margin-bottom: 0.9rem;
// //           }

// //           .btn-submit {
// //             padding: 0.75rem;
// //             font-size: 0.95rem;
// //           }

// //           /* reward */
// //           .reward-section {
// //             padding: 1rem;
// //             border-radius: 16px;
// //           }

// //           .reward-title {
// //             font-size: 1rem;
// //           }

// //           .reward-card {
// //             flex-direction: column;
// //             align-items: flex-start;
// //             padding: 1rem;
// //             gap: 0.5rem;
// //           }

// //           .reward-amount {
// //             font-size: 1.4rem;
// //           }

// //           .reward-status {
// //             font-size: 0.8rem;
// //             padding: 0.2rem 0.8rem;
// //           }

// //           .footer-spacer {
// //             height: 30px;
// //           }

// //           /* update form inside card */
// //           .update-form input,
// //           .update-form select {
// //             padding: 0.6rem 0.9rem;
// //             font-size: 0.9rem;
// //           }

// //           .btn-primary {
// //             padding: 0.7rem; 
// //             font-size: 0.95rem;
// //           }
// //         }

// //         /* ============================================
// //            EXTRA SMALL (≤ 380px)
// //            ============================================ */
// //         @media (max-width: 380px) {
// //           .page-title {
// //             font-size: 1.3rem;
// //           }

// //           .tab-btn {
// //             font-size: 0.75rem;
// //             padding: 0.3rem 0.4rem;
// //           }

// //           .form-content h2 {
// //             font-size: 1rem;
// //           }

// //           .form-input,
// //           .form-select {
// //             padding: 0.6rem 0.7rem;
// //             font-size: 0.8rem;
// //           }

// //           .btn-submit {
// //             padding: 0.65rem;
// //             font-size: 0.85rem;
// //           }

// //           .reward-amount {
// //             font-size: 1.2rem;
// //           }
// //         }

// //         /* animations */
// //         .card,
// //         .add-section,
// //         .reward-section {
// //           animation: fadeUp 0.35s ease;
// //         }

// //         @keyframes fadeUp {
// //           0% {
// //             opacity: 0;
// //             transform: translateY(12px);
// //           }
// //           100% {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Ac_upi;























import React, { useEffect } from 'react'
import api from '../api'

const Ac_upi = () => {

  function get_bank_info() {
    api.get(`${process.env.REACT_APP_API_URL}/get/bank/account/data`)
    .then(res =>{
      console.log(res.data)
    })
  }

  useEffect(()=>{
    get_bank_info()
  },[])


  return (
    <div className='ac_bnk_body_01'>

      <h1 className='ac_bnk_body_01_h1_01'>Payment Account</h1>

      <br/>

      <div className='ac_upi_main_01'>
        <h1 className='ac_upi_main_01_h1_01' >State Bank of India</h1>
        <p className='ac_upi_main_01_p_1' >1931 XXXX XXXX 1948</p>

        <div className='ac_upi_main_01_sub_cnt_01'>
          <p style={{
          }} >SBI0001931</p>
          <p style={{
            fontSize : "4rem"
          }} >staWro</p>
          
        </div>

        <p className='powerd_by_avi' >Powered by <strong>AVI</strong></p>

      </div>

      <br/>

      <div className='ac_upi_main_02'>

      </div>


    </div>
  )
}

export default Ac_upi
