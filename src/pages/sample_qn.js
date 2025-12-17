import React, { useState, useEffect } from 'react';
import img1 from "../image/1.jpg";
import img2 from "../image/2.jpg";
import img3 from "../image/3.jpg";
import img4 from "../image/4.jpg";
import img5 from "../image/5.jpg";
import img6 from "../image/6.jpg";
import img7 from "../image/7.jpg";
import img8 from "../image/8.jpg";
import img9 from "../image/9.jpg";
import img10 from "../image/10.jpg";

const Sample_qn = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoaded(true);
        }
      };
    });
  }, [images]);

  return (
    <div>
      <div className='Home-cnt-01-sub-01'>
        <strong>sta<span>W</span>ro</strong>
        <hr />
      </div>

      <div className='sample-page-nme-cnt-01'>
        <h2>Questions</h2>
      </div>
      <br />

      <h2 style={{ fontSize: "20px" }}>Model Questions</h2>
      <br />

      {!loaded ? (
        <div style={{ textAlign: "center", fontSize: "18px" }}>Loading Images...</div>
      ) : (
        <div className='sp_ig_cnt'>
          {images.map((img, i) => (
            <div key={i} className='sp_ig_cnt_sub'>
              <img src={img} alt={`sample-${i + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sample_qn;
