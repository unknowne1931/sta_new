import axios from 'axios'
import React, { useEffect, useState } from 'react'

const View_Most_Ans = () => {

  const [data, setData] = useState([])

  const data_fetch = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/get/calculate/data/monitor/main`)
      .then(res => {
        if (res.data) {
          setData(res.data.data)
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
    <div>
      

      <div className='view_qst_datas_cnt_01'>        
        


        {data.map((data, i) => {
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
                <span>Answered Correctly</span>
              </div>
            </div>
          )
        })}


          
      </div>


    </div>
  )
}

























export default View_Most_Ans