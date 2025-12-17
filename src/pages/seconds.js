// import React, { useEffect, useState } from 'react';

// const Seconds = ({ secon}) => {
//   const [time, setTime] = useState(new Date());
//   const [selSecond, setSelSecond] = useState(0);
//   const [rlSec, setRlSec] = useState(0);

//   // Update the current time every second
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTime(new Date());
//     }, 1000);
//     return () => clearInterval(intervalId);
//   }, []);

//   const seconds = time.getSeconds();

//   // Initialize countdown and target seconds from localStorage
//   useEffect(() => {
//     const storedRlSec = parseInt(localStorage.getItem('remainingSeconds'), 10);
//     const storedSelSecond = parseInt(localStorage.getItem('targetSecond'), 10);

//     if (storedRlSec > 0) {
//       // Load stored countdown values if valid
//       setRlSec(storedRlSec);
//       setSelSecond(storedSelSecond);
//     } else {
//       // Initialize countdown if no valid stored values
//       const targetSeconds = (seconds + secon) % 60;
//       setSelSecond(targetSeconds);
//       setRlSec(secon);
//       localStorage.setItem('targetSecond', targetSeconds);
//       localStorage.setItem('remainingSeconds', secon);
//     }
//   }, [secon, seconds]);

//   // Update remaining seconds logic
//   useEffect(() => {
//     const dt1 = localStorage.getItem('remainingSeconds')
//     const dt2 = localStorage.getItem('targetSecond')
//     const e_time = selSecond.toString().padStart(2, '0')
//     if(dt1 >1){
//       if (rlSec > 1) {
//         const remaining = selSecond > seconds ? selSecond - seconds : 60 - (seconds - selSecond);
//         setRlSec(remaining);
//         localStorage.setItem('remainingSeconds', remaining);
//       } 
//     }else{
//       if (dt1 <= 1) {
        
//         localStorage.removeItem('remainingSeconds')
//         localStorage.removeItem('targetSecond')
        
//         //make check this to navigate after seconds to new page
//         // window.location.href='/play'

//         console.log("Time over")
//           window.location.href='/play'

//         // if(dt1 <= 0){
//         //   console.log("Time over")
//         //   window.location.href='/play'
//         // }



//         // const newTargetSeconds = (seconds + secon) % 60;
//         // setSelSecond(newTargetSeconds);
//         // setRlSec(secon);
//         // localStorage.setItem('targetSecond', newTargetSeconds);
//         // localStorage.setItem('remainingSeconds', secon);
//       }
//     }
      
//   }, [rlSec, seconds, selSecond, secon]);

//   return (
//     <div>
//       <h2>Remaining Seconds: {rlSec}</h2>
//       {/* <p>
//         {time.getHours().toString().padStart(2, '0')}:
//         {time.getMinutes().toString().padStart(2, '0')}:
//         {time.getSeconds().toString().padStart(2, '0')}
//         <br />
//         Target Second: {selSecond.toString().padStart(2, '0')}
//       </p> */}
//     </div>
//   );
// };

// export default Seconds;






















import React, { useEffect, useState } from 'react';
import { getFromDB, removeFromDB, saveToDB } from '../db';

const Seconds = ({ secon = 30}) => {
  const [remaining, setRemaining] = useState(secon);
  const [isUp, setIsUp] = useState(false);

  useEffect(() => {
    let intervalId;
    const now = Date.now();

    const init = async () => {
      let target = await getFromDB('targetSecond');
      // let id = await getFromDB('qn_id')

      if (!target) {
        const endTime = now + secon * 1000;
        await saveToDB('targetSecond', endTime);
        target = endTime;
      }

      updateCountdown(target);

      intervalId = setInterval(async () => {
        updateCountdown(target);
      }, 1000);
    };

    const updateCountdown = async (target) => {
      const now = Date.now();
      const secondsLeft = Math.max(0, Math.floor((target - now) / 1000));
      setRemaining(secondsLeft);

      if (secondsLeft <= 0) {
        clearInterval(intervalId);
        await removeFromDB('targetSecond');
        alert("Time is Up")
        window.location.href='/play'
      }
    };

    init();

    return () => clearInterval(intervalId);
  }, [secon]);

  return (
    <div style={{ fontSize: '20px', color: remaining <= 5 ? 'red' : 'black' }}>
      {isUp ? <strong>⏰ Time is up!</strong> : `⏳ Time Left: ${remaining}s`}
    </div>
  );
};

export default Seconds;
