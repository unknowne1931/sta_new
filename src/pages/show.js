// import React from 'react'
// import one from "../image/one.png"
// import two from "../image/colour_name_text.jpg"
// import three from "../image/pattern.jpg"
// import api from './api';
// import four from "../image/morse_code.jpg"
// import five from "../image/leters_b_w.jpg"
// import six from "../image/puzle.jpg"
// import seven from "../image/misleding.jpg"
// import eight from "../image/clock.jpg"
// import nine from "../image/leters_shifted.jpg"
// import ten from "../image/leter_color.jpg"
// import eleven from "../image/word_leter_match.jpg"

// import m1 from "../image/m_1.png"
// import m11 from "../image/m_11.png"


// const show_puz = ({ typ }) => {

//   const start = () => {
//     api.post("http://192.168.126.1/revel/qst/start/game")
//       .then(res => {
//         if (res.data.Status === "OK") {
//           window.location.reload()
//         } else {
//           console.log("Error Starting Game")
//         }
//       }).catch(err => {
//         console.log(err)
//       })
//   }
//   return (
//     <div>

//       {typ === "star_circ_tria" &&
//         <div className='playyy_main_sub_01_pop_sub_01'>
//           <h1>Understand Before You Solve</h1>
//           <div className='playyy_main_sub_01_pop_sub_01_img'>
//             <img src={one} />
//           </div>
//           <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
//             <br />
//             <strong>Q.</strong> How many Unbroken boxes contain stars? <br />
//             <strong>Q.</strong> How many uncomplete boxes contain circles <br />
//             <strong>Q.</strong> Count the broken boxes that contain circles and triangles. <br />
//             <strong>...</strong>

//             <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
//               <span>Sample Question</span>
//             </div>

//           </div>

//           <br />

//           <div className='Accept_btn_01' onClick={start} >
//             <h1 style={{ textAlign: "center" }} >Ok</h1>
//           </div>

//         </div>
//       }

//       {typ === "Colours & Name Match" &&

//         <div className='playyy_main_sub_01_pop_sub_01'>
//           <h1>Understand Before You Solve</h1>
//           <div className='playyy_main_sub_01_pop_sub_01_img'>
//             <img src={two} />
//           </div>
//           <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
//             <br />
//             <strong>Q.</strong> Count how many colour names match their actual colours? <br />
//             <strong>Q.</strong> Count how many colour names do not match their actual colours. <br />

//             <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
//               <span>Sample Question</span>
//             </div>

//           </div>

//           <br />

//           <div className='Accept_btn_01' onClick={start} >
//             <h1 style={{ textAlign: "center" }} >Ok</h1>
//           </div>

//         </div>

//       }

//       {typ === "Pattern_to_Numbers" &&

//         <div className='playyy_main_sub_01_pop_sub_01'>
//           <h1>Understand Before You Solve</h1>
//           <div className='playyy_main_sub_01_pop_sub_01_img'>
//             <img src={three} />
//           </div>
//           <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
//             <br />
//             <strong>Q.</strong> Follow pattern order and extract numbers <br />
//             {/* <strong>Q.</strong> Count how many colour names do not match their actual colours. <br /> */}

//             <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
//               <span>Sample Question</span>
//             </div>

//           </div>

//           <br />

//           <div className='Accept_btn_01' onClick={start} >
//             <h1 style={{ textAlign: "center" }} >Ok</h1>
//           </div>

//         </div>

//       }


//       {typ === "Morse code" &&

//         <div className='playyy_main_sub_01_pop_sub_01'>
//           <h1>Understand Before You Solve</h1>
//           <div className='playyy_main_sub_01_pop_sub_01_img'>
//             <img src={four} />
//           </div>
//           <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
//             <br />
//             <strong>Q.</strong> Find the correct word from the Morse code. <br />
//             {/* <strong>Q.</strong> Count how many colour names do not match their actual colours. <br /> */}

//             <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
//               <span>Sample Question</span>
//             </div>

//           </div>

//           <br />

//           <div className='Accept_btn_01' onClick={start} >
//             <h1 style={{ textAlign: "center" }} >Ok</h1>
//           </div>

//         </div>

//       }


//       {typ === "Black_&_White_letters" &&

//         <div className='playyy_main_sub_01_pop_sub_01'>
//           <h1>Understand Before You Solve</h1>
//           <div className='playyy_main_sub_01_pop_sub_01_img'>
//             <img src={five} />
//           </div>
//           <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
//             <br />
//             <strong>Q.</strong> How many letters match the clue colours? <br />
//             {/* <strong>Q.</strong> Count how many colour names do not match their actual colours. <br /> */}

