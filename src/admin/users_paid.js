import React, { useEffect, useState } from "react";

function Paid_Users() {
  const [Users_Paid, setUsers_Paid] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // TIME FORMATTER
  // =========================
  function Time(utcTime) {
    if (!utcTime) return "";

    return new Date(utcTime).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    });
  }

  useEffect(() => {
          document.body.style.backgroundColor = "#05467cff";
  
          return () => {
              document.body.style.backgroundColor = "";
          };
      }, []);

  // =========================
  // ₹ STRING → INTEGER
  // =========================
  function rupeeToInt(value) {
    if (!value) return 0;

    return (
      parseInt(
        value
          .toString()
          .replace("₹", "")
          .replace(/,/g, "")
          .trim(),
        10
      ) || 0
    );
  }

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    fetch("http://192.168.31.133/get/paid/user/list")
      .then(res => res.json())
      .then(data => {
        if (data.Status === "OK") {
          setUsers_Paid(data.data);
          setFilteredUsers(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // =========================
  // FILTER LOGIC
  // =========================
  const filterByDate = () => {
    if (!fromDate || !toDate) {
      setFilteredUsers(Users_Paid);
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999);

    const result = Users_Paid.filter(user => {
      if (!user.createdAt) return false;
      const userDate = new Date(user.createdAt);
      return userDate >= from && userDate <= to;
    });

    setFilteredUsers(result);
  };

  // =========================
  // RESET FILTER
  // =========================
  const resetFilter = () => {
    setFromDate("");
    setToDate("");
    setFilteredUsers(Users_Paid);
  };

  // =========================
  // TOTAL AMOUNT (CALCULATED)
  // =========================
  const totalAmount = filteredUsers.reduce((sum, user) => {
    return sum + rupeeToInt(user.title);
  }, 0);

  // =========================
  // UI
  // =========================
  if (loading) {
    return <p>Loading paid users...</p>;
  }

  return (
    <div>
      <h2>Paid Users</h2>

      <div className="paid_date_selecccttt">
        <input
          type="date"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
        />
        <br/>

        <input
          type="date"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
        />


        <button onClick={filterByDate}>
          Filter
        </button>

        <button onClick={resetFilter} >
          Reset
        </button>
      </div>
      <br/>

      <h3 className="paid_data_h3_total">
        Total Reward: ₹{totalAmount.toLocaleString("en-IN")}
      </h3>

      <table className="paid_tabel">
        <thead>
          <tr>
            <th>User</th>
            <th>Reward</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="3" align="center">
                No users found
              </td>
            </tr>
          ) : (
            filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.user}</td>
                <td>{user.title}</td>
                <td>{Time(user.createdAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* TOTAL */}
      
    </div>
  );
}

export default Paid_Users;
