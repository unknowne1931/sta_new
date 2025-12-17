import React from 'react'
import fb from "../image/fb.png"
import ina from '../image/insta_1.png'
import ln from "../image/in.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationArrow, faLocationDot, faMessage } from '@fortawesome/free-solid-svg-icons'
import Start from './start'

const Bottom = () => {
    return (
        <center>
            <footer>
                <div className="waves">
                    <div className="wave" id="wave1"></div>
                    <div className="wave" id="wave2"></div>
                    <div className="wave" id="wave3"></div>
                    <div className="wave" id="wave4"></div>
                </div>
                
                <div className='waves-cnt-01'>
                    <strong>sta<span>W</span>ro</strong>
                </div>

                <br/>

                <div className='waves-cnt-02'>

                    <div className='waves-cnt-02-sub-01'>
                        <h1 className='waves-cnt-02-sub-01-h1-01'>Latest Pages</h1><br/>
                        <span onClick={()=>{window.location.href='/about'}}>About</span><br/>
                        <span onClick={()=>{window.location.href='/cupon'}}>Coupons</span><br/>
                        <span onClick={()=>{window.location.href='/signup'}}>Sign-Up</span><br/>
                    </div>

                    {/* <div className='waves-cnt-02-sub-01'>
                        <h1 className='waves-cnt-02-sub-01-h1-01'>Latest Pages</h1><br/>
                        <span onClick={()=>{window.location.href='/about'}}>About</span><br/>
                        <span onClick={()=>{window.location.href='/about'}}>About</span><br/>
                    </div> */}

                    <div className='waves-cnt-02-sub-01'>
                        <h1 className='waves-cnt-02-sub-01-h1-01'>Contact us</h1><br/>

                        <div className='waves-cnt-02-sub-01-sub-01-cnt'>
                            {/* <div className='waves-cnt-02-sub-01-img-cnt-01'>
                                <img src={fb} alt='image' />
                            </div> */}

                            <div className='waves-cnt-02-sub-01-img-cnt-01' onClick={()=>{
                                window.location.href='https://www.instagram.com/stawro'
                            }} >
                                <img src={ina} alt='image' />
                            </div>

                            {/* <div className='waves-cnt-02-sub-01-img-cnt-01'>
                                <img src={ln} alt='image' />
                            </div> */}
                        </div>

                        <br/>

                        <div>
                            <span><FontAwesomeIcon icon={faEnvelope} /> <strong>krishnakick1931@gmail.com</strong></span>
                        </div>

                        

                        {/* <span onClick={()=>{window.location.href='/about'}}>About</span><br/>
                        <span onClick={()=>{window.location.href='/about'}}>About</span><br/> */}
                    </div>

                    <div className='waves-cnt-02-sub-01'>
                        <h1 className='waves-cnt-02-sub-01-h1-01'>Creator’s Corner</h1><br/>
                        <span><strong>Markeev Darshanckick 1931.</strong></span><br/>
                        <span><FontAwesomeIcon icon={faEnvelope} /> <strong>darshanckick@gmail.com</strong> </span>
                    </div>

                </div>
                <div style={{height : "40px"}}></div>

                <div className='waves-cnt-03'>
                    <span onClick={()=>{window.location.href='/privacy-policy'}}>privacy-policy</span> | <span onClick={()=>{window.location.href='/terms-condition'}} >Terms and Conditions</span> | <span onClick={()=>{window.location.href='/refund-shipping'}}>Shipping and Refund Policy</span>
                </div>


                <p className='footer_bootom-copy-prin'>&copy;2025 staWro | All Rights Reserved</p>
            </footer>
        </center>
        
      );
}

export default Bottom