//             <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
//               <span>Sample Question</span>
//             </div>

//           </div>

//           <br />

//           <div className='Accept_btn_01' onClick={start} >
//             <h1 style={{ textAlign: "center" }} >Ok</h1>
//           </div>

//         </div>

//       }


//       {typ === "puzle_peace_male_female" &&

//         <div className='playyy_main_sub_01_pop_sub_01'>
//           <h1>Understand Before You Solve</h1>
//           <div className='playyy_main_sub_01_pop_sub_01_img'>
//             <img src={six} />
//           </div>
//           <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
//             <br />
//             <strong>Q.</strong> How many puzzle pieces contain 2 or more MALE connectors (outward tabs)? <br />
//             {/* <strong>Q.</strong> Count how many colour names do not match their actual colours. <br /> */}

//             <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
//               <span>Sample Question</span>
//             </div>

//           </div>

//           <br />

//           <div className='Accept_btn_01' onClick={start} >
//             <h1 style={{ textAlign: "center" }} >Ok</h1>
//           </div>

//         </div>

//       }


//       {typ === "letters_missalign" &&

//         <div className='playyy_main_sub_01_pop_sub_01'>
//           <h1>Understand Before You Solve</h1>
//           <div className='playyy_main_sub_01_pop_sub_01_img'>
//             <img src={seven} />
//           </div>
//           <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
//             <br />
//             <strong>Q.</strong> How many letters are misaligned? <br />
//             {/* <strong>Q.</strong> Count how many colour names do not match their actual colours. <br /> */}

//             <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
//               <span>Sample Question</span>
//             </div>

//           </div>

//           <br />

//           <div className='Accept_btn_01' onClick={start} >
//             <h1 style={{ textAlign: "center" }} >Ok</h1>
//           </div>

//         </div>

//       }


//       {typ === "clock_s" &&

//         <div className='playyy_main_sub_01_pop_sub_01'>
//           <h1>Understand Before You Solve</h1>
//           <div className='playyy_main_sub_01_pop_sub_01_img'>
//             <img src={eight} />
//           </div>
//           <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
//             <br />
//             <strong>Q.</strong> How many clocks show a time between 12:30 and 02:21? <br />
//             {/* <strong>Q.</strong> Count how many colour names do not match their actual colours. <br /> */}

//             <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
//               <span>Sample Question</span>
//             </div>

//           </div>

//           <br />

//           <div className='Accept_btn_01' onClick={start} >
//             <h1 style={{ textAlign: "center" }} >Ok</h1>
//           </div>

//         </div>

//       }


//       {typ === "scramble_words" &&

//         <div className='playyy_main_sub_01_pop_sub_01'>
//           <h1>Understand Before You Solve</h1>
//           <div className='playyy_main_sub_01_pop_sub_01_img'>
//             <img src={nine} />
//           </div>
//           <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
//             <br />
//             <strong>Q.</strong> How many words are scrambled? <br />
//             {/* <strong>Q.</strong> Count how many colour names do not match their actual colours. <br /> */}

//             <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
//               <span>Sample Question</span>
//             </div>

//           </div>

//           <br />

//           <div className='Accept_btn_01' onClick={start} >
//             <h1 style={{ textAlign: "center" }} >Ok</h1>
//           </div>

//         </div>

//       }


//       {typ === "word_colour_find" &&

//         <div className='playyy_main_sub_01_pop_sub_01'>
//           <h1>Understand Before You Solve</h1>

//           <div className='playyy_main_sub_01_pop_sub_01_img_containr_main'>
//             <div className='playyy_main_sub_01_pop_sub_01_img'>
//               <img src={eleven} style={{
//                 width : "100%", height : "100%",
//                 objectFit : "contain"
//               }} />
//             </div>
//             <div className='playyy_main_sub_01_pop_sub_01_img'>
//               <img src={m1} style={{
//                 borderRadius : "10px"
//                 // objectFit : "contain"
//               }} />
//             </div>
//             <div className='playyy_main_sub_01_pop_sub_01_img'>
//               <img src={m11} style={{
//                 borderRadius : "10px"
//                 // objectFit : "contain"
//               }} />
//             </div>
//           </div>

          
//           <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
//             <br />
//             <strong>Q.</strong> How many words are colored with the WRONG color? <br />
//             {/* <strong>Q.</strong> Count how many colour names do not match their actual colours. <br /> */}

//             <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
//               <span>Sample Question</span>
//             </div>

