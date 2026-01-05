import React, { useEffect, useState } from 'react'
import Naviba from './naviba'
import apiAdmin from '../pages/adminapi'

const Show_ticket = () => {

  const [data, setData] = useState([])
  const [sec, setSec] = useState('no')  // store seconds per ticket

  useEffect(() => {
    get_data();
    const interval = setInterval(get_data, 5000);
    return () => clearInterval(interval);
  }, []);

  const get_data = () =>{
    apiAdmin.get("http://localhost/get/all/tickets/data/admin")
    .then(res=>{
      if(res.data.data){
        setData(res.data.data)
      }else{
        console.log("No Data Found")
      }
    }).catch(error =>{
      console.log(error)
    })
  }

  const add = (id, dat) =>{
    apiAdmin.post("http://localhost/refund/data/and/add/to/users", {id, text: dat, ex_seconds: sec[id] || "no"})
    .then(res =>{
      if(res.data.Status === "OK"){
        get_data()
      }else{
        alert("Something went Wrong")
      }
    })
  }

  return (
    <div>
      <div className='Home-cnt-01-sub-01'>
        <strong>sta<span>W</span>ro</strong>
        <hr />
      </div>
      
      <div className='admin_ticket-01'>
        {data.map((item, i)=>{
          if(item.text === "pro"){
            return(
              <div key={i} className='admin_ticket-01_sub_01'>
                <br/>
                <span>user : <strong>{item.user}</strong></span>
                <br/>
                <span className='admin_ticket-01_sub_01_span_01' >{item.qst}</span><br/>
                <br/>
                <div className='show_ticket_img_01'>
                  <img 
                  src={`data:image/png;base64,${item.img}`} 
                  />
                </div>              
                <br/>
                <span className='show_ticket_sec'>seconds : <strong>{item.seconds}</strong></span>
                <br/><br/>
                <span className='show_tcicket_sec_01' >Ans : <strong>{item.usa}</strong></span>
                <br/>

                <div>

                  <h2 className='show_tickets_exp_01_h2' >
                    User Requested Seconds : {item.exp_sec}
                  </h2>
                  <br/>
                  <input 
                    className='play_seconds_increase_txt_01'
                    type='number' 
                    value={sec[item._id] || ''} 
                    onChange={e=> setSec(prev=>({...prev, [item._id]: e.target.value}))} 
                    placeholder='add more seconds' 
                  />
                  <button onClick={()=> add(item._id, "refund")} className='play_seconds_increase_txt_01_btn' >
                    Refund & Add {sec[item._id] || 0}
                  </button>
                </div>

                <br/>

                <div className='show_ticket_opt'>
                  {item.options.map((it, ix)=>{
                    return(
                      <div key={ix} className='show_ticket_opt_01'>
                        <span>{it}</span>
                      </div>
                    )
                  })}
                  {/* <div>{item.a}</div>
                  <div>{item.b}</div>
                  <div>{item.c}</div>
                  <div>{item.d}</div> */}
                </div>

                <div className='ticket_show_issue'>
                  {item.msg}
                </div>

                <span>{item.vr ? "Answered" : "Not Answered"}</span>

                <div className='ticket_show_btn_cnt_01'>
                  <div className='ticket_show_btn_cnt_01_02' onClick={()=>{add(item._id, "refund")}}>
                    Refund
                  </div>
                  <br/>
                  <div className='ticket_show_btn_cnt_01_02' onClick={()=>{add(item._id, "non-refund")}}>
                    Non-Refund
                  </div>
                </div>

              </div>
            )
          }
        })}
      </div>
  
      <Naviba />
    </div>
  )
}

export default Show_ticket
