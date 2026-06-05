import React from 'react'
import one from "../image/one.png"
import api from './api';


const show_puz = ({typ}) => {

    const start = () => {
        api.post("http://192.168.126.1/revel/qst/start/game")
        .then(res => {
            if(res.data.Status === "OK") {
                window.location.reload()
            }else {
                console.log("Error Starting Game")
            }
        }).catch(err => {
            console.log(err)
        })
    }
  return (
    <div>

        {typ === "star_circ_tria" &&
            <div className='playyy_main_sub_01_pop_sub_01'>
            <h1>Understand Before You Solve</h1>
            <div className='playyy_main_sub_01_pop_sub_01_img'>
              <img src={one} />
            </div>
            <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
              <br />
              <strong>Q.</strong> How many Unbroken boxes contain stars? <br />
              <strong>Q.</strong> How many uncomplete boxes contain circles <br />
              <strong>Q.</strong> Count the broken boxes that contain circles and triangles. <br />
              <strong>...</strong>
              
              <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
                <span>Sample Question</span>
              </div>

            </div>

            <br/>

            <div className='Accept_btn_01' onClick={start} >
                <h1 style={{textAlign : "center"}} >Ok</h1>
            </div>

          </div>
        }
      
    </div>
  )
}

export default show_puz
    