import React, { useState } from 'react';
import './Modal.css';

const Popup = ({data, val}) => {
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
  };

  return (
    <div>
      {run && (
        <div className="modal" onClick={handleClickOutside}>
            <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{data}</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
