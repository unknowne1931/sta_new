import React from 'react'
import one from "../image/one.png"
import two from "../image/colour_name_text.jpg"

const Pop_Show_Module = ({ cat, setType_Ct }) => {
    return (
        <>

            {cat === "star_circ_tria" &&

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





                    <div className='start_note_01'>
                        <strong>Dont refersh the page</strong>
                    </div>

                    {/* <div className='str_btn00on_01' onClick={() => { window.location.href = "/start" }} >
                        Let’s go!
                    </div> */}

                    <div className='str_btn00on_01' onClick={() => { setType_Ct(""); window.location.href = "/start" }} >
                        Let’s go!
                    </div>


                </div>
            }

            {cat === "Colours & Name Match" &&

                <div className='playyy_main_sub_01_pop_sub_01'>
                    <h1>Understand Before You Solve</h1>
                    <div className='playyy_main_sub_01_pop_sub_01_img'>
                        <img src={two} />
                    </div>
                    <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
                        <br />
                        <strong>Q.</strong> Count how many colour names match their actual colours? <br />
                        <strong>Q.</strong> Count how many colour names do not match their actual colours. <br />

                        <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
                            <span>Sample Question</span>
                        </div>

                    </div>



                    <div className='start_note_01'>
                        <strong>Dont refersh the page</strong>
                    </div>

                    {/* <div className='str_btn00on_01' onClick={() => { window.location.href = "/start" }} >
                        Let’s go!
                    </div> */}

                    <div className='str_btn00on_01' onClick={() => { setType_Ct(""); window.location.href = "/start" }} >
                        Let’s go!
                    </div>


                    

                </div>
            }


        </>

    )
}

export default Pop_Show_Module



