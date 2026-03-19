import React from 'react'

const View_Most_Ans = () => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      
      <h1>
        View All
      </h1>

      <div className='view_main_01'>
        
        <table className='table_019' style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          
          <thead className='table_h1_01'>
            <tr>
              <th>Category</th>
              <th>Total Answers</th>
              <th>Correct</th>
              <th>Wrong</th>
            </tr>
          </thead>

          <tbody>
            <tr >
              <td>Math</td>
              <td>50</td>
              <td>40</td>
              <td>10</td>
            </tr>

            <tr >
              <td>Physics</td>
              <td>30</td>
              <td>20</td>
              <td>10</td>
            </tr>
          </tbody>

        </table>

      </div>
    </div>
  )
}


export default View_Most_Ans