import React, { useState } from 'react';
import './Modal.css';

const Popup = ({ data, val }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [run, setRun] = useState(val);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setRun(false)
  };

  const handleClickOutside = (event) => {
    if (event.target.className === 'modal') {
      closeModal();
    }
    if (data.includes("Incorrect Answer. Game Over.")) {
      const data = localStorage.getItem("pre_img")
    }

    if(data.includes("You Have Completed the Game!")){
      window.location.replace("/cart")
    }
  };

  return (
    <div>
      {run && (
        <div className="modal" onClick={handleClickOutside}>
          <div className="modal-content" style={{textAlign : "start"}} >
            {/* <span className="close" onClick={closeModal}>&times;</span> */}
            <p style={{textAlign : "start"}}>{data}</p>


                {data === "Incorrect Answer. Game Over." &&
                  <>

                  {localStorage.getItem("pre_img") &&
                  
                  <>
                  <p style={{ textAlign: "start", fontFamily: "fantasy", fontSize: "14px" }}>Image</p>
                    <div className='modal-content_img_cnt'>
                      <img src={`data:image/png;base64,${localStorage.getItem("pre_img")}`} />
                    </div>                
                  </>
                  
                  }
                    

                  </>
                }



            {data === "Incorrect Answer. Game Over." &&
              <>
              {localStorage.getItem("ans") &&
              <>
              <span style={{textAlign : "start", fontSize : "17px", color : "rgb(26, 94, 14)"}}>Selected Ans : {localStorage.getItem("ans")}</span>
              
              </>

              }
              </>
            
            }

            
            <div className='close_cnt_01' style={{textAlign : "center"}} onClick={closeModal} >
              Close
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Popup;
