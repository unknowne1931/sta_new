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

import c_1 from "../image/c_1.png"
import c_2 from "../image/c_2.png"
import p_1 from "../image/p_1.png"
import p_2 from "../image/p_2.png"

import w_1 from "../image/w_1.png"
import w_2 from "../image/w_2.png"

import s_w_1 from "../image/s_w_1.png"
import s_w_2 from "../image/s_w_2.png"

import w_l_1 from "../image/w_l_1.png"
import w_l_2 from '../image/w_l_2.png'

import str_1 from "../image/str_1.png"
import str_2 from "../image/str_2.png"

import decode_img from "../image/p_.jpg"
import decode_img_1 from "../image/decode_img_1.png"
import decode_img_2 from "../image/decode_img_2.png"

import i_exist from "../image/l_exist.jpg"
import i_ex_1 from "../image/l_exist_1.png"
import i_ex_2 from "../image/l_exist_2.png"

import word_count from "../image/word_count.jpg"
import nm_w_1 from "../image/nm_count_1.png"
import nm_w_2 from "../image/nm_count_2.png"

import ral from "../image/p_2.jpg"
import ral_1 from "../image/ral_1.png"
import ral_2 from "../image/ral_2.png"

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
      images: [one, str_1, str_2],
      questions: [
        "How many Unbroken boxes contain stars?",
        "How many incomplete boxes contain circles?",
        "Count the broken boxes that contain circles and triangles.",
        "More ..."
      ],
      isMultiImage: true
    },
    "Colours & Name Match": {
      title: "Colours & Name Match",
      images: [two, c_1, c_2],
      questions: [
        "Count how many colour names match their actual colours?",
        "Count how many colour names do not match their actual colours."
      ],
      isMultiImage: true
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
      images: [six, p_1, p_2] ,
      questions: [
        "How many puzzle pieces contain 2 or more MALE connectors (outward tabs)?"
      ],
      isMultiImage: true
    },
    "letters_missalign": {
      title: "Misaligned Letters",
      images: [seven, w_1, w_2],
      questions: [
        "How many letters are misaligned?"
      ],
      isMultiImage: true
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
      images: [nine, s_w_1, s_w_2],
      questions: [
        "How many words are scrambled?"
      ],
      isMultiImage: true
    },
    "word_colour_find": {
      title: "Word Color Matching",
      images: [eleven, m1, m11],
      questions: [
        "How many words are colored with the WRONG color?"
      ],
      isMultiImage: true
    },
    "letter_colour_find": {
      title: "Letters Color Matching",
      images: [ten, w_l_1, w_l_2],
      questions: [
        "How many letters are colored with the WRONG color?"
      ],
      isMultiImage: true
    },
    "encode_decode" : {
      title : "Decoding",
      images : [decode_img, decode_img_1, decode_img_2],
      questions : [
        "Decode 'AVI' using cipher key"
      ],
      isMultiImage : true
    },
    "count_leters_exist" : {
      title : "Counting Letters in a Sentence",
      images : [i_exist, i_ex_1, i_ex_2],
      questions : [
        "How many times do the letters A, V, I appear in the paragraph?"
      ],
      isMultiImage : true
    },
    "count_word_exist" : {
      title : "Counting words in a word",
      images : [word_count, nm_w_1, nm_w_2],
      questions : [
        "How many times does the letter sequence 'avi' appear in the given words?"
      ],
      isMultiImage : true
    },
    "re_arrange_letters" : {
      title : "Re-arrange the Alphabets",
      images : [ral, ral_1, ral_2],
      questions : [
        "What is the alphabetical arrangement of these random letters: 'AVI'?"
      ],
      isMultiImage : true
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
            <div style={{height:"10px"}}></div>
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
        <h1 style={{ textAlign: "center", fontSize : "3rem" }}>OK</h1>
      </div>
    </div>
  )
}

export default ShowPuzzle



