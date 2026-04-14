import { faArrowAltCircleLeft, faArrowLeft, faArrowRight, faArrowUp, faCoins, faDatabase, faHome, faRupee, faRupeeSign, faTicket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import logo from '../image/logo.png'

const Naviba = () => {

    const token = localStorage.getItem('token')

    const [show, setShow] = useState(false)
    
  return (
    <div>

      
      {/* <center>
        <div className='admin-navibar-cnt-01'>
          {token && <div onClick={() => { window.location.href = '/admin/home' }}>Home</div>}{token && <br />}
          {token && <div onClick={() => { window.location.href = '/admin/ticket' }}>Tickets</div>}{token && <br />}
          {token && <div onClick={() => { window.location.href = '/admin/coins' }}>Coin Add</div>}{token && <br />}
          {token && <div onClick={() => { window.location.href = '/admin/request' }}>Claim Coin</div>} {token && <br />}
          {token && <div onClick={() => { window.location.href = '/admin/prize' }}>Prize</div>} {token && <br />}
          {token && <div onClick={() => { window.location.href = "/admin/addquestion" }} >Qno Add</div>} {token && <br />}
          {token && <div onClick={() => { window.location.href = "/admin/cupon" }} >Cupon</div>} {token && <br />}
          {token && <div onClick={() => { window.location.href = "/admin/chart" }} >Chart</div>} {token && <br />}
          {token && <div onClick={() => { window.location.href = "/admin/questions" }} >Questions V</div>} {token && <br />}
          {token && <div onClick={() => { window.location.href = "/admin/balance" }} >Balance</div>} {token && <br />}
          {token && <div onClick={() => { window.location.href = "/admin/select" }} >Select Questions</div>} {token && <br />}
          {token && <div onClick={() => { window.location.href = "/admin/add/users" }} >Add Users</div>} {token && <br />}
          {token && <div onClick={() => { window.location.href = "/admin/add/reward" }} >Add reward</div>} {token && <br />}



          {/* {token && <span onClick={()=>{localStorage.removeItem("token"); localStorage.removeItem('username'); window.location.reload()}} >Logout</span>}{token && <br/>} */}
          {/* {token && <div onClick={() => alert("The user is unable to log out after account creation.")}  >Logout</div>}{token && <br />} */}
          {/* {!token && <div onClick={() => { window.location.href = '/admin/login' }}>Login</div>}{!token && <br />} */}
          {/* {!token && <div onClick={() => { window.location.href = '/admin/signup' }}>Sign-Up</div>}{!token && <br />} */}
          {/* <button className='admin-navi-btn-01' onClick={()=>{setShow(false)}} >Close</button> */}
        {/* </div> */}
      {/* </center> */}

      <div className={show ? 'new_admin_bar_01' : 'new_admin_bar_02'}
      >

        <div className='admin_navi_logo_cnt_01'
          onClick={() => {
            if (show) {
              setShow(false)
            } else {
              setShow(true)
            }
          }}
        >
          {show ?
            <>
              <div className='admin_navi_logo_cnt_01_img'>
                <img src={logo} alt='logo' />
              </div>
              {/* <div className='admin_navi_logo_cnt_01_text'>
                <strong>sta<span>W</span>ro</strong><br/>
                <strong>Admin</strong>
              </div> */}
            </> :
            <>
              <div className='admin_navi_logo_cnt_02_img'>
                <img src={logo} alt='logo' />
              </div>
            </>
          }

        </div>

        <div className='admin_navi_logo_cnt_01_btn'>
          {show ?
            <>
              <div className='admin_navi_logo_cnt_01_btn_01'>
                {token && <div onClick={() => { window.location.href = '/admin/home' }} title='Home' ><FontAwesomeIcon icon={faHome} /> Home</div>}
              </div>
            </>

            :

            <>
              {token && <div onClick={() => { window.location.href = '/admin/home' }} title='Home'><FontAwesomeIcon icon={faHome} /></div>}
            </>
          }
        </div>


        <div className='admin_navi_logo_cnt_01_btn'>
          {show ?
            <>
              <div className='admin_navi_logo_cnt_01_btn_01'>
                {token && <div onClick={() => { window.location.href = '/admin/ticket' }} title='Ticket' ><FontAwesomeIcon icon={faTicket} /> Ticket</div>}
              </div>
            </>

            :

            <>
              {token && <div onClick={() => { window.location.href = '/admin/ticket' }} title='Ticket'><FontAwesomeIcon icon={faTicket} /></div>}
            </>
          }
        </div>



        <div className='admin_navi_logo_cnt_01_btn'>
          {show ?
            <>
              <div className='admin_navi_logo_cnt_01_btn_01'>
                {token && <div onClick={() => { window.location.href = '/admin/coins' }} title='Coins' ><FontAwesomeIcon icon={faCoins} /> Coins</div>}
              </div>
            </>

            :

            <>
              {token && <div onClick={() => { window.location.href = '/admin/coins' }} title='Coins'><FontAwesomeIcon icon={faCoins} /></div>}
            </>
          }
        </div>


        <div className='admin_navi_logo_cnt_01_btn'>
          {show ?
            <>
              <div className='admin_navi_logo_cnt_01_btn_01'>
                {token && <div onClick={() => { window.location.href = '/admin/request' }} title='Pay' ><FontAwesomeIcon icon={faArrowUp} /> Pay</div>}
              </div>
            </>

            :

            <>
              {token && <div onClick={() => { window.location.href = '/admin/request' }} title='Pay'><FontAwesomeIcon icon={faArrowUp} /></div>}
            </>
          }
        </div>

        <div className='admin_navi_logo_cnt_01_btn'>
          {show ?
            <>
              <div className='admin_navi_logo_cnt_01_btn_01'>
                {token && <div onClick={() => { window.location.href = '/admin/data' }} title='User Data' ><FontAwesomeIcon icon={faDatabase} /> User Data</div>}
              </div>
            </>

            :

            <>
              {token && <div onClick={() => { window.location.href = '/admin/data' }} title='User Data'><FontAwesomeIcon icon={faDatabase} /></div>}
            </>
          }
        </div>



      </div>


            
    </div>
  )
}

export default Naviba














