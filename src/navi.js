import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faArrowDownAZ, faBaby, faBank, faBell, faCartShopping, faCoins, faGear, faHome, faI, faICursor, faIgloo, faImage, faInfo, faLocationArrow, faLocationDot, faPerson, faPersonCirclePlus, faPersonPraying, faPersonRays, faPlay, faPlus, faSchool, faSign, faSignIn, faSignOut, faUserPlus, faUsers, faVideo } from '@fortawesome/free-solid-svg-icons';
import feather from 'feather-icons';
import "./navi.css"
import img1 from "./image/logo.png"
import img2 from "./image/user.png"
import { useNavigate } from 'react-router-dom';
import { clearStore, deleteDatabase } from './db';
import { signOut } from 'firebase/auth';
import { auth } from './pages/firebase';

const Navi = ({data}) => {

    useEffect(() => {
        feather.replace();
      }, []);

    const token = localStorage.getItem("ssid")


      

  return (
    <div className='navi_body'>
        <center>
        <div className='Home-cnt-01-sub-01'>
            <strong style={{color:'white'}}>sta<span>W</span>ro</strong>
            <hr/>
        </div>
        </center>
        <center className='navi-body'>
                <div className="orbital-menu">
                    <ul className="orbital-menu__list">

                        {/* home */}
                        <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href='/'}} >
                                <div className="orbital-menu__link-icon">
                                    <div >
                                        <FontAwesomeIcon icon={faHome} />
                                    </div>
                                    <div className='text_bottom_main'>
                                        <span>Home</span>
                                    </div>
                                </div>
                                <span className="orbital-menu__link-text">Home</span>
                            </div>
                        </div>
                        
                        {token ?
                            
                            // Logout
                            <div className="orbital-menu__item">
                                <div className="orbital-menu__link" onClick={()=>{
                                    localStorage.removeItem("ssid");
                                    localStorage.removeItem("user");
                                    localStorage.removeItem("username");
                                    localStorage.clear()
                                    // deleteDatabase();
                                    clearStore()
                                    signOut(auth)
                                    .then(() => {
                                        console.log("User signed out.");
                                    })
                                    .catch((error) => {
                                        console.error("Error signing out:", error);
                                    });
                                    window.location.reload()
                                }} >
                                    

                                    <div className="orbital-menu__link-icon">
                                        <div >
                                            <FontAwesomeIcon icon={faSignOut} />
                                        </div>
                                        <div className='text_bottom_main'>
                                            <span>Logout</span>
                                        </div>
                                    </div>

                                    <span className="orbital-menu__link-text">Logout</span>
                                </div>
                            </div>


                            // <div className="orbital-menu__item">
                            //     <div className="orbital-menu__link" onClick={()=> alert("The user is unable to log out after account creation.")} >
                            //         <span className="orbital-menu__link-icon">
                            //             <FontAwesomeIcon icon={faSignOut} />
                            //         </span>
                            //         <span className="orbital-menu__link-text">Logout</span>
                            //     </div>
                            // </div>

                            :

                            // Login
                            <div className="orbital-menu__item">
                                <div className="orbital-menu__link" onClick={()=>{window.location.href = '/login'}}>
                                    

                                    <div className="orbital-menu__link-icon">
                                        <div >
                                            <FontAwesomeIcon icon={faSignIn} />
                                        </div>
                                        <div className='text_bottom_main'>
                                            <span>Login</span>
                                        </div>
                                    </div>


                                    <span className="orbital-menu__link-text">Login</span>
                                </div>
                            </div>
                        }

                        {/* Sign-Up */}
                        


                        <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href='/cupon'}}>
                                <div className="orbital-menu__link-icon">
                                    <div >
                                        <FontAwesomeIcon icon={faCoins} />
                                    </div>
                                    <div className='text_bottom_main'>
                                        <span>Coins</span>
                                    </div>
                                </div>
                                <span className="orbital-menu__link-text">Coins</span>
                            </div>
                        </div>


                        {/* Account */}
                        {token ?

                            <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href='/account'}}>
                                

                                <div className="orbital-menu__link-icon">
                                    <div >
                                        <FontAwesomeIcon icon={faBank} />
                                    </div>
                                    <div className='text_bottom_main'>
                                        <span>Bank</span>
                                    </div>
                                </div>

                                <span className="orbital-menu__link-text">Account</span>
                            </div>
                            </div>

                            :

                            <div className="orbital-menu__item">
                                <div className="orbital-menu__link" onClick={()=>{window.location.href='/about'}}>
                                   

                                    <div className="orbital-menu__link-icon">
                                        <div >
                                            <FontAwesomeIcon icon={faInfo} />
                                        </div>
                                        <div className='text_bottom_main'>
                                            <span>About</span>
                                        </div>
                                    </div>

                                    <span className="orbital-menu__link-text">About</span>
                                </div>
                            </div>
                        }
                        
                        
                        {/* Settings */}
                        <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href='/cart'}}>
                             

                                <div className="orbital-menu__link-icon">
                                    <div >
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </div>
                                    <div className='text_bottom_main'>
                                        <span>Cart</span>
                                    </div>
                                </div>

                                <span className="orbital-menu__link-text">Cart</span>
                            </div>
                        </div>
                        

                        <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href ="/settings"}}>
                  

                                <div className="orbital-menu__link-icon">
                                    <div >
                                        <FontAwesomeIcon icon={faGear} />
                                    </div>
                                    <div className='text_bottom_main'>
                                        <span>Settings</span>
                                    </div>
                                </div>

                                <span className="orbital-menu__link-text">Settings</span>
                            </div>
                        </div>


                        <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href='/play'}} >
                                <div className="orbital-menu__link-icon">
                                    <div >
                                        <FontAwesomeIcon icon={faPlay} />
                                    </div>
                                    <div className='text_bottom_main'>
                                        <span>Play</span>
                                    </div>
                                </div>
                                <span className="orbital-menu__link-text">Play</span>
                            </div>
                        </div>
                        
                        <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href="/account/history"}}>
                               

                                <div className="orbital-menu__link-icon">
                                    <div >
                                        <FontAwesomeIcon icon={faArrowDownAZ} />
                                    </div>
                                    <div className='text_bottom_main'>
                                        <span>History</span>
                                    </div>
                                </div>

                                <span className="orbital-menu__link-text">History</span>
                            </div>
                        </div>
                    </ul>
            <div className="orbital-menu__center-pic">
                <img src={img2} alt="Center Pic 1" />
                <img src={img1} alt="Center Pic 2" />
            </div>
            </div><br/>
        </center> 
    </div>
  )
}

export default Navi
