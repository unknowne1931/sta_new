// PieChartComponent.js
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import apiAdmin from '../pages/adminapi';
import Naviba from './naviba';
import Loading from '../loading';

// Sample data for the pie chart


const PieChartComponent = () => {


    const [total_list, setTotal_List] = useState([]);
    const [win_data, setWin_data] = useState([]);
    const [load, setLoad] = useState(true);

    //daily data
    const [day_data_line1, setDay_Data_line1] = useState([])

    useEffect(()=>{
        GetTotal()
        GetTotalWinners()
        GetDailyDataLine01()
    },[])

    useEffect(()=>{
        const interval = setInterval(() => {
            GetTotal()
            GetTotalWinners()
          }, 5000);
      
          // Cleanup function to clear interval when component unmounts
          return () => clearInterval(interval);
    },[])

    const GetTotal = () =>{
        try{
            apiAdmin.get(`${"http://kalanirdhari.in"}/get/aal/tottttal/users`)
            .then(res =>{
                if(res.data.users){
                    setTotal_List(res.data.users)
                }else if(res.data.Logout === "OUT"){
                    localStorage.removeItem("token")
                }
                else{
                    console.warn("Unexpected error", res.data)
                }
            })
            .catch(error=>{
                if (error.response) {
                    console.error("API Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("No response from server. Please check your connection.");
                } else {
                    console.error("Error occurred:", error.message);
                }
            })
        }catch(error){
            console.log(error)
        }
        
    }

    const GetTotalWinners = () =>{
        try{
            apiAdmin.get(`${"http://kalanirdhari.in"}/get/total/users/by/winners/datas/all`)
            .then(res =>{
                if(res.data.users){
                    setWin_data(res.data.users)
                }else if(res.data.Logout === "OUT"){
                    localStorage.removeItem("token")
                }
                else{
                    console.warn("Unexpected Error", res.data)
                }
            })
            .catch(error=>{
                if (error.response) {
                    console.error("API Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("No response from server. Please check your connection.");
                } else {
                    console.error("Error occurred:", error.message);
                }
            })
        }catch(error){
            console.log(error)
        }
        
    }

    const GetDailyDataLine01 = () =>{
        try{
            setTimeout(()=>{
                apiAdmin.get(`${"http://kalanirdhari.in"}/get/data/for/linechart/01`)
                .then(res =>{
                    if(res.data.data){
                        setDay_Data_line1(res.data.data)
                        setLoad(false)
                    }else if(res.data.Logout === "OUT"){
                        localStorage.removeItem("token")
                    }
                    else{
                        setLoad(false)
                        console.warn("Unexpected Error", res.data)
                    }
                })
                .catch(error=>{
                    setLoad(false)
                    if (error.response) {
                        console.error("API Error:", error.response.status, error.response.data);
                    } else if (error.request) {
                        console.error("No response from server. Please check your connection.");
                    } else {
                        console.error("Error occurred:", error.message);
                    }
                })
            },1000)
            
        }catch(error){
            setLoad(false)
            console.log(error)
        }
        
    }



    const data = [
        { name: 'Total Players', value: total_list.length },
        { name: 'Won', value: win_data.length},
        // { name: 'Group C', value: 300 },
        // { name: 'Group D', value: 200 },
      ];

    //   const data1 = [
    //     { name: 'January', pv: 2400, amt: 2400 },
    //     { name: 'February', pv: 1398, amt: 2210 },
    //     { name: 'March', pv: 9800, amt: 2290 },
    //     { name: 'April', pv: 3908, amt: 2000 },
    //     { name: 'May', pv: 4800, amt: 2181 },
    //     { name: 'June', pv: 3800, amt: 2500 },
    //     { name: 'July', pv: 4300, amt: 2100 },
    //   ];

    const data1 = day_data_line1.map((user) => ({
        name: user.Time,
        total_users: user.len
      }));
      

      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
        {load ? <Loading /> :
        <center>
        <div className='Home-cnt-01-sub-01'>
                <strong>sta<span>W</span>ro</strong>
                <hr/>
            </div>
            <div className='admin_chart-main-cnt-01'>
                <div className='admin_chartcnt-01'>
                    <PieChart style={{ width : "100%", height: "100%"}} width={400} height={400} className='admin_chartcnt-01-picahrt-01'>
                        <Pie
                            data={data}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                
                <div className='admin_chartcnt-01'>
                    <ResponsiveContainer width="100%" height="80%">
                        <LineChart
                            data={data1}
                            // margin={{
                            // top: 5, right: 30, left: 20, bottom: 5,
                            // }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total_users" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>
            

            
            
        </center>}
        <Naviba />
    </div>    
  );
};

export default PieChartComponent;
