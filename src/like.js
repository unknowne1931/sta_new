import img1 from "./image/logo.png"
import { faHeart, faShare, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { auth, provider, signInWithPopup } from "./pages/firebase";
import api from "./pages/api";
import { saveToDB } from "./db";

const Like = () => {



  const [data, setData] = useState([])
  const { id } = useParams();
  const [fire, setFire] = useState([])

  const token = localStorage.getItem('ssid')
  const user = localStorage.getItem('user')

  useEffect(() => {
    get_review()
  }, [])

  auth.onAuthStateChanged((user) => {
    if (user) {
      setFire(user)
      // console.log("UID:", user.uid);
      // console.log("Name:", user.displayName);
      // console.log("Email:", user.email);
      // console.log("Photo URL:", user.photoURL);
    }
  });

  


  const get_review = () => {
    axios.get(`http://192.168.31.133/comment/get/single/data/${id}`)
      .then(res => {
        if (res.data.data) {
          setData(res.data.data)
        } else {
          console.log("No Data Found")
        }
      }).catch(error => {
        console.log(error)
      })
  }

  const share = () => {
    const shareUrl = `https://stawro.com/like/${data._id}`;
    const title = "Check this out!";
    const message = `${title} ${shareUrl}`;
    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const email = user.email;
        const name = user.displayName;
        const username = email.split('@')[0];
        const uid = user.uid;

        // Send to backend
        axios.post("http://192.168.31.133/post/google/auth", {
          email,
          name,
          username,
          uid
        }).then(res => {
          if (res.data.Status === "OK") {
            alert("Account Created, Welcome to staWro")
            localStorage.setItem("email" , email)
            localStorage.setItem("ssid", res.data.token);
            localStorage.setItem("user", res.data.user);
            localStorage.setItem("username", res.data.username);
            saveToDB("email", email)
            window.location.reload();
          } else {
            alert("Something went wrong with Google Sign-UP", res.data)
          }
        }).catch(err => {
          console.error(err);
          alert("Google Sign-In Failed")
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Google Sign-In Failed")
      });
  }


  const like_it = () => {
    if (!user && !token && !fire.email) {
      alert("Login to Like")
      console.log("need to login")
    } else {
      api.post("http://192.168.31.133/make/like/review/count", { l_id: data._id, email: fire.email })
        .then(res => {
          if (res.data.Status === "OK") {
            alert("Thank you for your like")
            window.location.href = '/play'
          } else if (res.data.Logout === "OUT") {
            handleGoogleSignup()
          } else if (res.data.Status === "ALREADY_LIKED") {
            alert("Each user is allowed to like only one review.")
          }
          else if (res.data.Status === "Exist") {
            alert("You already liked this")
          }
          else {
            alert("Try Again")
          }
        }).catch(error => {
          console.log(error)
        })
    }

  }

  return (
    <div className='like'>

      <div className='like_main'>
        <div className='like_stawro_cnt'>
          {/* <span>sta<strong>W</strong>ro</span> */}
          <div className="like_stawro_cnt_logo">
            <img src={img1} />
          </div>
        </div>



        <div className='like_main_sub'>
          <h2 className='like_main_sub_h2'>Be a part of my <span>Win!</span></h2>
          <p>Like my review to get <span className='like_main_sub_h2_spn_01'>free credits</span>.</p>

          <div className='like_main_sub_01'>
            <div className='like_profile'>
              <div className='like_profile_div_01'>
                <img src={data.profile} />
              </div>

              <div className='like_profile_div_02'>
                <span>{data.name}</span>
              </div>
            </div>

            <div className='like_cmnt_txt'>
              <div className="like_cmnt_txt_cnt">
                <span className='like_cmnt_text'>{data.text}</span>
              </div>
              <br />

              <div className='like_stars_cnt'>
                {Number.isFinite(parseInt(data.stars)) && parseInt(data.stars) > 0 ? (
                  <>
                    {[...Array(parseInt(data.stars))].map((_, i) => (
                      <FontAwesomeIcon icon={faStar} className="star_5" key={i} />
                    ))}
                  </>
                ) : (
                  <span>No stars</span>
                )}


              </div>

            </div>
            <br />

            <div className="like_click_like_icon">
              <FontAwesomeIcon icon={faHeart} className="like_click_like_icon_icon" onClick={like_it} />
              <FontAwesomeIcon icon={faShare} className="like_click_like_icon_icon" onClick={share} />
            </div>

          </div>



        </div>

        <div>

        </div>

      </div>

      <br />
      <br />

      <div className="like_main_1" onClick={() => { window.location.href = '/' }} >
        <h2>Free Trial. Real Rewards. Start Now!</h2>
      </div>

      <br />



    </div>
  )
}

export default Like
