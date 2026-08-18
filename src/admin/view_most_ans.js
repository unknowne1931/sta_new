import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiAdmin from '../pages/adminapi'
import Popup from '../pages/popup'

const View_Most_Ans = () => {

  const [data, setData] = useState([])
  const [dataa, setDataa] = useState('')
  const [alert, setAlert] = useState(false)

  const data_fetch = () => {
    apiAdmin.get(`${process.env.REACT_APP_API_URL}/get/calculate/data/monitor/main`)
      .then(res => {
        console.log(res)
        if (res.data.data) {
          setData(res.data.data)
        } else if (res.data.Logout === "OUT") {
          localStorage.removeItem("token")
          console.log("delete Data")
        } else {
          console.log("Something went Wrong")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    data_fetch()
  }, [])

  return (
    <div style={{ backgroundColor: "rgb(2, 133, 234)" , minHeight : "100vh"}} >


      <div className='view_qst_datas_cnt_01'>
        <h1 style={{textAlign : "start", color : "white", fontSize : "20px"}} >Controle</h1>



        {data?.map((data, i) => {

          const update = (incr) => {
            setAlert(false)
            apiAdmin.put(`${process.env.REACT_APP_API_URL}/get/update/new/data/monitor/data`, { cat: data.cat, val: incr })
              .then(res => {
                if (res.data.Status === "OK") {
                  setDataa("Updated New Data")
                  setAlert(true)
                  data_fetch()
                } else {
                  setDataa("Something went Wrong, Try Again")
                  setAlert(true)
                }
              }).catch(error => {
                console.log(error)
                setDataa("Something Went Wrong")
                setAlert(true)
              })
          }

          const Delete = () => {
            setAlert(false);

            apiAdmin.delete(
              `${process.env.REACT_APP_API_URL}/get/update/new/data/monitor/data/delete`,
              {
                data: {
                  cat: data.cat
                }
              }
            )
              .then(res => {
                if (res.data.Status === "YES") {
                  setDataa("Reset has been applied.");
                  setAlert(true);
                  data_fetch()
                } else {
                  setDataa("Something went wrong.");
                  setAlert(true);
                }
              })
              .catch(error => {
                console.log(error);
                setDataa("Something went wrong.");
                setAlert(true);
              });
          };


          return (
            <div className='view_qst_datas_cnt_01_sub_01' key={i} >
              <div className='view_qst_datas_cnt_01_sub_01_sub_01'>
                <legend>{data.cat}</legend>
                <span>puzzel Type</span>
              </div>

              <div className='view_qst_datas_cnt_01_sub_01_sub_01'>
                <legend>{data.yes?.length || 0} <span>Times</span></legend>
                <span>Answered Correctly</span>
              </div>

              <div className='view_qst_datas_cnt_01_sub_01_sub_01'>
                <legend>{data.no?.length || 0} <span>Times</span></legend>
                <span>Answered Wrong</span>
              </div>

              <div style={{ textAlign: "center" }} className='view_qst_datas_cnt_01_sub_01_sub_01'>
                <legend>{data?.count || 0} <span></span></legend>
                <span>Units</span>

                <div className='view_qst_datas_cnt_01_sub_01_sub_01_sub_cntr'>

                  <div style={{ border: "1px solid white" }} onClick={() => update(Number(data.count) - 1)} >-</div>
                  <div style={{ border: "1px solid white" }} onClick={() => update(Number(data.count) + 1)} >+</div>

                </div>

                <div className='view_qst_datas_cnt_01_sub_01_sub_01_btn' onClick={() => { Delete() }} >Re-set</div>

              </div>

            </div>
          )
        })}



      </div>

      {
        alert &&
        <Popup data={dataa} val={alert} />
      }



    </div>
  )
}
























export default View_Most_Ans