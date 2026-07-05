
import React, { useEffect, useState } from "react";
import axios from "axios";

const One = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [ans, setAns] = useState([]);
  const [viewed, setViewed] = useState([]);
  const [clue, setClue] = useState("");
  const [images, setImages] = useState([]);
  const [qst, setQst] = useState("");

  useEffect(() => {
    fetch_data();
  }, []);

  const fetch_data = () => {
    axios
      .get("http://192.168.127.1/similar/question/text")
      .then((res) => {
        if (res.data.Data) {
          setImages(res.data.Data.images || []);
          setClue(res.data.Data.clue);
          setAns(res.data.Data.answer || []);
          setQst(res.data.Data.question);

          // Mark first image as viewed automatically
          if ((res.data.Data.images || []).length > 0) {
            setViewed([0]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Select / Deselect current image
  const handleSelect = () => {
    if (selectedIds.includes(selectedIndex)) {
      setSelectedIds((prev) =>
        prev.filter((id) => id !== selectedIndex)
      );
    } else {
      setSelectedIds((prev) => [...prev, selectedIndex]);
    }
  };

  // Change preview image
  const handleImageClick = (index) => {
    setSelectedIndex(index);

    // Mark as viewed (only once)
    setViewed((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  };

  // Check whether all images are viewed
  const allViewed =
    images.length > 0 && viewed.length === images.length;

  return (


    // <div className="similar_main">
    //   {qst && (
    //     <div className="similar_main_sub_03">
    //       <span>
    //         Seconds : <strong>01</strong>
    //       </span>
    //     </div>
    //   )}

    //   {qst !== "" && (
    //     <div className="similar_main_sub_02">
    //       {qst}
    //     </div>
    //   )}

    //   {clue && (
    //     <div className="similar_main_sub_01">
    //       <img src={clue} alt="Clue" />
    //     </div>
    //   )}

    //   {images.length > 0 && (
    //     <div className="similar_main_sub_01_sub_01">
    //       {images.map((item, i) => (
    //         <div
    //           key={i}
    //           className="similar_main_sub_01_sub_01_div"
    //           onClick={() => handleImageClick(i)}

    //         //   style={{width : selectedIndex === i
    //         //           ? "53px"
    //         //           : "50px",}}
    //         >
    //           <img
    //             src={item}
    //             alt={`option-${i}`}
    //             style={{
    //               cursor: "pointer",
    //               border:
    //                 selectedIndex === i
    //                   ? "3px solid green"
    //                   : "1px solid transparent",
    //             }}
    //           />

    //           {selectedIds.includes(i) && (
    //             <div className="similar_main_sub_01_sub_01_div_div_abs">
    //               Selected
    //             </div>
    //           )}

    //           {/* {viewed.includes(i) && (
    //             <div
    //               style={{
    //                 position: "absolute",
    //                 top: 10,
    //                 right: 10,
    //                 background: "#000",
    //                 color: "#fff",
    //                 padding: "3px 8px",
    //                 borderRadius: "5px",
    //                 fontSize: "12px",
    //               }}
    //             >
    //               Viewed
    //             </div>
    //           )} */}
    //         </div>
    //       ))}
    //     </div>
    //   )}

    //   {images.length > 0 && (
    //     <div className="similar_main_sub_01_sub_02">
    //       <img
    //         src={images[selectedIndex]}
    //         alt="Preview"
    //       />
    //     </div>
    //   )}

    //   {images.length > 0 && (
    //     <div
    //       className="similar_main_sub_01_sub_03"
    //       onClick={handleSelect}
    //       style={{
    //         cursor: "pointer",
    //         userSelect: "none",
    //         backgroundColor: selectedIds.includes(selectedIndex)
    //           ? "#ff4d00"
    //           : "",
    //         color: "#fff",
    //       }}
    //     >
    //       {selectedIds.includes(selectedIndex)
    //         ? "Deselect"
    //         : "Select"}
    //     </div>
    //   )}

    //     <br/>
    //   {/* Submit button appears only after all images are viewed */}
    //   {allViewed && (
    //     <div
    //       className="similar_view_01"
    //       onClick={() => {
    //         console.log("Selected:", selectedIds);
    //         console.log("Answer:", ans);
    //       }}
    //       style={{
    //         marginTop: "3px",
    //         padding: "12px",
    //         // background: "green",
    //         color: "#fff",
    //         textAlign: "center",
    //         cursor: "pointer",
    //         borderRadius: "8px",
    //       }}
    //     >
    //       Submit
    //     </div>
    //   )}

    //   {/* Debug */}
    //   {/* <p>Selected: {JSON.stringify(selectedIds)}</p>
    //   <p>Viewed: {JSON.stringify(viewed)}</p>
    //   <p>Answer: {JSON.stringify(ans)}</p> */}
    // </div>


    <>
    <div className="similar_main">
      <h1 className="slp_h1_01" >Solve the Puzzle</h1>
      <br/>

      <div className="slp_div_01">
        start
      </div>
    </div>
    </>



  );
};

export default One;