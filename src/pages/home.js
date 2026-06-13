import React, { useEffect, useState } from 'react';
import img1 from "../image/img1.png";
import img2 from "../image/img2.png";
import img3 from "../image/img1.jpg";
import img4 from "../image/img2.jpg";
import img5 from "../image/img3.png";
import t1 from "../image/t1.gif"
import t2 from "../image/t2.gif"
import dr from "../image/dr.gif"
import Navi from '../navi';
import founder from "../image/founder.png"
import insta from "../image/insta.png"
import Img1 from "../image/m1.png"

import { auth, provider, signInWithPopup } from './firebase';

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share';




import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars, faClock, faHashtag, faHeart, faShare, faStar, faTimeline, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import Bottom from './bottom';
import Contact_bar from '../contact_bar';
import { getFromDB, saveToDB } from '../db';
import AddReview from './addrevive';
import axios from 'axios';
import api from './api';
import { signOut } from 'firebase/auth';

const Home = () => {

  const [ledData, setLed_Data] = useState([]);




  const CACHE_KEY = 'leaderboard_data';
  const CACHE_TIME = 60 * 1000; // 1 minute

  const [user, setUser] = useState(null);
  const [data, setData] = useState([])
  const [rate_data, setRate_data] = useState([])
  const [show, setShow] = useState([]);
  const [index, setIndex] = useState(0);

  const email = localStorage.getItem('email');

  const slides = [
    {
      img: Img1,
      text: "How many broken boxes have stars?",
    },

  ];

  auth.onAuthStateChanged((user) => {
    if (user) {
      setData(user)
      localStorage.setItem("email", user.email)
      // console.log("UID:", user.uid);
      // console.log("Name:", user.displayName);
      // console.log("Email:", user.email);
      // console.log("Photo URL:", user.photoURL);
    }
  });

  

  // useEffect(()=>{
  //   handleLogin()
  // },[])


  useEffect(() => {
    get_review()
    get_my_review()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const email = user.email;
        const name = user.displayName;
        const username = email.split('@')[0];
        const uid = user.uid;

        // Send to backend
        axios.post("http://192.168.126.1/post/google/auth", {
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
            saveToDB('email', email)
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


  useEffect(() => {
    let intervalId;

    async function loadData() {
      const cached = await getFromDB(CACHE_KEY);

      const now = Date.now();
      if (cached && (now - cached.timestamp < CACHE_TIME)) {
        setLed_Data(cached.data);
        console.log("Using cached leaderboard data");
        console.log(cached.data)
      } else {
        try {
          const response = await fetch("http://192.168.126.1/get/total/users/by/winners/datas/all/one");
          const result = await response.json();
          setLed_Data(result.users);
          saveToDB(CACHE_KEY, { data: result.users, timestamp: now });
          console.log("Fetched leaderboard from server");
        } catch (error) {
          console.log("Fetch error:", error);
        }
      }
    }

    loadData(); // initial fetch
    intervalId = setInterval(loadData, CACHE_TIME); // refetch every 1 minute

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);


  useEffect(() => {
    const blocks = document.querySelectorAll('.Home-cnt-02-sub-01');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          entry.target.classList.remove('hide');
        } else {
          entry.target.classList.remove('show');
          entry.target.classList.add('hide');
        }
      });
    }, { threshold: 0.5 });

    blocks.forEach((block) => {
      observer.observe(block);
    });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);




  function get_review() {
    axios.get("http://192.168.126.1/comment/review/frome/all/users")
      .then(res => {
        if (res.data.data) {
          setRate_data(res.data.data)
        }else{
          console.log("No Data Found")
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  // {make this continue}
  // async function get_geck_ut_hd(){
  //   const res = await api.get(`http://192.168.126.1/comment/get/single/data/email/${email}`);
  //   if (res.data.data){
  //     sessionStorage.setItem("check", "no")
  //     localStorage.setItem("ban", "hide");
  //     console.log("✅ Loaded review from API and cached in IndexedDB");
  //   } else {
  //     sessionStorage.setItem("check", "yes")
  //     console.log("🚫 No data found from API");
  //   }
  // }


async function get_my_review() {
  const email = localStorage.getItem('email');
  if (!email) return;

  try {
    // Check IndexedDB first
    const cachedReview = await getFromDB(email);
    if (cachedReview) {
      setShow(cachedReview); // show cached data
      console.log("✅ Loaded review from IndexedDB");
      return;
    }

    // If not found, fetch from API
    const res = await api.get(`http://192.168.126.1/comment/get/single/data/email/${email}`);
    if (res.data.data) {
      setShow(res.data.data);
      await saveToDB(email, res.data.data); // Save to IndexedDBnpm
      localStorage.setItem("ban", "hide");
      console.log("✅ Loaded review from API and cached in IndexedDB");
    } else {
      console.log("🚫 No data found from API");
    }
  } catch (error) {
    console.error("❌ Error fetching review:", error);
  }
}


  const stars = 5

  const share = () => {
    const shareUrl = `https://stawro.com/like/${show._id}`;
    const title = "Check this out!";
    const message = `${title} ${shareUrl}`;
    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  
  };

  return (
    <div>
      <center>
        <div className='Home-cnt-01'>
          <div className='Home-cnt-01-sub-01'>
            <strong style={{color : "white"}} >sta<span>W</span>ro</strong>
            <hr />
          </div>
          <div className='Home-cnt-01-sub-02'>
            <div className='Home-cnt-01-sub-02-sub-01'>
              <h2 className='Home-cnt-01-sub-02-sub-01-h2-01'>
                The <span className='Home-cnt-01-sub-02-sub-01-h2-01-span-01'>knowledge</span> Competition.
              </h2>
              <div className='Home-cnt-01-sub-02-sub-01-sub-cnt-01'>
                <button onClick={() => { window.location.href = "/play"; }}>
                  {/* Play for Free */}
                  Explore More
                </button>
              </div>

              {/* <div className='Home-cnt-01-sub-02-sub-01-sub-cnt-02'>
                <strong>Play and Get Reward$</strong>
              </div> */
              }

              {/* <div className='Home-cnt-01-sub-02-sub-01-sub-cnt-03'>
                <h1>hi</h1>
              </div> */}

            </div>

            <div className='Home-cnt-01-sub-02-sub-02'>
              <img src={img2} alt='img' />
            </div>
          </div>
        </div>

        <div className='Home-cnt-02'>

          <div className='Home-cnt-02-sub-01'>
            <div className='Home-cnt-02-sub-01_dr_mai'>
              <div className='Home-cnt-02-sub-01_dr_mai_text'>Q. {slides[index].text}</div>
              <img src={slides[index].img} alt="slider" />
              
             
              <div className='Home-cnt-02-sub-01_dr_main_post'>
                Puzzle Modules
              </div>
            </div>
            
          </div>


          {[
            { img: t1, text: 'Think it. Prove it. Win it.' },
            { img: t2, text: 'Knowledge pays off, Literally. win rewards now! ' },
            // { img: img4, text: 'We will credit the amount using UPI payments within 24 hours.' },

          ].map((item, index) => (
            <div key={index} className='Home-cnt-02-sub-01'>
              <div className='Home-cnt-02-sub-01-sub-01'>
                <img src={item.img} alt='img' />
              </div>
              <div className='Home-cnt-02-sub-01-sub-02'>
                <strong>{item.text}</strong>
              </div>
            </div>
          ))}

          <div className='Home-cnt-02-sub-01'>
            <div className='Home-cnt-02-sub-01_dr_main'>
              <img src={dr} alt='img' />
              <div className='Home-cnt-02-sub-01_dr_main_sub_cnt'>
                <h2>Daily Reward</h2>
                <div onClick={()=>{window.location.href='/start/try'}}>
                  claim
                </div>
              </div>

              <div className='Home-cnt-02-sub-01_dr_main_post'>
                1 Free Try Today
              </div>
            </div>
            
          </div>

          <div className='Home-cnt-02-sub-01'>
            <h3 className='Home-cnt-02-sub-01-h3-01' >View sample Questions</h3>
            <div className='Home-cnt-02-sub-01-sub-01-01-01-1-00'>
              <FontAwesomeIcon icon={faArrowRight} className='Home-cnt-02-sub-01-sub-01-01-01-1-00-icon' />
            </div><br />
            <button onClick={() => { window.location.href = '/sample' }} className='Home-cnt-02-sub-01-sub-btn-01' >
              View
            </button>
          </div>


        </div>
        <br />

        <div className='Home-cnt-03'>
          <p>StaWro is a <strong>skill-based quiz platform built on knowledge, logic</strong> , and <strong>mental ability</strong>. It helps improve memory, thinking speed, and problem-solving skills through regular practice. Performance-based rewards may be earned by users based on their results. This platform is fully skill-driven and not based on luck or chance.</p>
          <div className='Home-cnt-03-sub-01'>
            <h1>What is <strong>staWro</strong>? </h1>
          </div>
        </div>
       
        <br/>

        <div className="Home-cnt-04">
          
          
          <div style={{
            backgroundColor : "#418aff",
            borderRadius : "10px",
            boxShadow : "4px 4px 8px gray",
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
                top : "-22px",
                left : "20px",
                height : "auto",
                backgroundColor : "#0c439c",
                width :"auto",
                fontSize : "1.8rem",
                borderRadius : "20px",
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
            boxShadow : "4px 4px 8px gray",
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
                top : "-22px",
                left : "20px",
                height : "auto",
                backgroundColor : "#0c439c",
                width :"auto",
                fontSize : "1.8rem",
                borderRadius : "20px",
                padding : "10px",
                color : "white",
                border : "1px solid white"   
              }}
            >
              Cognitive Growth
            </div>

          </div>

          <div>

          </div>
          <div>

          </div>
        </div>


        <h2 className='leadboard_h2'>leadboard</h2>
        <p className='leadboard_p1'>The Latest Winners List.</p>
        <div className='leadboard'>


          {ledData.length <= 0 &&
            <div className='empty_data'>
              <h3>No <span>winners</span> yet — be the <span>#1</span></h3>
            </div>
          }


          {ledData.map((data, i) => {

            if (data.no === "1") {
              return (
                <div className='card_led_01' key={i}>
                  <span><FontAwesomeIcon icon={faHashtag} /> : <strong>{data.no}</strong> </span>
                  <span><FontAwesomeIcon icon={faUser} /> : <strong>{data.user}</strong></span>
                  <span><FontAwesomeIcon icon={faClock} /> : <strong>{data.Time}</strong></span>
                </div>
              )
            } else {
              return (
                <div className='card_led' key={i}>
                  <span><FontAwesomeIcon icon={faHashtag} /> : <strong>{data.no}</strong> </span>
                  <span><FontAwesomeIcon icon={faUser} /> : <strong>{data.user}</strong></span>
                  <span><FontAwesomeIcon icon={faClock} /> : <strong>{data.Time}</strong></span>
                </div>
              )
            }

          })}

        </div>
        <br />

        <div>
          <h2></h2>
        </div>

        <div className='sm_main_main_cnt'>
          <div className='sm_main'>
            <h1>What Our <span>Users</span> Are Saying.</h1>
          </div>

          {data.displayName && !show._id &&
            <div onClick={() => { window.location.href = '/review' }} className='sm_main_main_crt_01'>
              <span>Write a Review</span>
            </div>
          }


        </div>
        <br />
        <br />

        {data.displayName && <div className='sm_main_main_show_msg'>
          <p>Share your review — if a friend likes it, you get 1 free play!</p>
        </div>}

        <div className='sm_main_1'>
          {show._id &&
            <div className='cmnt_cnt' >
                <div className='cmnt_profile'>
                  <img src={show.profile} />
                </div>

                <div className='cmnt_cnt_sub_01'>
                  <h2>My Review</h2>

                  <br />
                  <div className='cmnt_text'>
                    <h4>{show.text}</h4>
                  </div>
                  <div className='cmnt_star'>

                    {[...Array(parseInt(show.stars))].map((_, i) => {

                      let classnm = "";

                      if (parseInt(show.stars) === 1) {
                        classnm = "star_1"
                      } else if (parseInt(show.stars) === 2) {
                        classnm = "star_2"
                      } else if (parseInt(show.stars) === 3) {
                        classnm = 'star_3'
                      }
                      else if (parseInt(show.stars) === 4) {
                        classnm = 'star_4'
                      } else {
                        classnm = "star_5"
                      }


                      return (

                        <FontAwesomeIcon icon={faStar} className={classnm} key={i} />

                      )

                    })}


                  </div>
                  <div className='cmnt_cnt_01_ls_main_cnt_01-01'>
                    <div className='cmnt_cnt_01_ls'>

                      <div className='cmnt_cnt_01_ls_count_01'>

                        <FontAwesomeIcon icon={faHeart} className='cmnt_cnt_01_ls_lk' />
                        <span>{(show.like).length}</span>

                      </div>

                      <div>
                        <FontAwesomeIcon 
                        // onClick={share} 
                        icon={faShare} className='cmnt_cnt_01_ls_lk' />
                      </div>

                    </div>


                  </div>


                </div>



              </div>
          }

          {rate_data.map((dat, i) => {
            const star = parseInt(dat.stars)

            // function like() {
            //   api.post("http://192.168.126.1/make/like/review/count", { l_id: dat._id, email: data.email })
            //     .then(res => {
            //       if (res.data.Status === "OK") {
            //         get_review()
            //       } else if (res.data.Logout === "OUT") {
            //         handleGoogleSignup()
            //       }
            //       else if(res.data.Status === "ALREADY_LIKED"){
            //         alert("Each user is allowed to like only one review.")
            //       }
            //       else if(res.data.Status === "Exist"){
            //         alert("You already liked this")
            //       }
            //       else {

            //       }
            //     }).catch(error => {
            //       console.log(error)
            //     })
            // }

            // const share = () => {
            //   const shareUrl = `https://stawro.com/like/${dat._id}`;
            //   const title = "Check this out!";
            //   const message = `${title} ${shareUrl}`;
            //   const encodedMessage = encodeURIComponent(message);
            //   window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
            // };


            return (
              <div className='cmnt_cnt' key={i} >
                <div className='cmnt_profile'>
                  <img src={dat.profile} />
                </div>

                <div className='cmnt_cnt_sub_01'>
                  <h2>{dat.name}</h2>

                  <br />
                  <div className='cmnt_text'>
                    <h4>{dat.text}</h4>
                  </div>
                  <div className='cmnt_star'>

                    {[...Array(star)].map((_, i) => {

                      let classnm = "";

                      if (stars === 1) {
                        classnm = "star_1"
                      } else if (stars === 2) {
                        classnm = "star_2"
                      } else if (stars === 3) {
                        classnm = 'star_3'
                      }
                      else if (stars === 4) {
                        classnm = 'star_4'
                      } else {
                        classnm = "star_5"
                      }


                      return (

                        <FontAwesomeIcon icon={faStar} className={classnm} key={i} />

                      )

                    })}


                  </div>
                  <div className='cmnt_cnt_01_ls_main_cnt_01-01'>
                    <div className='cmnt_cnt_01_ls'>

                      <div className='cmnt_cnt_01_ls_count_01'>

                        <FontAwesomeIcon icon={faHeart} 
                        // onClick={like} 
                        className='cmnt_cnt_01_ls_lk' />
                        <span>{(dat.like).length}</span>

                      </div>

                      <div>
                        <FontAwesomeIcon 
                        // onClick={share} 
                        icon={faShare} className='cmnt_cnt_01_ls_lk' />
                      </div>

                    </div>


                  </div>


                </div>



              </div>
            )
          })}

        </div>

        <div style={{ height: "150px" }}>
        </div>

        <Contact_bar />

        <Bottom />
      </center>

    </div>
  );
}

export default Home;
