import React, { useEffect, useState } from 'react'
import api from '../api'
import Loading from '../../loading';

const Pending = () => {

  const user = localStorage.getItem('user');
  const [padding_data, setPending_Data] = useState([]);
  const [load, setLoad] = useState(true);



  useEffect(() => {
    GetPendingData();
  }, [])

  const GetPendingData = () => {
    try {
      setTimeout(() => {
        api.get(`${"http://localhost"}/get/pending/notification`)
          .then(res => {
            if (res.data.data){
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

          <h1 className='account-subb-part-01'>Pending</h1>

          {padding_data.length < 1 && <h2>No Pending Coins</h2>}



          <div className='account-pending-main-cnt-01'>

            {padding_data.map((user, i) => {
              if (user.sub === "pending") {
                return (
                  <div key={i} className='account-pending-main-cnt-01-sub-cnt-01'>
                    <span className='account-pending-main-cnt-01-sub-cnt-01-sub-span-01'>Request <span style={{ color: "orange" }}>sent</span> to claim "<strong style={{ color: "green" }}>{user.type === "Money" && <span>₹</span>}{user.title} </strong>". </span><br />
                    <span className='account-pending-main-cnt-01-sub-cnt-01-sub-span-02'>Time : {user.Time}</span>

                  </div>
                )
              }
            })}



          </div>
          <br />

          <h1 className='account-subb-part-01'>Claimed</h1>


          <div className='account-pending-main-cnt-01'>

            {padding_data.map((user, i) => {
              if (user.sub === "completed") {
                return (
                  <div key={i} className='account-pending-main-cnt-01-sub-cnt-01'>
                    <span className='account-pending-main-cnt-01-sub-cnt-01-sub-span-01'><span style={{ color: "green" }}>Claimed</span> reward of "<strong style={{ color: "green" }}>{user.type === "Money" && <span>₹</span>} {user.title}</strong>". </span><br />
                    <span className='account-pending-main-cnt-01-sub-cnt-01-sub-span-02'>Time : {user.Time}</span><br />
                    <strong>{user._id}</strong>
                  </div>
                )
              }
            })}

            {/* <div className='account-pending-main-cnt-01-sub-cnt-01'>
            <span className='account-pending-main-cnt-01-sub-cnt-01-sub-span-01'><span style={{color : "green"}}>Claimed</span> reward of "<strong style={{color : "green"}}>₹15.00</strong>"". </span><br/>
            <span className='account-pending-main-cnt-01-sub-cnt-01-sub-span-02'>Time : 09:31</span>
          </div> */}




          </div>
          <div style={{ height: "50px" }}>

          </div>
        </center>}
    </div>
  )
}

export default Pending
