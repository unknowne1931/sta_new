import React, { useEffect, useState } from 'react';
import Loading from '../loading';
import { getFromDB, saveToDB } from '../db';

const Cupons = () => {
  const [cuponData, setCuponData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [load, setLoad] = useState(true);

  // ⏱️ Check if cache is expired
  const isExpired = (timestamp) => {
    return (Date.now() - timestamp) > 60000; // 1 minute
  };

  // 🌐 Fetch Cupons from API
  const GetCupon = () => {
    try {
      setTimeout(() => {
        fetch(`http://192.168.31.133/get/cupon/get/all/datas`)
          .then(res => res.json())
          .then(data => {
            if (data.data) {
              saveToDB("cupons_data", { data: data.data, timestamp: Date.now() });
              setCuponData(data.data);
              setLoad(false);
            } else {
              setLoad(false);
              console.warn("Unexpected response structure:", data);
            }
          })
          .catch(error => {
            setLoad(false);
            console.error("Fetch error:", error);
          });
      }, 5000);
    } catch (error) {
      setLoad(false);
      console.error("Unexpected error:", error);
    }
  };

  // 📦 Load cached Cupons or fetch fresh
  useEffect(() => {
    const getCached = async () => {
      const cached = await getFromDB("cupons_data");

      if (cached && !isExpired(cached.timestamp)) {
        setCuponData(cached.data);
        setLoad(false);
        console.log("Loaded from IndexedDB");
      } else {
        GetCupon();
      }
    };

    getCached();

    const interval = setInterval(() => {
      console.log("Refreshing coupon data...");
      getCached();
    }, 60000); // every 1 minute

    return () => clearInterval(interval);
  }, []);

  // 🧑‍🤝‍🧑 Fetch user names after cuponData is loaded
  useEffect(() => {
    if (cuponData.length === 0) return;

    const loadUsernames = async () => {
      const cache = await getFromDB("cupon_name_cnt");

      if (cache && Array.isArray(cache)) {
        setUserData(cache);
        console.log("Loaded usernames from DB");
      } else {
        const userList = [];

        for (let i = 0; i < cuponData.length; i++) {
          try {
            const res = await fetch(`http://192.168.31.133/get/singel/user/won/data/${i + 1}`);
            const json = await res.json();

            if (json.data) {
              const entry = { id: i, ...json.data };
              userList.push(entry);
            }
          } catch (error) {
            console.warn("User fetch failed for index", i, error);
          }
        }

        setUserData(userList);
        saveToDB("cupon_name_cnt", userList);
      }
    };

    loadUsernames();
  }, [cuponData]);

  // 🖼️ UI
  return (
    <div>
      {load ? (
        <Loading />
      ) : (
        <center>
          <div className='Home-cnt-01-sub-01'>
            <strong>sta<span>W</span>ro</strong>
            <hr />
          </div>

          <div className='cupons_h1-01'>
            <h1>Cupons</h1>
          </div>

          <div className="cart-page-main-cnt-02-sub-cnt-01">
            {cuponData.map((data, index) => {
              const fetched = userData.find(user => user.id === index);

              return (
                <div key={index} className='cart_new_sub_cnt-01'>
                  <strong>{data.title}</strong>
                  <div className='cart_page_rank_cnt-01'>
                    <span>Rank : {index + 1}</span>
                  </div>
                  <div className='cart_new_sub_cnt-01-img-cnt-01'>
                    <img src={data.img} alt="Cupon" />
                  </div>
                  <span className='cart_new_sub_cnt-01-span-01'>{data.body}</span>

                  {fetched && (
                    <div className='cart_new_sub_cnt-01-span-01-span-02'>
                      <div className='cart_new_sub_cnt-01-span-01-span-02-top'>
                        <strong>claimed</strong>
                      </div>
                      <span>{fetched.username}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </center>
      )}
    </div>
  );
};

export default Cupons;