//           </div>

//           <br />

//           <div className='Accept_btn_01' onClick={start} >
//             <h1 style={{ textAlign: "center" }} >Ok</h1>
//           </div>

//         </div>

//       }







//     </div>
//   )
// }

// export default show_puz


















import React from 'react'
import one from "../image/one.png"
import two from "../image/colour_name_text.jpg"
import three from "../image/pattern.jpg"
import api from './api';
import four from "../image/morse_code.jpg"
import five from "../image/leters_b_w.jpg"
import six from "../image/puzle.jpg"
import seven from "../image/misleding.jpg"
import eight from "../image/clock.jpg"
import nine from "../image/leters_shifted.jpg"
import ten from "../image/leter_color.jpg"
import eleven from "../image/word_leter_match.jpg"
import m1 from "../image/m_1.png"
import m11 from "../image/m_11.png"

const ShowPuzzle = ({ typ }) => {

  const start = () => {
    api.post("http://192.168.126.1/revel/qst/start/game")
      .then(res => {
        if (res.data.Status === "OK") {
          window.location.reload()
        } else {
          console.log("Error Starting Game")
        }
      }).catch(err => {
        console.log(err)
      })
  }

  // Puzzle configuration data
  const puzzleConfigs = {
    "star_circ_tria": {
      title: "Star, Circle & Triangle Puzzle",
      image: one,
      questions: [
        "How many Unbroken boxes contain stars?",
        "How many incomplete boxes contain circles?",
        "Count the broken boxes that contain circles and triangles."
      ]
    },
    "Colours & Name Match": {
      title: "Colours & Name Match",
      image: two,
      questions: [
        "Count how many colour names match their actual colours?",
        "Count how many colour names do not match their actual colours."
      ]
    },
    "Pattern_to_Numbers": {
      title: "Pattern to Numbers",
      image: three,
      questions: [
        "Follow pattern order and extract numbers"
      ]
    },
    "Morse code": {
      title: "Morse Code Decoder",
      image: four,
      questions: [
        "Find the correct word from the Morse code."
      ]
    },
    "Black_&_White_letters": {
      title: "Black & White Letters",
      image: five,
      questions: [
        "How many letters match the clue colours?"
      ]
    },
    "puzle_peace_male_female": {
      title: "Puzzle Piece Connectors",
      image: six,
      questions: [
        "How many puzzle pieces contain 2 or more MALE connectors (outward tabs)?"
      ]
    },
    "letters_missalign": {
      title: "Misaligned Letters",
      image: seven,
      questions: [
        "How many letters are misaligned?"
      ]
    },
    "clock_s": {
      title: "Clock Time Puzzle",
      image: eight,
      questions: [
        "How many clocks show a time between 12:30 and 02:21?"
      ]
    },
    "scramble_words": {
      title: "Scrambled Words",
      image: nine,
      questions: [
        "How many words are scrambled?"
      ]
    },
    "word_colour_find": {
      title: "Word Color Matching",
      images: [eleven, m1, m11],
      questions: [
        "How many words are colored with the WRONG color?"
      ],
      isMultiImage: true
    }
  }

  const config = puzzleConfigs[typ]

  if (!config) {
    return <div>Puzzle type not found</div>
  }

  return (
    <div className='playyy_main_sub_01_pop_sub_01'>
      <h1>Understand Before You Solve</h1>
      
      {/* Image Section */}
      {config.isMultiImage ? (
        <div className='playyy_main_sub_01_pop_sub_01_img_containr_main'>
          {config.images.map((img, index) => (
            <div key={index} className='playyy_main_sub_01_pop_sub_01_img'>
              <img 
                src={img} 
                alt={`Puzzle example ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: index > 0 ? "10px" : "0"
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className='playyy_main_sub_01_pop_sub_01_img'>
          <img 
            src={config.image} 
            alt={config.title}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      )}

      {/* Questions Section */}
      <div className='playyy_main_sub_01_pop_sub_01_sp_qst'>
        <br />
        {config.questions.map((question, index) => (
          <strong key={index}>
            Q{index + 1}. {question}
            <br />
          </strong>
        ))}
        
        <div className='playyy_main_sub_01_pop_sub_01_sp_qst_sub_01'>
          <span>Sample Question</span>
        </div>
      </div>

      <br />

      {/* Start Button */}
      <div className='Accept_btn_01' onClick={start}>
        <h1 style={{ textAlign: "center" }}>OK</h1>
      </div>
    </div>
  )
}

export default ShowPuzzle



