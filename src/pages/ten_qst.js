import React from 'react'
import Milion from './milion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Ten_qst = () => {

  const dat = "1"
  return (
    <div
      style={{
        backgroundColor: dat === "1" ? "#071c5c" : "#fff",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <Milion prz={"30₹"} />


      <div className='seconds_cnt_01'>
        <FontAwesomeIcon icon="clock" />
      </div>


    </div>
  )
}

export default Ten_qst