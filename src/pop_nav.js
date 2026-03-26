import React from 'react'

const PopNav = ({ show, navi, text, title = "⚡ Notice", onClose }) => {
  if (!show) return null;

  const handleClick = () => {
    if (navi) {
      window.location.href = `/${navi}`;
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        
        <h2 style={styles.title}>{title}</h2>
        
        <p style={styles.text}>
          {text}
        </p>

        <div style={styles.buttons}>
          <button style={styles.closeBtn} onClick={handleClick}>
            OK
          </button>
        </div>

      </div>
    </div>
  )
}

export default PopNav


// 💅 Styles
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },
  popup: {
    width: "320px",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },
  title: {
    marginBottom: "10px",
    fontSize: "18px"
  },
  text: {
    fontSize: "14px",
    marginBottom: "20px"
  },
  buttons: {
    display: "flex",
    justifyContent: "center"
  },
  closeBtn: {
    background: "#000000",
    color: "#fff",
    border: "none",
    width : "95%",
    padding : "10px",
    borderRadius: "8px",
    cursor: "pointer"
  }
}