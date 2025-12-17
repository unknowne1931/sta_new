import React from 'react'
import founder from "../image/founder.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';
import insta from "../image/insta.png"


const About = () => {
  return (
    <div>
        <center>
            <div className='Home-cnt-01-sub-01'>
                <strong>sta<span>W</span>ro</strong>
                <hr/>
            </div>
            <h1 className='About_h1-01'>About <span>Us</span></h1>

            <div className='Abou-page-main-cnt-01'>
                <div className='Abou-page-main-cnt-01-img-cnt-01'>
                    <img src={founder} alt='Founder' />
                </div>

                <div className='Abou-page-main-cnt-01-text-cnt-01'>
                    <h2 className='Abou-page-main-cnt-01-text-cnt-01-h1-01'>Founder of <strong>sta<span>W</span>ro</strong></h2>
                    <p className='Abou-page-main-cnt-01-paragraph-cnt-01'>
                    "I'm <strong>Krishnaki1931ck</strong>, the founder and developer of sta<span>W</span>ro.
                     Building this venture has been a fulfilling journey, blending my 
                     passion for innovation with hands-on development. I take pride in 
                     creating solutions that drive progress and bring ideas to life. My 
                     role allows me to explore new possibilities every day, and I'm excited 
                     about the impact we're making"
                    </p>
                    <br/>
                    
                    <div className='Abou-page-main-cnt-01-text-cnt-01-sub-div-insta-01' onClick={()=>{window.location.href='https://www.instagram.com/kick_1931'}} >
                        <img src={insta} alt='instagram' />
                    </div>
                </div>
            </div><br/>
            
            <div style={{height : "50px"}}>
            </div>
            




        </center>
      
    </div>
  )
}

export default About
