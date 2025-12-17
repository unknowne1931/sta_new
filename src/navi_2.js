import React, { useState } from 'react'

const Navi_2 = () => {

  const [data_a, setData_A] = useState('')

  const menu_list = ['Home', 'About']
  console.log(data_a)
  
  return (
    <div className='navi_2_main'>
      <div className='navi_2_main_sub'>
        {menu_list.map((data) => {
          return (
            <div onClick={()=>{setData_A(data)}}>
              {data}
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default Navi_2
