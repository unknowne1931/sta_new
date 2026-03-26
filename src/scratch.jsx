import React, { useRef, useEffect, useState } from "react";
import { getFromDB, saveToDB } from "./db";
import { auth, provider, signInWithPopup } from "./pages/firebase";
import axios from "axios";

const ScratchCard = ({ rupee }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [log, setLog] = useState([])

  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const email = user.email;
        const name = user.displayName;
        const username = email.split('@')[0];
        const uid = user.uid;

        axios.post("https://kalanirdhari.in/post/google/auth", {
          email,
          name,
          username,
          uid
        }).then(res => {
          if (res.data.Status === "OK") {
            alert("Account Created")
            localStorage.setItem("email", email);
            localStorage.setItem("ssid", res.data.token);
            localStorage.setItem("user", res.data.user);
            localStorage.setItem("username", res.data.username);
            saveToDB("email", email)
            window.location.href='/account/upi'
          } else {
            alert("Something went wrong with Google Sign-UP");
          }
        }).catch(err => {
          console.error(err);
          alert("Google Sign-In Failed");
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Google Sign-In Failed");
      });
  };



  useEffect(() => {
    // Wait until canvas and container are both available
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");


    // Set canvas size to container's size
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Fill canvas with gray
    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(0, 0, width, height);

    // Add "Scratch" text in the center
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "#888";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch Me", width / 2, height / 2);
  

    // Setup scratch mode
    ctx.globalCompositeOperation = "destination-out";

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left;
      const y = (e.touches?.[0]?.clientY ?? e.clientY) - rect.top;
      return { x, y };
    };

    const draw = (e) => {
      if (!isDrawing.current) return;
      const { x, y } = getPos(e);
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();
    };

    const checkScratchPercent = () => {
      const imageData = ctx.getImageData(0, 0, width, height).data;
      let transparentPixels = 0;
      for (let i = 3; i < imageData.length; i += 4) {
        if (imageData[i] === 0) transparentPixels++;
      }
      const percent = (transparentPixels / (imageData.length / 4)) * 100;
      if (percent > 60 && !revealed) {
        setRevealed(true);
      }
    };

    const start = (e) => {
      e.preventDefault();
      isDrawing.current = true;
      draw(e);
    };

    const stop = (e) => {
      e.preventDefault();
      isDrawing.current = false;
      checkScratchPercent();
    };

    // Add listeners
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("mouseleave", stop);

    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stop);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stop);
      canvas.removeEventListener("mouseleave", stop);

      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stop);
    };
  }, [revealed]);

  const Login_Check = () => {

    const email = localStorage.getItem("email")

    if(email != null || undefined){
      window.location.href='/account/upi'      
    }else{
      alert("Add your payment method in seconds — just log in or sign up!")
      handleGoogleSignup()
      window.location.href='/account/upi' 
    }


    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     setLog(user)
    //     localStorage.setItem("email", user.email)
    //     saveToDB("email", user.email)
    //     // console.log("UID:", user.uid);
    //     // console.log("Name:", user.displayName);
    //     // console.log("Email:", user.email);
    //     // console.log("Photo URL:", user.photoURL);
    //     alert(user.email)
    //   } else {
    //     alert("Add your payment method in seconds — just log in or sign up!")
    //     handleGoogleSignup()
    //   }
    // });
  }

  return (

    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: 300,
        height: 200,
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        margin: "50px auto",
        userSelect: "none",
      }}
    >

      <div
        style={{
          background: "linear-gradient(to right, #FFD700, #FFA500)",
          width: "100%",
          height: "100%",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        {/* {revealed ? `🎉 You Won ₹${rupee ? rupee : 0}!` : "Scratch to Reveal 🎁"} */}

        {revealed ?

          <div className="scratch_cnt">
            <h2>🎉 You Won ₹{rupee ? rupee : 0}</h2>
            <div className="scratch_cnt_btn_01" onClick={Login_Check} >
              Claim Now
            </div>
          </div>

          :

          <div>

            Scratch to Reveal 🎁

          </div>

        }

      </div>

      {!revealed && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            cursor: "pointer",

          }}
        />
      )}

    </div>
  );
};

export default ScratchCard;
