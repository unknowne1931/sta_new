import React from 'react'

import img1 from "../../image/s_t_1.jpg"
import img2 from "../../image/s_t_2.jpg"
import img3 from "../../image/s_t_3.jpg"
import img4 from "../../image/s_t_4.jpg"
import img5 from "../../image/s_t_5.jpg"
import img6 from "../../image/s_t_6.jpg"
import img7 from "../../image/s_t_7.jpg"
import img8 from "../../image/s_t_8.jpg"
import img9 from "../../image/s_t_9.jpg"
import img10 from "../../image/s_t_10.jpg"


const Teach_Similar = () => {


    const data = [
        {
            title : "Seconds",
            dis : "The countdown starts at 20 seconds and ends at 0. You must answer before it reaches 0",
            img : img1
        },
        {
            title : "Question",
            dis : "The question tells you how to solve it.",
            img : img2
        },
        {
            title : "Clue Image",
            dis : "Use the clue image to solve the puzzle.",
            img : img3
        },
        {
            title : "Options",
            dis : "You must view or check all the option images. The **Submit** button will appear only after you have viewed all of them.",
            img : img4
        },
        {
            title : "Selected",
            dis : "Selected Option",
            img : img5
        },
        {
            title : "Currently Viewing option",
            dis : "Selected Option View",
            img : img6
        },
        {
            title : "Currently Viewing Image",
            dis : "Selected option Image Preview",
            img : img7
        },
        {
            title : "Select",
            dis : "Tap to Select Image",
            img : img8
        },
        {
            title : "Deselect",
            dis : "Tap to Deselect",
            img : img9
        },
        {
            title : "Submit",
            dis: "Submit your answer before the timer reaches 0. View all images to unlock this option. If you do not submit it, your answer will not be validated and you will be removed from the game.",
            img : img10
        },
        
        
        
        
    ]

  return (
    <div className='tch_slp_main_01'>


        <div className='Home-cnt-01-sub-01'>
          <strong style={{color : "white"}} >sta<span>W</span>ro</strong>
          <hr />
        </div>

        <h1 className='how_to_play_main_h1_01'>How to Play</h1>

        <div className='how_to_play_main_div_01'>
            {data.map((item, i) =>{
                return(
                    <div className='how_to_play_main_div_01_sub_01'>

                        <h1>{item.title}</h1>


                        <div className='how_to_play_main_div_01_sub_01_img_cnt_01'>
                            <img src={item.img} />
                        </div>

                        <div className='how_to_play_main_div_01_sub_01_img_cnt_02'>
                            <p>{item.dis}</p>
                        </div>


                        <div className='how_to_play_main_div_01_sub_01_abs'>
                            Step : {i+1}
                        </div>
                    </div>
                )
            })}
        </div>

        <br/>

        <div className='back_to_play_button_01' onClick={()=>{
            window.location.href = "/similar"
        }} >
            Go Back to Play
        </div>

        <br/>



    </div>
  )
}

export default Teach_Similar
