import React from 'react'
import m1 from "../image/m1.png"
import m2 from "../image/m2.png"


const sample_qn = () => {
  const images = [
    {
      img : m1,
      info : "There is a damaged rectangle that contains some shapes, sometimes damaged and sometimes complete."

    },
    {
      img : m2,
      info : "Arrows point north, east, west, and south so you can learn directions and solve it."
    }
  ]


  return (
    <div>
      <div className='main_cnt_01_spml_01'>
        <h1>Puzzle Module</h1>
        <p>You will receive a <strong>Random One</strong> from this model.</p>
      </div>

      

      <div className='main_cnt_01_spml_01_sub_01'>
        {images.map((data, i) =>{
          return(<>
          <div className='main_cnt_01_spml_01_sub_01_sub_01'>

            <div style={{height : "20px"}}></div>

            <div className='main_cnt_01_spml_01_sub_01_sub_01_img'>
              <img src={data.img} />
            </div>

            <div className='main_cnt_01_spml_01_sub_01_sub_01_para-cnt_01'>
              {data.info}
            </div>

            <div className='main_cnt_01_spml_01_sub_01_sub_01_po_abs'>
              <span>Puzzle : {i +1}</span>
            </div>

            <div onClick={()=>{window.location.href = '/play'}} className='main_cnt_01_spml_01_sub_01_sub_01_btn_01'>Start Now</div>

          </div>
          </>)
        })}
      </div>


    </div>
  )
}

export default sample_qn
