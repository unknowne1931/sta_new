import React, { useState } from 'react'

const Milion = ({prz}) => {

    const reward = [
        { name: '10₹' },
        { name: '20₹' },
        { name: '30₹' },
        { name: '40₹' },
        { name: '50₹' },
        { name: '80₹' },
        { name: '110₹' },
        { name: '140₹' },
        { name: '170₹' },
        { name: '200₹' }
    ]

    // Current answered reward
    const [currentReward] = useState(prz)

    // Current answered index
    const currentIndex = reward.findIndex(
        item => item.name === currentReward
    )

    return (
        <div
            style={{
                padding: '10px',
                color: 'white'
            }}
        >

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '0px'
                }}
            >

                {reward.map((item, index) => {

                    const isCompleted = index <= currentIndex
                    const isCurrent = index === currentIndex

                    return (
                        <>
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
                                        background: isCompleted
                                            ? 'linear-gradient(90deg, orange, red)'
                                            : '#2b2b2b',
                                        boxShadow: isCurrent
                                            ? '0 0 15px orange'
                                            : 'none',
                                        transition: '0.3s'
                                    }}
                                >
                                {item.name}
                                </div>

                                {/* Line */}
                                {index !== reward.length - 1 && (
                                    <div
                                        style={{
                                            width: '1%',
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





                        </>
                        
                    )
                })}

            </div>

        </div>
    )
}

export default Milion