import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import api from './api';
import { auth } from './firebase';

const AddReview = () => {
  const [review, setReview] = useState('');
  const [selectedStars, setSelectedStars] = useState(0);
  const [userData, setUserData] = useState(null);

  // Handle star click
  const handleStarClick = (value) => {
    setSelectedStars(value);
  };

  // Get current Firebase user on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      }
    });

    return () => unsubscribe(); // clean up listener on unmount
  }, []);

  const handleSubmit = () => {
    if (!review || selectedStars === 0 || !userData) {
      alert('Please enter a review and select a star rating.');
      return;
    }

    api
      .post("http://192.168.31.133/get/new/post/from/comment", {
        text: review,
        stars: selectedStars,
        name: userData.displayName,
        profile: userData.photoURL,
        email: userData.email,
      })
      .then((res) => {
        if (res.data.Status === "OK") {
          window.location.href = `/like/${res.data.to}`;
        } else if(res.data.Status === "Miss"){
            alert("Recheck All Input Field")
        }else if(res.data.Status === "IN"){
            alert("You Cant Post Again")
        }
        else {
          alert("Something went Wrong Try Again");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred while submitting your review.");
      });
  };

  return (
    <div className="review_main">
      <div className='Home-cnt-01-sub-01'>
        <strong>sta<span>W</span>ro</strong>
        <hr />
      </div>

      <div className="review_box">
        <h2>Add Your Revive</h2>
        <textarea
          required
          className="review-input"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="stars">
          {[1, 2, 3, 4, 5].map((val) => (
            <span key={val} onClick={() => handleStarClick(val)}>
              <FontAwesomeIcon
                icon={faStar}
                className={val <= selectedStars ? "starsss" : ""}
              />
            </span>
          ))}
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default AddReview;
