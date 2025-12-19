import React, { useState } from 'react';
import axios from 'axios';
import apiAdmin from '../pages/adminapi';
import Navi from '../navi';
import Naviba from './naviba';

const Add_reward_1 = () => {
  const [rewardPoints, setRewardPoints] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [totalPoints, setTotalPoints] = React.useState(0);
  const [rew_data, setRew_Data] = useState([])

  // Fetch rewards from backend on mount
  React.useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await axios.get("http://localhost/get/singel/rewards");
        if (res.data.Status === "OK") {
          const rewards = res.data.data;
          setRewardPoints(rewards);

          // Calculate total
          const total = rewards.reduce((acc, val) => acc + parseInt(val), 0);
          setTotalPoints(total);
        } else {
          console.warn(res.data.message);
        }
      } catch (err) {
        console.error("Error fetching rewards:", err);
      }
    };


    fetchRewards();
    get_pay()
  }, []);


  const get_pay = () =>{
    apiAdmin.get("http://localhost/get/won/module/reward/with/upi/data")
    .then(res =>{
      if(res.data.data){
        setRew_Data(res.data.data)
      }else{

      }
    }).catch(error =>{
      console.log(error)
    })
  }

  // Add reward to backend and update local state
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      const response = await apiAdmin.post("http://localhost/add/singel/rewards", {
        data: inputValue
      }, {
        headers: {
          Authorization: "Bearer your-admin-token"
        }
      });

      if (response.data.Status === "OK") {
        setRewardPoints(prev => {
          const updated = [...prev, inputValue];
          setTotalPoints(updated.reduce((acc, val) => acc + parseInt(val), 0));
          return updated;
        });
        setInputValue('');
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Add reward error:", err);
      alert("Server Error");
    }
  };

  return (
    <div>
      <div className='Home-cnt-01-sub-01'>
        <strong>sta<span>W</span>ro</strong>
        <hr />
      </div>

      <div className='add-reward-container'>
        <h2>Add Reward</h2>
        <form onSubmit={handleSubmit} className='add-reward-form'>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Reward Points"
            required
          />
          <button type="submit" className='add-reward-button'>Add Reward</button>
        </form>
      </div>

      <h2 className='reward-list-container-h3'>Total ₹: {totalPoints}.00 ₹</h2>
      <div className='reward-list-container'>
        {rewardPoints.map((reward, index) => (
          <div key={index} className='reward-item'>
            {reward}.00 ₹
          </div>
        ))}
      </div>
      <br/>

      
      
      {rew_data.length > 0
        &&

        <>
        <h2 className='reward-list-pay-main_h2'>Pay to Users :</h2>

        <div className='reward-list-pay-main'>
          {rew_data.map((data, i) =>{

            const delet_doc_paid = () =>{
              apiAdmin.delete(`http://localhost/delet/paid/after/one/day/data/${data.reward._id}`)
              .then(res=>{
                if(res.data.Status === "OK"){
                  get_pay()
                }
              }).catch(error =>{
                console.log(error)
              })
            }


            return(
              <div key={i} className={data.upi ? "claim_one_day_cpn_01" : ""}>
                <h2>{data.upi.ac_h_nme ? data.upi.ac_h_nme : "No" }</h2><br/>
                <span>Amount : <strong>{data.reward.rupee ? data.reward.rupee : "No"}</strong> </span><br/>
                <span>Ac Hold : <strong>{data.upi.ac_h_nme ? data.upi.ac_h_nme : "No"}</strong></span><br/>
                <span>Bank : <strong>{data.upi.bank_nme ? data.upi.bank_nme : "No"}</strong></span><br/>
                <span>IFSC : <strong>{data.upi.ifsc ? data.upi.ifsc : "No"}</strong></span><br/>
                <span>Ac Hold : <strong>{data.upi.ac_h_nme ? data.upi.Acc_no : "No"}</strong></span><br/>
              
                {data.upi &&
                <div className='one_day_pid_btn' onClick={delet_doc_paid}>
                  Paid
                </div>}

              </div>
            )
          })}
        </div>
        
        </>

      }
      <br/>
      


        <Naviba />
    </div>

  );
};

export default Add_reward_1;
