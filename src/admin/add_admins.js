import React, { useEffect, useState } from 'react'
import api from '../pages/api';
import Loading from '../loading';
import Popup from '../pages/popup';
import apiAdmin from '../pages/adminapi';
import Naviba from './naviba';

const Add_admins = () => {

    const [ALLLData, setALLLDAta] = useState([]);
    const [load, setLoad] = useState(true);
    const [alert, setAlert] = useState(false);
    const [data, setData] = useState([]);
    
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [lang, setLang] = useState([]);

    const [all_users, setAll_Users] = useState([]);

    useEffect(()=>{
      fetch_users_data()
      GetAllDAta()
    },[])

    const fetch_users_data = () =>{
      try{
        apiAdmin.get('http://localhost/get/all/total/users/data/from/admins/super')
        .then(res =>{
          if(res.data.data){
              setAll_Users(res.data.data)
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

    const GetAllDAta = () =>{
        try{
          apiAdmin.get("http://localhost/get/all/admin/new/languages/data")
          .then(res =>{
              if(res.data.Data){
                  setALLLDAta(res.data.Data)
                  setLoad(false)
              }else if(res.data.Logout === "OUT"){
                  localStorage.removeItem("token");
                  window.location.reload()
              }else{
                setLoad(false)
                console.warn("Unexpected response structure:", res.data);
              }
          }).catch(error=>{
            setLoad(false)
            if (error.response) {
                console.error("API Error:", error.response.status, error.response.data);
            } else if (error.request) {
                console.error("No response from server. Please check your connection.");
            } else {
                console.error("Error occurred:", error.message);
            }
        })
        }catch(error){
            setLoad(false)
          console.log(error)
        }
    }

    const Post_data = (e) =>{
      e.preventDefault();
      setAlert(false)
      try{
        apiAdmin.post('http://localhost/get/employe/login/data/create/new',{username, password, email ,language : lang})
        .then(res =>{
          if(res.data.Status === "OK"){
            fetch_users_data()
            setData("New Admin Added")
            setAlert(true)
          }else{
            setData("Something went Wrong")
            setAlert(true)
            console.warn("Unexpected response structure:", res.data);
          }
        }).catch(error=>{
          setLoad(false)
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

    console.log(all_users)

  return (
    <div>
        {load ? <Loading /> :
      <center>
        <div className="Home-cnt-01-sub-01">
          <strong>
            sta<span>W</span>ro
          </strong>
          <hr />
        </div>
        <h1 className='add_admins_page-h1-01'>Add Employee</h1><br/>

        <div className='add_admins_page-cnt-01'>
            <form onSubmit={Post_data}>
                <input className='user_admin-input-field-01' onChange={e=>{setUsername(e.target.value)}} type='text' placeholder='Username' required autoComplete='off' /><br/>
                <input className='user_admin-input-field-01' onChange={e=>{setPassword(e.target.value)}} type='password' placeholder='Password' required autoComplete='off' /><br/>
                <input className='user_admin-input-field-01' onChange={e=>{setEmail(e.target.value)}} type='email' placeholder='Email' required autoComplete='off' /><br/>
                <select className='user_admin-input-field-01' onChange={e=>{setLang(e.target.value)}} required>
                    <option value='' >Select One</option>
                    {ALLLData.map((users,i) =>{
                      return(
                        <option key={i} value={users}>{users}</option>
                      )
                    })}
                    
                </select>
                
                <br/>
                <div style={{height : "12px"}}></div>
                <button className='user_admin-button-login'>Create New</button><br/>
              
            </form>
        </div>
        <br/>

        <hr style={{width : "90%"}}/>

        <h2 style={{fontSize : "22px"}}>Total Employees Data</h2>
        <div>

          <table className='table-01'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Language</th>
              </tr>
            </thead>
            <tbody>
              {all_users.map((data, i) => (
                <tr key={i}>
                  <td>{data.user}</td>
                  <td>{data.email}</td>
                  <td>{data.lang}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </center>}
      {alert &&
        <Popup data={data} val={alert} />
      }
      <Naviba />
    </div>
  )
}

export default Add_admins
