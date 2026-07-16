import React from 'react'
import founder from "../image/founder.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faContactBook } from '@fortawesome/free-solid-svg-icons';
import insta from "../image/insta_b.png"
import whatsapp from "../image/whatsapp.png"
import linked_in from "../image/linked_in_b.png"


const About = () => {

    


  return (
    <div className='about_body_01' >
        {/* <center>
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
            




        </center> */}

        <div style={{
            height : "100px"
        }}></div>

        
        <h1 className='about_body_01_h2_01' >Visionary Founder</h1>
        <div className='about_body_01_sub_01'>
            <div className='about_body_01_sub_01_sub_01'>
                <img src={founder} />
            </div>
            <div className='about_body_01_sub_01_sub_02'>
                <p> "<strong>Markeev Darshan C Ki1931cK</strong>" is the <span>Founder & Developer</span> of <strong>sta<b style={{color : 'orange'}}>W</b>ro</strong>, a next-generation learning platform focused on <span>knowledge enhancement, logical reasoning, and skill development</span>. The vision behind staWro is to make learning more engaging, practical, and accessible for everyone.</p>
            
                <div className='about_body_01_sub_01_sub_02_sub_01'>
                    <div>
                        <img src={insta} />
                    </div>
                    {/* <div>
                        <img src={whatsapp} />
                    </div> */}
                    <div>
                        <img src={linked_in} />
                    </div>
                </div>
            </div>
        </div>

        <br/>
        <br/>

        <div className='about_body_01_sub_02'>
            <h1 className='about_body_01_sub_02_h1' >What is <strong>sta<span>W</span>ro</strong>?</h1>

            <p className='about_body_01_sub_02_p_01'>staWro is a knowledge and skill development platform designed to improve logical thinking, problem-solving abilities, and continuous learning. It provides engaging and interactive experiences that help users strengthen their skills and expand their understanding. The platform is built to make learning more practical, enjoyable, and consistent. staWro aims to empower individuals to grow through knowledge, logic, and creativity</p>

        </div>

        <div className="Home-cnt-04">
          
          
          <div style={{
            backgroundColor : "#418aff",
            borderRadius : "10px",
            position : "relative"
          }}>
            <div>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJDB4i3z599P6-G4c7CNs01sZrEjxuaso6Pxw6EiASjA&s=10' />
            </div>
            <div>
              <p className='para_text_01' style={{padding : "10px", color : "white"}}>
                Skill-based thinking,
                Mental ability enhancement,
                Logical reasoning,
                Problem-solving skills,
                Fast decision making.
              </p>
            </div>

            <div className='Home-cnt-04_abs'
              style={{
                position : "absolute",
                // top : "-22px",
                left : "20px",
                height : "auto",
                backgroundColor : "#0c439c",
                width :"auto",
                fontSize : "1.8rem",
                padding : "10px",
                color : "white",
                border : "1px solid white"   
              }}
            >
              Core Skill Areas
            </div>

          </div>


          <div style={{
            backgroundColor : "#418aff",
            borderRadius : "10px",
            position : "relative"
          }}>
            <div>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0OM_X0kqN-2_5Cq1eyFguSeXIVAOrLsasm2zobSgbQ&s=10' />
            </div>
            <div>
              <p className='para_text_01' style={{padding : "10px", color : "white"}}>
                Memory improvement,
                Focus and concentration,
                Analytical thinking,
                Pattern recognition,
                Critical thinking development.
              </p>
            </div>

            <div className='Home-cnt-04_abs'
              style={{
                position : "absolute",
                // top : "-22px",
                left : "20px",
                height : "auto",
                backgroundColor : "#0c439c",
                width :"auto",
                fontSize : "1.8rem",
                padding : "10px",
                color : "white",
                border : "1px solid white"   
              }}
            >
              Cognitive Growth
            </div>

          </div>

          <div style={{
            backgroundColor : "#418aff",
            borderRadius : "10px",
            position : "relative"
          }}>
            <div>
              <img src='https://media.istockphoto.com/id/1677846143/photo/time-management-planning.jpg?b=1&s=1024x1024&w=0&k=20&c=WtDJ_F9WnS-qx81GtZvBw1rMHqIJWIuKO5tRTjp7M7I=' />
            </div>
            <div>
              <p className='para_text_01' style={{padding : "10px", color : "white"}}>
                Smart solving techniques,
                Quick tricks & shortcuts,
                Time-saving strategies,
                Efficient answering methods,
                Brain training exercises.
              </p>
            </div>

            <div className='Home-cnt-04_abs'
              style={{
                position : "absolute",
                // top : "-22px",
                left : "20px",
                height : "auto",
                backgroundColor : "#0c439c",
                width :"auto",
                fontSize : "1.8rem",
                padding : "10px",
                color : "white",
                border : "1px solid white"   
              }}
            >
              Strategy & Tricks
            </div>

          </div>



          <div style={{
            backgroundColor : "#418aff",
            borderRadius : "10px",
            position : "relative"
          }}>
            <div>
              {/* <img src='https://img.magnific.com/free-vector/app-development-illustration_52683-47931.jpg?semt=ais_hybrid&w=740&q=80' /> */}

              {/* <img src='https://store.eccouncil.org/wp-content/uploads/2013/12/Eligibility-Application-Fee-Non-Refundable.jpg' /> */}

              <img src='https://abhyaas.in/wp-content/uploads/2023/01/1-5application-form-b.png' />

            </div>


            <div>
              <p className='para_text_01' style={{padding : "10px", color : "white"}}>
                Only an application fee is charged; it is not a stake or betting contribution
              </p>
            </div>

            <div className='Home-cnt-04_abs'
              style={{
                position : "absolute",
                // top : "-22px",
                left : "20px",
                height : "auto",
                backgroundColor : "#0c439c",
                width :"auto",
                fontSize : "1.8rem",
                padding : "10px",
                color : "white",
                border : "1px solid white"   
              }}
            >
              Application Fee Policy
            </div>

          </div>
          <div>

          </div>
        </div>

        {/* <div>
          <h1>Developer</h1>
        </div> */}

    </div>
  )
}


export default About


