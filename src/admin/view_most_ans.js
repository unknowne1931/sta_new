import axios from 'axios'
import React, { useEffect, useState } from 'react'

const View_Most_Ans = () => {

  const [data, setData] = useState([])

  const data_fetch = () => {
    axios.get("http://localhost/get/calculate/data/monitor/main")
      .then(res => {
        if (res.data) {
          setData(res.data.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    data_fetch()
  }, [])

  return (
    <div style={containerStyle}>
      
      <h1 style={titleStyle}>📊 Performance Dashboard</h1>

      <div style={cardStyle}>
        
        <table style={tableStyle}>
          
          <thead style={theadStyle}>
            <tr>
              <th style={thStyle}>📚 Category</th>
              <th style={thStyle}>📈 Total</th>
              <th style={thStyle}>✅ Correct</th>
              <th style={thStyle}>❌ Wrong</th>
              <th style={thStyle}>Seconds</th>
            </tr>
          </thead>

          <tbody>
            {
              data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index} style={rowStyle}>
                    
                    <td style={tdStyle}>{item.cat}</td>
                    
                    <td style={tdStyle}>
                      <span style={totalBadge}>{item.count}</span>
                    </td>

                    <td style={tdStyle}>
                      <span style={correctBadge}>
                        {item.yes?.length || 0}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <span style={wrongBadge}>
                        {item.no?.length || 0}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <span>{item.seconds.map((sec=>{
                        return(
                          <span>{sec}</span>
                        )
                      }))}</span>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={emptyStyle}>
                    🚫 No Data Found
                  </td>
                </tr>
              )
            }
          </tbody>

        </table>

      </div>
    </div>
  )
}

/* 🔥 Styles */

const containerStyle = {
  padding: "30px",
  background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
  minHeight: "100vh",
  fontFamily: "sans-serif"
}

const titleStyle = {
  marginBottom: "20px",
  fontSize: "28px",
  fontWeight: "bold",
  color: "#1e293b"
}

const cardStyle = {
  background: "#fff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
}

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse"
}

const theadStyle = {
  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
  color: "#fff"
}

const thStyle = {
  padding: "14px",
  textAlign: "center",
  fontSize: "15px"
}

const rowStyle = {
  textAlign: "center",
  borderBottom: "1px solid #eee",
  transition: "0.3s",
  cursor: "pointer"
}

const tdStyle = {
  padding: "14px",
  fontSize: "14px"
}

/* 🎯 Badges */

const totalBadge = {
  background: "#e0e7ff",
  padding: "6px 12px",
  borderRadius: "20px",
  fontWeight: "bold",
  color: "#3730a3"
}

const correctBadge = {
  background: "#dcfce7",
  padding: "6px 12px",
  borderRadius: "20px",
  fontWeight: "bold",
  color: "#15803d"
}

const wrongBadge = {
  background: "#fee2e2",
  padding: "6px 12px",
  borderRadius: "20px",
  fontWeight: "bold",
  color: "#b91c1c"
}

const emptyStyle = {
  padding: "30px",
  textAlign: "center",
  color: "#888"
}

export default View_Most_Ans