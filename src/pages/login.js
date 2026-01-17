import React, { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Popup from './popup';
import { auth, provider, signInWithPopup } from './firebase';
import img1 from "../image/login.gif";
import g from "../image/g-logo.png"
import { saveToDB } from '../db';

const Login = () => {
  const [data, setData] = useState('');
  const [alert, setAlert] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false); // NEW STATE
  const [show_i, setShow_I] = useState(false)

  const url = "http://192.168.31.133";



  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const email = user.email;
        const name = user.displayName;
        const username = email.split('@')[0];
        const uid = user.uid;

        axios.post("http://192.168.31.133/post/google/auth", {
          email,
          name,
          username,
          uid
        }).then(res => {
          if(res.data.Status === "OK") {
            setData("Account Created, Sign-In now!");
            setAlert(true);
            localStorage.setItem("email", email);
            localStorage.setItem("ssid", res.data.token);
            localStorage.setItem("user", res.data.user);
            localStorage.setItem("username", res.data.username);
            saveToDB("email" , email)
            window.location.href = '/';
          } else {
            setData("Something went wrong with Google Sign-UP");
            setAlert(true);
          }
        }).catch(err => {
          console.error(err);
          setData("Google Sign-In Failed");
          setAlert(true);
        });
      })
      .catch((error) => {
        console.error(error);
        setData("Google Sign-In Failed");
        setAlert(true);
      });
  };

  const img = async function load(){

  }

  return (
    <div className='login_body'>
      <center>
        <div className='Home-cnt-01-sub-01'>
          <strong>sta<span>W</span>ro</strong>
          <hr />
        </div>

        <div className='signup-form-cnt-01'>
          <div className='signup-h2-main-cnt-01'>
            <h2><span>Log</span>-In / <span>Sign</span>-Up</h2>
          </div>

          <div className='sign_and_login_main' >
            <div className='sign_and_login_main_sub'>
              <img src={img1} onLoad={() => setImageLoaded(true)} alt="loading..." />
            </div>
              <div className='sign_and_login_main_sub_1'>
                <div className='g_sign_up' onClick={handleGoogleSignup}>
                  <div className='G_cnt'>
                    <img src={g} alt="Google" />
                  </div>
                  <div className='G_txt'>
                    <span>Sign-Up / Sign-In</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </center>

      {alert && <Popup data={data} val={alert} />}
    </div>
  );
};

export default Login;
