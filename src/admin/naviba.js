import { faArrowAltCircleLeft, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const Naviba = () => {

    const token = localStorage.getItem('token')

    const [show, setShow] = useState(false)
    
  return (
    <div>


        
            <center>
                <div className='admin-navibar-cnt-01'>
                    {token && <div onClick={()=>{window.location.href='/admin/home'}}>Home</div>}{token && <br/>}
                    {token && <div onClick={()=>{window.location.href='/admin/ticket'}}>Tickets</div>}{token && <br/>}
                    {token && <div onClick={()=>{window.location.href='/admin/coins'}}>Coin Add</div>}{token && <br/>}
                    {token && <div onClick={()=>{window.location.href='/admin/request'}}>Claim Coin</div>} {token && <br />}
                    {token && <div onClick={()=>{window.location.href='/admin/prize'}}>Prize</div>} {token && <br />}
                    {token && <div onClick={()=>{window.location.href="/admin/addquestion"}} >Qno Add</div>} {token && <br/>}
                    {token && <div onClick={()=>{window.location.href="/admin/cupon"}} >Cupon</div>} {token && <br/>}
                    {token && <div onClick={()=>{window.location.href="/admin/chart"}} >Chart</div>} {token && <br/>}
                    {token && <div onClick={()=>{window.location.href="/admin/questions"}} >Questions V</div>} {token && <br/>}
                    {token && <div onClick={()=>{window.location.href="/admin/balance"}} >Balance</div>} {token && <br/>}
                    {token && <div onClick={()=>{window.location.href="/admin/select"}} >Select Questions</div>} {token && <br/>}
                    {token && <div onClick={()=>{window.location.href="/admin/add/users"}} >Add Users</div>} {token && <br/>}
                    {token && <div onClick={()=>{window.location.href="/admin/add/reward"}} >Add reward</div>} {token && <br/>}



                    {/* {token && <span onClick={()=>{localStorage.removeItem("token"); localStorage.removeItem('username'); window.location.reload()}} >Logout</span>}{token && <br/>} */}
                    {token && <div onClick={()=> alert("The user is unable to log out after account creation.")}  >Logout</div>}{token && <br/>}
                    {!token && <div onClick={()=>{window.location.href='/admin/login'}}>Login</div>}{!token && <br/>}
                    {!token && <div onClick={()=>{window.location.href='/admin/signup'}}>Sign-Up</div>}{!token && <br/>}
                    {/* <button className='admin-navi-btn-01' onClick={()=>{setShow(false)}} >Close</button> */}
                </div>
            </center>
    </div>
  )
}

export default Naviba
