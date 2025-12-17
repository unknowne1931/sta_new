import React from 'react'
import "./loading.css"
import img1 from "../src/image/2.gif"

const Loading = () => {
  return (
    <div className='loading_body'>
        <center>
            <div className='loading_page-logo_cnt-01'>
                <div className='span-1'>
                    <h1 className='loading_page-h1-01'><span className="">s</span></h1>
                </div>
                <div className='span-2'>
                    <h1 className='loading_page-h1-01'><span className="">t</span></h1>
                </div>
                <div className='span-3'>
                    <h1 className='loading_page-h1-01'><span className="">a</span></h1>
                </div>
                <div className='span-4'>
                    <h1 className='loading_page-h1-01'><strong>W</strong></h1>
                </div>
                <div className='span-5'>
                    <h1 className='loading_page-h1-01'><span className="">r</span></h1>
                </div>
                <div className='span-6'>
                    <h1 className='loading_page-h1-01'><span className="">o</span></h1>
                </div>
            </div>
            <div className='loading_page_img-cnt-01'>
                <img src={img1} alt='image' />
            </div>
            
        
        </center>   
    </div>
  )
}

export default Loading
