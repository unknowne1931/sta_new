// import React, { useEffect, useState } from 'react'
// import api from './api'
// import Popup from './popup'

// const Milion = () => {

//     const reward = [
//         { name: '10' },
//         { name: '20' },
//         { name: '30' },
//         { name: '40' },
//         { name: '50' },
//         { name: '80' },
//         { name: '110' },
//         { name: '140' },
//         { name: '170' },
//         { name: '200' }
//     ]


//     // Current answered reward
//     const [currentReward, setCurrentReward] = useState()



//     useEffect(() => {
//         const interval = setInterval(() => {
//             // Current answered index
//             const prz = localStorage.getItem("rw")
//             setCurrentReward(prz)
//             const currentIndex = reward.findIndex(
//                 item => item.name === currentReward
//             )
//         }, 2000);

//         return () => clearInterval(interval); // cleanup
//     }, []);

//     return (
//         <div
//             style={{
//                 // padding: '10px',
//             }}
//         >

//             <div
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     flexWrap: 'wrap',
//                 }}
//             >

//                 {reward.map((item, index) => {

//                     const isCompleted = index <= currentIndex
//                     const isCurrent = index === currentIndex

//                     return (
//                         <>
//                             <React.Fragment key={index}>

//                                 {/* Reward Box */}
//                                 <div
//                                     style={{
//                                         width: '12px',
//                                         height: '12px',
//                                         padding: '10px',
//                                         borderRadius: '12px',
//                                         textAlign: 'center',
//                                         fontWeight: 'bold',
//                                         fontSize: '1.5rem',
//                                         alignContent: 'center',
//                                         justifyContent: 'center',
//                                         display: 'flex',
//                                         flexWrap: 'wrap',
//                                         color: 'white',
//                                         border: isCurrent ? '2px solid white' : '2px solid #787777',
//                                         background: isCompleted
//                                             ? 'linear-gradient(90deg, orange, red)'
//                                             : '#2b2b2b',
//                                         boxShadow: isCurrent
//                                             ? '0 0 15px orange'
//                                             : 'none',
//                                         transition: '0.3s',
//                                     }}
//                                 >
//                                 {item.name}₹
//                                 </div>

//                                 {/* Line */}
//                                 {index !== reward.length - 1 && (
//                                     <div
//                                         style={{
//                                             width: '3%',
//                                             height: '2px',
//                                             background:
//                                                 index < currentIndex
//                                                     ? 'linear-gradient(to right, orange, red)'
//                                                     : '#444',
//                                             transition: '0.3s'
//                                         }}
//                                     />
//                                 )}

//                             </React.Fragment>



//                         </>

//                     )
//                 })}

//             </div>



//         </div>
//     )
// }

// export default Milion















import React, { useEffect, useState } from 'react';

const Milion = () => {
    const rewards = [
        { name: '10' },
        { name: '20' },
        { name: '30' },
        { name: '40' },
        { name: '50' },
        { name: '80' },
        { name: '110' },
        { name: '140' },
        { name: '170' },
        { name: '200' }
    ];

    const [currentReward, setCurrentReward] = useState(
        localStorage.getItem('rw') || '0'
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const reward = localStorage.getItem('rw') || '0';
            setCurrentReward(reward);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const currentIndex = rewards.findIndex(
        reward => reward.name === currentReward
    );

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '2px',
                }}
            >
                {rewards.map((item, index) => {
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                        <React.Fragment key={index}>

                            {/* Reward Box */}
                            <div
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    padding: '10px',
                                    borderRadius: '12px',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1.5rem',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    color: 'white',
                                    border: isCurrent ? '2px solid white' : '2px solid #787777',
                                    background: isCompleted
                                        ? 'linear-gradient(90deg, orange, red)'
                                        : '#2b2b2b',
                                    boxShadow: isCurrent
                                        ? '0 0 15px orange'
                                        : 'none',
                                    transition: '0.3s',
                                }}
                            >
                                {item.name}₹
                            </div>

                            {/* Line */}
                            {/* Line */}
                            {index !== rewards.length - 1 && (
                                <div
                                    style={{
                                        width: '3%',
                                        height: '2px',
                                        background:
                                            index < currentIndex
                                                ? 'linear-gradient(to right, orange, red)'
                                                : '#444',
                                        transition: '0.3s'
                                    }}
                                />
                            )}

                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default Milion;