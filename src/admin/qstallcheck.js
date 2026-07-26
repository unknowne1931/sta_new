import React, { useEffect, useState } from 'react';
import apiAdmin from '../pages/adminapi';
import Naviba from './naviba';
import axios from 'axios';

const Qstallcheck = () => {
  const [lang, setLang] = useState('');
  const [qdata, setQData] = useState([]);
  const [qstdata, setQstData] = useState([]);
  const [qstt, setQstt] = useState('');
  const [show1, setShow1] = useState(false);
  const [id, setID] = useState([]);
  const [ALLLData, setALLLDAta] = useState([]);


    useEffect(()=>{
        GetAllDAta()
    },[])


    const GetAllDAta = () =>{
      try{
        apiAdmin.get("http://192.168.31.133/get/all/admin/new/languages/data")
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

    


  const GetListsQuest = (e) => {
    try{
      e.preventDefault();
      apiAdmin
        .get(`${"http://192.168.31.133"}/get/admin/all/question/lists/${lang}`)
        .then((res) => {
          if (res.data.data) {
            setQData(res.data.data);
          } else if (res.data.Logout === 'OUT') {
            localStorage.removeItem('token');
            window.location.reload();
          } else {
            alert('Unexpected response received');
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


  const Delet = () =>{
    try{
      axios.delete(`http://192.168.31.133/delete/unwanted/questions/${id}`)
      .then(res =>{
        if(res.data.Status === "OK"){
          setShow1(false)
          GetListsQuest()
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

  

  // Populate Array2 with question numbers from qdata
  const Array2 = qdata.map((user) => parseInt(user.qno));

  // Populate Array1 with a range of numbers from 1 to the length of qdata
  const Array1 = Array.from({ length: qdata.length }, (_, i) => i + 1);

  // Find remaining data that's in Array2 but not in Array1
  const remaining_data = Array2.filter((value) => !Array1.includes(value));

  console.log(remaining_data);

  return (
    <div>
      <center>
        <div className="Home-cnt-01-sub-01">
          <strong>sta<span>W</span>ro</strong>
          <hr />
        </div>
        <br />

        <form onSubmit={GetListsQuest}>
          <select onChange={(e) => setLang(e.target.value)} value={lang}>
            <option value="">Select</option>
            {ALLLData.map((lang, i) =>{
              return(
                <option value={lang}>{lang}</option>
              )
            })}
          </select><br />

          <button type="submit" className="admin_questionview-btn-01">Get</button>
        </form>
        <br />

        {qdata.length > 0 &&
          <h2 className="admin_questionview-h1-02">
            Total Questions: <strong>{qdata.length}</strong>
          </h2>
        }

        <div className="admin_qstallcheck-main-cnt-01">
          {qdata.map((user, i) => {
            const data = parseInt(user.qno);

            const GetQustNo = (qno) =>{
              try{
                apiAdmin.get(`${"http://192.168.31.133"}/question/one/by/${qno}/${lang}`)
                .then(res => {
                  if(res.data.question){
                    setShow1(true)
                    setQstData(res.data.question)
                    console.log(qstdata)
                  }else if (res.data.Logout === 'OUT') {
                    localStorage.removeItem('token');
                    window.location.reload();
                  } else {
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
              }
              catch(error){
                console.log(error)
              }
              

            }

            return (
              <div
                key={data}
                onClick={()=>{GetQustNo(data); setID(data._id)}}
                className={Array1.includes(data) ? "admin_qstallcheck-main-cnt-01-main-cnt-01" : "admin_qstallcheck-main-cnt-01-main-cnt-02"}
              >
                <span className="admin_qstallcheck-main-cnt-01-main-cnt-01-sub-01">
                  {Array1.includes(data) ? (
                    <strong>{user.qno} : Found</strong>
                  ) : (
                    <strong> {i + 1} : Not Found</strong>
                  )}
                </span>
              </div>
            );
          })}
        </div><br/>

        {remaining_data.length > 0 &&
          <h2 className="admin_questionview-h1-02">
            Total Questions: <strong>{remaining_data.length}</strong>
          </h2>
        }

        <div className="admin_qstallcheck-remaining-cnt">

          {remaining_data.length > 0 ? 
            remaining_data.map((num, i) =>{

              const GetQustNo = (num) =>{
                try{
                  apiAdmin.get(`${"http://192.168.31.133"}/question/one/by/${num}/${lang}`)
                  .then(res => {
                    if(res.data.question){
                      setShow1(true)
                      setQstData(res.data.question)
                      console.log(qstdata)
                    }else if (res.data.Logout === 'OUT') {
                      localStorage.removeItem('token');
                      window.location.reload();
                    } else {
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

              return(
                <div key={i} onClick={()=>{GetQustNo(num)}} className='admin_qstallcheck-main-cnt-01-main-cnt-01'>
                <span className='admin_qstallcheck-main-cnt-01-main-cnt-01-sub-01'>{num} <strong>: Found</strong> </span>
              </div>
              )
            })
            :
            <span>___</span>

          }
         
        </div>

        {show1 &&
  
          <div className='pop-up-data-01'>

            <div className='pop-up-data-01-sub-cnt-01-main'>
              <h1><strong>{qstdata.qno}</strong> : {qstdata.Questio}</h1>

              <div className={qstdata.img === "" ?  "pop-up-data-01-sub-cnt-01-main-sub-cnt-01-img-cnt-02" :  "pop-up-data-01-sub-cnt-01-main-sub-cnt-01-img-cnt-01"}>
                <img src={qstdata.img} alt='image' />
              </div>

              <div className='game_start-main-cnt-01-sub-cnt-01'>
                <button>{qstdata.a}</button>

                <button>{qstdata.b}</button>
              </div>

              <div className='game_start-main-cnt-01-sub-cnt-01'>
                <button>{qstdata.c}</button>
                <button>{qstdata.d}</button>
              </div>
              <div style={{height : "50px"}}>
              </div>

              <div className=''>
                <h2>User : <strong>{qstdata.user}</strong></h2>
                <h2>Subject : <strong>{qstdata.lang}</strong></h2>
              </div>
               
            </div>

            {/* <div>
              <button onClick={Delet}>Delete</button>
            </div> */}

            <div className='pop-up-data-01-div-sub-01'>
              <button onClick={()=>{setShow1(false)}}>Close</button>
            </div>

          </div>
        }

        <div style={{height : "50px"}}></div>
      </center>
      <Naviba />
    </div>
  );
};

export default Qstallcheck;
