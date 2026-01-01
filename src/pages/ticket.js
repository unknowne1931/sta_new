import React, { useEffect, useState } from 'react'
import api from './api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp, faArrowTurnUp, faArrowUp, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const Ticket_Page = () => {

    const user = localStorage.getItem('user')
    const [data, setData] = useState([])
    const [show, setShow] = useState('')

    useEffect(()=>{
        get_data()
    },[])


    const get_data = () =>{
        api.get(`http://localhost/get/data/ticket`)
        .then(res=>{
            if(res.data.data){
                setData(res.data.data)
                console.log(res.data.data)
            }else{

            }
        })
    }


  return (
    <div>
        <div className='Home-cnt-01-sub-01'>
            <strong>sta<span>W</span>ro</strong>
            <hr />
        </div>

        <div className='ticket_cnt_01'>

            <div className='ticket_cnt_01_h1'>
                <h1>Tickets</h1>
                <span>Total Tickets : <strong>{data.length}</strong></span>
            </div>
            

            



            <br/>

            {data.length <= 0 &&

                <div className='ticket_cnt_01_sub'>
                    <span>No Tickets Found</span>
                </div>
            }


                

            {data.length > 0 &&
                <div className='ticket_data_map'>

                    {data.map((data, i) =>{

                        let status = ''

                        if(data.msg === "Image Loading"){
                            if(data.vr){
                                status = false
                            }else if(data.usa !== ""){
                                status = false
                            }else if(!data.vr){
                                status = true
                            }
                            else if(data.usa === ""){
                                status = true
                            }
                        }

                        return(
                            <div className='ticket_data_map_sub_01'>
                                <br/>
                                <h2>ID : {data._id}</h2>

                                

                                <div className='tickets_my_ans_show_span_01'>
                                    
                                    <span>My Answer : <strong>{data.usa}</strong></span><br/>
                                    <span>seconds : <strong>{data.seconds}</strong></span>
                                </div>

                                {show === data._id &&
                                    <div className='chevron_up' onClick={()=>setShow("")} >
                                        <FontAwesomeIcon icon={faChevronUp} />
                                    </div>
                                }
                                {show !== data._id &&
                                    <div className='chevron_up' onClick={()=>setShow(data._id)} >
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </div>
                                }

                                {show === data._id &&

                                <div>
                                    
                                    <h2 className='tickets_my_ans_show_span_01_01h2'>Qst : <strong>{data.qst}</strong></h2><br/>

                                    
                                    <div className='tickets_report_image_cnt'>
                                       <img src={`data:image/png;base64,${data.img.trim()}`} alt="" />


                                    </div>

                                    
                                    <div className='tickets_report_opt_cnt_01'>
                                        {data?.options?.map((option, index) => (
                                            <div key={index} className='tickets_report_opt_cnt_01_sub'>
                                                {option}
                                                {option == data.usa && (
                                                <div className='tickets_report_opt_cnt_01_sub_sub_01'>
                                                    My Answered
                                                </div>
                                                )}
                                            </div>
                                            ))}

                                        
                                        {/* <div className='tickets_report_opt_cnt_01_sub'>
                                            {data.a}
                                            {data.a === data.usa &&
                                                <div className='tickets_report_opt_cnt_01_sub_sub_01'>
                                                    my Answerd
                                                </div>
                                            }
                                        </div>
                                        <div className='tickets_report_opt_cnt_01_sub'>
                                            {data.b}
                                            {data.b === data.usa &&
                                                <div className='tickets_report_opt_cnt_01_sub_sub_01'>
                                                    my Answerd
                                                </div>
                                            }
                                        </div>

                                        {data.c !== "" &&
                                        <div className='tickets_report_opt_cnt_01_sub'>
                                            {data.c}
                                            {data.c === data.usa &&
                                                <div className='tickets_report_opt_cnt_01_sub_sub_01'>
                                                    my Answerd
                                                </div>
                                            }
                                        </div>
                                        }

                                        {data.d !== "" &&
                                        <div className='tickets_report_opt_cnt_01_sub'>
                                            {data.d}
                                            {data.d === data.usa &&
                                                <div className='tickets_report_opt_cnt_01_sub_sub_01'>
                                                    my Answerd
                                                </div>
                                            }
                                        </div>} */}

                                    </div>
                                </div>
                                }


                                

                                

                                {data.text === "pro" &&
                                    <div className='ticket_data_map_sub_01_btn'>
                                        Processing
                                    </div>
                                }

                                {data.text === "refund" && 
                                    <div className='ticket_data_map_sub_01_btn-refund'>
                                        Refunded
                                    </div>
                                }

                                {data.text === "non-refund" &&
                                    <div className='ticket_data_map_sub_01_btn-non-refund'>
                                        Non-Refundeble
                                    </div>
                                }

                                <br/>

                                {status === false && 
                                    <span style={{color : "white"}}> <strong>Note</strong> : You cant get Refund you have answerd</span>
                                }

                                <div className='ticket_data_map_sub_01_sub_002'>
                                    <h2>Issue : {data.msg}</h2>
                                </div>

                                {/* <div className='ticket_data_map_sub_01_sub_001' >
                                    {i+1}
                                </div> */}
                            </div>
                        )
                    })}

                    

                </div>                    
            }

            

        </div>

        <div>

        </div>
    </div>
  )
}

export default Ticket_Page
