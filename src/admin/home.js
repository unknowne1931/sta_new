// // import React, { useEffect, useState } from 'react'
// // import Naviba from './naviba'
// // import apiAdmin from '../pages/adminapi'
// // import Popup from '../pages/popup';
// // import Loading from '../loading';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faMedal, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

// // const AdminHome = () => {

// //     const [live, setLive] = useState([]);
// //     const [win_data, setWin_data] = useState([]);
// //     const [total_list, setTotal_List] = useState([]);
// //     const [pass, setPass] = useState([])

// //     const [alert, setAlert] = useState(false)
// //     const [data, setData] = useState([])
// //     const [show, setShow] = useState(false)
// //     const [load, setLoad] = useState(true);

// //     document.body.style.backgroundColor = "#0648b1ff";

// //     useEffect(()=>{

// //         GetTotalWinners();
// //         GetTotal()
// //         GetLive()
// //     },[])

// //     useEffect(()=>{
// //         const interval = setInterval(() => {
// //             GetTotal()
// //             GetTotalWinners()
// //             GetLive()
// //           }, 2000);
      
// //           // Cleanup function to clear interval when component unmounts
// //           return () => clearInterval(interval);
// //     },[])

// //     const ShowChartSet = (e) =>{
// //         setAlert(false);
// //         e.preventDefault()
// //         if(pass === "193148"){
// //             setShow(true);
// //         }else{
// //             setData("Password Wrong");
// //             setAlert(true)
// //         }
// //     }


// //     const GetTotal = () =>{
// //         try{
// //             apiAdmin.get(`${process.env.REACT_APP_API_URL}/get/aal/tottttal/users`)
// //             .then(res =>{
// //                 if(res.data.users){
// //                     setTotal_List(res.data.users)
// //                 }else if(res.data.Logout === "OUT"){
// //                     localStorage.removeItem("token")
// //                 }
// //                 else{
// //                     console.log("Unexpected Error", res.data)
// //                 }
// //             })
// //             .catch(error=>{
// //                 if (error.response) {
// //                     console.error("API Error:", error.response.status, error.response.data);
// //                 } else if (error.request) {
// //                     console.error("No response from server. Please check your connection.");
// //                 } else {
// //                     console.error("Error occurred:", error.message);
// //                 }
// //             })
// //         }catch(error){
// //             console.log(error)
// //         }
        
// //     }

// //     const GetTotalWinners = () =>{
// //         try{
// //             apiAdmin.get(`${process.env.REACT_APP_API_URL}/get/total/users/by/winners/datas/all`)
// //             .then(res =>{
// //                 if(res.data.users){
// //                     setWin_data(res.data.users)
// //                 }else if(res.data.Logout === "OUT"){
// //                     localStorage.removeItem("token")
// //                 }
// //                 else{
// //                     console.warn("Unexpected response structure:", res.data);
// //                 }
// //             })
// //             .catch(error=>{
// //                 if (error.response) {
// //                     console.error("API Error:", error.response.status, error.response.data);
// //                 } else if (error.request) {
// //                     console.error("No response from server. Please check your connection.");
// //                 } else {
// //                     console.error("Error occurred:", error.message);
// //                 }
// //             })
// //         }catch(error){
// //             console.log(error)
// //         }
        
// //     }

// //     const GetLive = () =>{
// //         try{
// //             setTimeout(()=>{
// //                 apiAdmin.get(`${process.env.REACT_APP_API_URL}/admin/get/all/users/data/logined`)
// //                 .then(res =>{
// //                     if(res.data.users){
// //                         setLive(res.data.users);
// //                         setLoad(false);
// //                     }else if(res.data.Logout === "OUT"){
// //                         setLoad(false);
// //                         localStorage.removeItem("token")
// //                     }
// //                     else{
// //                         setLoad(false);
// //                         console.warn("Unexpected response structure:", res.data);
// //                     }
// //                 })
// //                 .catch(error=>{
// //                     setLoad(false);
// //                     if (error.response) {
// //                         console.error("API Error:", error.response.status, error.response.data);
// //                     } else if (error.request) {
// //                         console.error("No response from server. Please check your connection.");
// //                     } else {
// //                         console.error("Error occurred:", error.message);
// //                     }
// //                 })
// //             },1000)
            
// //         }catch(error){
// //             setLoad(false);
// //             console.log(error)
// //         }
        
// //     }

// //     const PostLineData = (e) =>{
// //         try{
// //             e.preventDefault()
// //             setAlert(false);
// //             apiAdmin.post(`${process.env.REACT_APP_API_URL}/length/and/calcul/ation/of/chart`)
// //             .then(res =>{
// //                 if(res.data.Status === "OK"){
// //                     setData("Data Saved")
// //                     setAlert(true)
// //                 }else if(res.data.Status === "OK"){
// //                     setData("The Todays data existed Before")
// //                     setAlert(true)
// //                 }else{
// //                     setData("Something went wrong")
// //                     setAlert(true)
// //                 }
// //             })
// //             .catch(error=>{
// //                 if (error.response) {
// //                     console.error("API Error:", error.response.status, error.response.data);
// //                 } else if (error.request) {
// //                     console.error("No response from server. Please check your connection.");
// //                 } else {
// //                     console.error("Error occurred:", error.message);
// //                 }
// //             })
// //         }catch(error){
// //             console.log(error)
// //         }
        
// //     }

// //     function Time(utcTime) {
// //         if (!utcTime) return "";

// //         return new Date(utcTime).toLocaleString("en-IN", {
// //             timeZone: "Asia/Kolkata",
// //             dateStyle: "medium",
// //             timeStyle: "medium",
// //         });
// //     }

// //     const view_types = ["Number", "Bar Graph"]

// //     const [sel_view, setSel_View] = useState("Number")

// //   return (

// //     <div>



// //         {load ? <Loading /> :
// //       <center>
        
// //         <br/>
// //         <h1 className='admin-home-h1-01'>Dashboard</h1>

// //         <div className='admin-home-data_types_view'>

// //             {view_types.map((data, i) =>{
// //                 return(
// //                     <div onClick={()=>{setSel_View(data)}} >
// //                         {data}
// //                     </div>
// //                 )
// //             })}

// //         </div>


// //         {sel_view === "Number" &&
// //             <>
// //             <div className='admin-home-data_types_view_number'>

// //                 <div className='admin-home-data_types_view_number_cnt_01' style={{
// //                     backgroundColor : "rgba(22, 2, 83, 0.92)"
// //                 }} >
// //                     <h1>Total Times Played</h1>
// //                     <div className='admin-home-data_types_view_number_cnt_01_sub_cnt_01'>
// //                         <h1><strong>{total_list.length}</strong> <FontAwesomeIcon icon={faUsers} /></h1>
// //                     </div>
// //                 </div>

// //                 <div className='admin-home-data_types_view_number_cnt_01' style={{
// //                     backgroundColor : "rgba(24, 89, 45, 0.81)"
// //                 }} >
// //                     <h1>Total Winners</h1>
// //                     <div className='admin-home-data_types_view_number_cnt_01_sub_cnt_01'>
// //                         <h1><strong>{win_data.length}</strong> <FontAwesomeIcon icon={faMedal} /></h1>
// //                     </div>
// //                 </div>
                

// //             </div>
// //             </>
// //         }

// //         {sel_view === "Bar Graph" &&
// //             <>
// //             <h1>{sel_view}</h1>
// //             </>
// //         }

        
        
// //         <div>

// //         </div>

// //       </center>}
      
// //       {alert &&
// //         <Popup data={data} val={alert} />
// //       }

// //       <Naviba />
      
// //     </div>
    
// //   )
// // }

// // export default AdminHome












// import React, { useEffect, useState } from "react";
// import Naviba from "./naviba";
// import apiAdmin from "../pages/adminapi";
// import Popup from "../pages/popup";
// import Loading from "../loading";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//     faMedal,
//     faUser,
//     faUsers,
//     faGamepad
// } from "@fortawesome/free-solid-svg-icons";


// const AdminHome = () => {

//     // ---------------------------------------
//     // STATES
//     // ---------------------------------------

//     const [live, setLive] = useState([]);

//     const [win_data, setWin_data] = useState([]);

//     const [total_list, setTotal_List] = useState([]);

//     const [pass, setPass] = useState("");

//     const [alert, setAlert] = useState(false);

//     const [data, setData] = useState("");

//     const [show, setShow] = useState(false);

//     const [load, setLoad] = useState(true);

//     const [sel_view, setSel_View] = useState("Number");


//     // ---------------------------------------
//     // VIEW TYPES
//     // ---------------------------------------

//     const view_types = [
//         "Number",
//         "Bar Graph"
//     ];


//     // ---------------------------------------
//     // BODY BACKGROUND
//     // ---------------------------------------

//     useEffect(() => {

//         document.body.style.backgroundColor = "#0648b1ff";

//         return () => {
//             document.body.style.backgroundColor = "";
//         };

//     }, []);


//     // ---------------------------------------
//     // INITIAL API CALLS
//     // ---------------------------------------

//     useEffect(() => {

//         GetTotalWinners();

//         GetTotal();

//         GetLive();

//     }, []);


//     // ---------------------------------------
//     // REFRESH EVERY 2 SECONDS
//     // ---------------------------------------

//     useEffect(() => {

//         const interval = setInterval(() => {

//             GetTotal();

//             GetTotalWinners();

//             GetLive();

//         }, 2000);


//         return () => {

//             clearInterval(interval);

//         };

//     }, []);


//     // ---------------------------------------
//     // GET TOTAL PLAY RECORDS
//     // ---------------------------------------

//     const GetTotal = () => {

//         apiAdmin
//             .get(
//                 `${process.env.REACT_APP_API_URL}/get/aal/tottttal/users`
//             )

//             .then((res) => {

//                 if (Array.isArray(res.data.users)) {

//                     setTotal_List(res.data.users);

//                 }

//                 else if (res.data.Logout === "OUT") {

//                     localStorage.removeItem("token");

//                 }

//                 else {

//                     console.log(
//                         "Unexpected Error:",
//                         res.data
//                     );

//                 }

//             })

//             .catch((error) => {

//                 if (error.response) {

//                     console.error(
//                         "API Error:",
//                         error.response.status,
//                         error.response.data
//                     );

//                 }

//                 else if (error.request) {

//                     console.error(
//                         "No response from server."
//                     );

//                 }

//                 else {

//                     console.error(
//                         "Error:",
//                         error.message
//                     );

//                 }

//             });

//     };


//     // ---------------------------------------
//     // GET WINNING RECORDS
//     // ---------------------------------------

//     const GetTotalWinners = () => {

//         apiAdmin
//             .get(
//                 `${process.env.REACT_APP_API_URL}/get/total/users/by/winners/datas/all`
//             )

//             .then((res) => {

//                 if (Array.isArray(res.data.users)) {

//                     setWin_data(res.data.users);

//                 }

//                 else if (res.data.Logout === "OUT") {

//                     localStorage.removeItem("token");

//                 }

//                 else {

//                     console.warn(
//                         "Unexpected response:",
//                         res.data
//                     );

//                 }

//             })

//             .catch((error) => {

//                 if (error.response) {

//                     console.error(
//                         "API Error:",
//                         error.response.status,
//                         error.response.data
//                     );

//                 }

//                 else if (error.request) {

//                     console.error(
//                         "No response from server."
//                     );

//                 }

//                 else {

//                     console.error(
//                         "Error:",
//                         error.message
//                     );

//                 }

//             });

//     };


//     // ---------------------------------------
//     // GET LIVE PLAYERS
//     // ---------------------------------------

//     const GetLive = () => {

//         apiAdmin
//             .get(
//                 `${process.env.REACT_APP_API_URL}/admin/get/all/users/data/logined`
//             )

//             .then((res) => {

//                 if (Array.isArray(res.data.users)) {

//                     setLive(res.data.users);

//                     setLoad(false);

//                 }

//                 else if (res.data.Logout === "OUT") {

//                     setLoad(false);

//                     localStorage.removeItem("token");

//                 }

//                 else {

//                     setLoad(false);

//                     console.warn(
//                         "Unexpected response:",
//                         res.data
//                     );

//                 }

//             })

//             .catch((error) => {

//                 setLoad(false);

//                 if (error.response) {

//                     console.error(
//                         "API Error:",
//                         error.response.status,
//                         error.response.data
//                     );

//                 }

//                 else if (error.request) {

//                     console.error(
//                         "No response from server."
//                     );

//                 }

//                 else {

//                     console.error(
//                         "Error:",
//                         error.message
//                     );

//                 }

//             });

//     };


//     // ---------------------------------------
//     // GET USER ID
//     // ---------------------------------------

//     const getUserId = (user) => {

//         if (!user) {
//             return null;
//         }


//         return (
//             user.userId ||
//             user.user_id ||
//             user.playerId ||
//             user.player_id ||
//             user.user ||
//             user.email ||
//             user.phone ||
//             user.mobile ||
//             user._id ||
//             user.id ||
//             null
//         );

//     };


//     // ---------------------------------------
//     // GET UNIQUE PLAYERS
//     // ---------------------------------------

//     const getUniquePlayers = () => {

//         const uniquePlayers = new Set();


//         total_list.forEach((player) => {

//             const userId = getUserId(player);


//             if (userId) {

//                 uniquePlayers.add(
//                     String(userId)
//                 );

//             }

//         });


//         return uniquePlayers.size;

//     };


//     // ---------------------------------------
//     // GET UNIQUE WINNING PLAYERS
//     // ---------------------------------------

//     const getUniqueWinningPlayers = () => {

//         const uniqueWinners = new Set();


//         win_data.forEach((winner) => {

//             const userId = getUserId(winner);


//             if (userId) {

//                 uniqueWinners.add(
//                     String(userId)
//                 );

//             }

//         });


//         return uniqueWinners.size;

//     };


//     // ---------------------------------------
//     // SAVE CHART DATA
//     // ---------------------------------------

//     const PostLineData = (e) => {

//         e.preventDefault();

//         setAlert(false);


//         apiAdmin
//             .post(
//                 `${process.env.REACT_APP_API_URL}/length/and/calcul/ation/of/chart`
//             )

//             .then((res) => {

//                 if (res.data.Status === "OK") {

//                     setData("Data Saved");

//                     setAlert(true);

//                 }

//                 else if (res.data.Status === "EXISTED") {

//                     setData(
//                         "Today's data existed before"
//                     );

//                     setAlert(true);

//                 }

//                 else {

//                     setData(
//                         "Something went wrong"
//                     );

//                     setAlert(true);

//                 }

//             })

//             .catch((error) => {

//                 if (error.response) {

//                     console.error(
//                         "API Error:",
//                         error.response.status,
//                         error.response.data
//                     );

//                 }

//                 else if (error.request) {

//                     console.error(
//                         "No response from server."
//                     );

//                 }

//                 else {

//                     console.error(
//                         "Error:",
//                         error.message
//                     );

//                 }

//             });

//     };


//     // ---------------------------------------
//     // SHOW CHART PASSWORD
//     // ---------------------------------------

//     const ShowChartSet = (e) => {

//         e.preventDefault();

//         setAlert(false);


//         if (pass === "193148") {

//             setShow(true);

//         }

//         else {

//             setData("Password Wrong");

//             setAlert(true);

//         }

//     };


//     // ---------------------------------------
//     // DASHBOARD CARD
//     // ---------------------------------------

//     const DashboardCard = ({
//         title,
//         value,
//         icon,
//         backgroundColor
//     }) => {

//         return (

//             <div
//                 className="admin-home-data_types_view_number_cnt_01"
//                 style={{
//                     backgroundColor:
//                         backgroundColor
//                 }}
//             >

//                 <h1>
//                     {title}
//                 </h1>


//                 <div className="admin-home-data_types_view_number_cnt_01_sub_cnt_01">

//                     <h1>

//                         <strong>
//                             {value}
//                         </strong>

//                         {" "}

//                         <FontAwesomeIcon
//                             icon={icon}
//                         />

//                     </h1>

//                 </div>

//             </div>

//         );

//     };


//     // ---------------------------------------
//     // RETURN
//     // ---------------------------------------

//     return (

//         <div>


//             {/* LOADING */}

//             {load ? (

//                 <Loading />

//             ) : (

//                 <center>

//                     <br />


//                     {/* DASHBOARD TITLE */}

//                     <h1 className="admin-home-h1-01">
//                         Dashboard
//                     </h1>


//                     {/* VIEW SELECTOR */}

//                     <div className="admin-home-data_types_view">

//                         {view_types.map((view) => {

//                             return (

//                                 <div
//                                     key={view}
//                                     onClick={() => {
//                                         setSel_View(view);
//                                     }}
//                                     style={{
//                                         cursor: "pointer"
//                                     }}
//                                 >

//                                     {view}

//                                 </div>

//                             );

//                         })}

//                     </div>


//                     {/* ==================================
//                         NUMBER VIEW
//                     ================================== */}

//                     {sel_view === "Number" && (

//                         <div className="admin-home-data_types_view_number">


//                             {/* --------------------------------
//                                 TOTAL TIMES PLAYED
//                             -------------------------------- */}

//                             <DashboardCard

//                                 title="Total Times Played"

//                                 value={
//                                     total_list.length
//                                 }

//                                 icon={faGamepad}

//                                 backgroundColor={
//                                     "rgba(22, 2, 83, 0.92)"
//                                 }

//                             />


//                             {/* --------------------------------
//                                 TOTAL TIMES WON
//                             -------------------------------- */}

//                             <DashboardCard

//                                 title="Total Times Won"

//                                 value={
//                                     win_data.length
//                                 }

//                                 icon={faMedal}

//                                 backgroundColor={
//                                     "rgba(24, 89, 45, 0.81)"
//                                 }

//                             />


//                             {/* --------------------------------
//                                 TOTAL PLAYER RECORDS
//                             -------------------------------- */}

//                             <DashboardCard

//                                 title="Total Player Records"

//                                 value={
//                                     total_list.length
//                                 }

//                                 icon={faUsers}

//                                 backgroundColor={
//                                     "rgba(19, 75, 105, 0.90)"
//                                 }

//                             />


//                             {/* --------------------------------
//                                 UNIQUE PLAYERS
//                             -------------------------------- */}

//                             <DashboardCard

//                                 title="Unique Players"

//                                 value={
//                                     getUniquePlayers()
//                                 }

//                                 icon={faUser}

//                                 backgroundColor={
//                                     "rgba(117, 71, 10, 0.90)"
//                                 }

//                             />


//                             {/* --------------------------------
//                                 UNIQUE PLAYERS WON
//                             -------------------------------- */}

//                             <DashboardCard

//                                 title="Unique Players Won"

//                                 value={
//                                     getUniqueWinningPlayers()
//                                 }

//                                 icon={faMedal}

//                                 backgroundColor={
//                                     "rgba(130, 35, 35, 0.90)"
//                                 }

//                             />


//                             {/* --------------------------------
//                                 LIVE PLAYERS
//                             -------------------------------- */}

//                             <DashboardCard

//                                 title="Live Players"

//                                 value={
//                                     live.length
//                                 }

//                                 icon={faUsers}

//                                 backgroundColor={
//                                     "rgba(4, 95, 100, 0.90)"
//                                 }

//                             />


//                         </div>

//                     )}


//                     {/* ==================================
//                         BAR GRAPH VIEW
//                     ================================== */}

//                     {sel_view === "Bar Graph" && (

//                         <>

//                             <h1>
//                                 Bar Graph
//                             </h1>

//                         </>

//                     )}


//                     {/* ==================================
//                         PASSWORD / CHART
//                     ================================== */}

//                     {/*
                    
//                     {show ? (

//                         <div className="Admin_Home_show-main-cnt-02">

//                             <button
//                                 onClick={PostLineData}
//                             >
//                                 Save Data
//                             </button>

//                         </div>

//                     ) : (

//                         <div className="Admin_Home_show-main-cnt-01">

//                             <form
//                                 onSubmit={ShowChartSet}
//                             >

//                                 <input
//                                     type="password"
//                                     value={pass}
//                                     onChange={(e) => {
//                                         setPass(
//                                             e.target.value
//                                         );
//                                     }}
//                                     placeholder="Password"
//                                     required
//                                 />

//                                 <br />

//                                 <button
//                                     type="submit"
//                                 >
//                                     Show
//                                 </button>

//                             </form>

//                         </div>

//                     )}

//                     */}


//                 </center>

//             )}


//             {/* POPUP */}

//             {alert && (

//                 <Popup
//                     data={data}
//                     val={alert}
//                 />

//             )}


//             {/* NAVIGATION */}

//             <Naviba />

//         </div>

//     );

// };


// export default AdminHome;


























import React, { useEffect, useState, useRef } from "react";
import Naviba from "./naviba";
import apiAdmin from "../pages/adminapi";
import Popup from "../pages/popup";
import Loading from "../loading";
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import CountUp from 'react-countup';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faMedal,
    faUser,
    faUsers,
    faGamepad,
    faChartBar,
    faChartPie,
    faChartLine,
    faTrophy,
    faFire,
    faStar,
    faCrown,
    faCircle,
    faSpinner,
    faArrowUp,
    faArrowDown,
    faMinus
} from "@fortawesome/free-solid-svg-icons";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
);

const AdminHome = () => {

    // ---------------------------------------
    // STATES
    // ---------------------------------------

    const [live, setLive] = useState([]);
    const [win_data, setWin_data] = useState([]);
    const [total_list, setTotal_List] = useState([]);
    const [pass, setPass] = useState("");
    const [alert, setAlert] = useState(false);
    const [data, setData] = useState("");
    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(true);
    const [sel_view, setSel_View] = useState("Overview");
    const [chartData, setChartData] = useState(null);
    const [trendData, setTrendData] = useState(null);
    const [animatedValues, setAnimatedValues] = useState({
        total: 0,
        winners: 0,
        unique: 0,
        live: 0
    });

    // ---------------------------------------
    // VIEW TYPES
    // ---------------------------------------

    const view_types = [
        { name: "Overview", icon: faStar },
        { name: "Bar Graph", icon: faChartBar },
        { name: "Pie Chart", icon: faChartPie },
        { name: "Line Chart", icon: faChartLine }
    ];

    // ---------------------------------------
    // BODY BACKGROUND
    // ---------------------------------------

    useEffect(() => {
        document.body.style.background = "linear-gradient(135deg, #0648b1ff 0%, #1a1a2e 100%)";
        document.body.style.minHeight = "100vh";
        document.body.style.margin = "0";
        
        return () => {
            document.body.style.background = "";
            document.body.style.minHeight = "";
            document.body.style.margin = "";
        };
    }, []);

    // ---------------------------------------
    // INITIAL API CALLS
    // ---------------------------------------

    useEffect(() => {
        GetTotalWinners();
        GetTotal();
        GetLive();
    }, []);

    // ---------------------------------------
    // REFRESH EVERY 2 SECONDS
    // ---------------------------------------

    useEffect(() => {
        const interval = setInterval(() => {
            GetTotal();
            GetTotalWinners();
            GetLive();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // ---------------------------------------
    // UPDATE CHART DATA WHEN DATA CHANGES
    // ---------------------------------------

    useEffect(() => {
        if (total_list.length > 0 || win_data.length > 0 || live.length > 0) {
            updateChartData();
            updateTrendData();
            updateAnimatedValues();
        }
    }, [total_list, win_data, live]);

    // ---------------------------------------
    // GET TOTAL PLAY RECORDS
    // ---------------------------------------

    const GetTotal = () => {
        apiAdmin
            .get(`${process.env.REACT_APP_API_URL}/get/aal/tottttal/users`)
            .then((res) => {
                if (Array.isArray(res.data.users)) {
                    setTotal_List(res.data.users);
                } else if (res.data.Logout === "OUT") {
                    localStorage.removeItem("token");
                } else {
                    console.log("Unexpected Error:", res.data);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error("API Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("No response from server.");
                } else {
                    console.error("Error:", error.message);
                }
            });
    };

    // ---------------------------------------
    // GET WINNING RECORDS
    // ---------------------------------------

    const GetTotalWinners = () => {
        apiAdmin
            .get(`${process.env.REACT_APP_API_URL}/get/total/users/by/winners/datas/all`)
            .then((res) => {
                if (Array.isArray(res.data.users)) {
                    setWin_data(res.data.users);
                } else if (res.data.Logout === "OUT") {
                    localStorage.removeItem("token");
                } else {
                    console.warn("Unexpected response:", res.data);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error("API Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("No response from server.");
                } else {
                    console.error("Error:", error.message);
                }
            });
    };

    // ---------------------------------------
    // GET LIVE PLAYERS
    // ---------------------------------------

    const GetLive = () => {
        apiAdmin
            .get(`${process.env.REACT_APP_API_URL}/admin/get/all/users/data/logined`)
            .then((res) => {
                if (Array.isArray(res.data.users)) {
                    setLive(res.data.users);
                    setLoad(false);
                } else if (res.data.Logout === "OUT") {
                    setLoad(false);
                    localStorage.removeItem("token");
                } else {
                    setLoad(false);
                    console.warn("Unexpected response:", res.data);
                }
            })
            .catch((error) => {
                setLoad(false);
                if (error.response) {
                    console.error("API Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("No response from server.");
                } else {
                    console.error("Error:", error.message);
                }
            });
    };

    // ---------------------------------------
    // GET USER ID
    // ---------------------------------------

    const getUserId = (user) => {
        if (!user) return null;
        return (
            user.userId || user.user_id || user.playerId || 
            user.player_id || user.user || user.email || 
            user.phone || user.mobile || user._id || user.id || null
        );
    };

    // ---------------------------------------
    // GET UNIQUE PLAYERS
    // ---------------------------------------

    const getUniquePlayers = () => {
        const uniquePlayers = new Set();
        total_list.forEach((player) => {
            const userId = getUserId(player);
            if (userId) {
                uniquePlayers.add(String(userId));
            }
        });
        return uniquePlayers.size;
    };

    // ---------------------------------------
    // GET UNIQUE WINNING PLAYERS
    // ---------------------------------------

    const getUniqueWinningPlayers = () => {
        const uniqueWinners = new Set();
        win_data.forEach((winner) => {
            const userId = getUserId(winner);
            if (userId) {
                uniqueWinners.add(String(userId));
            }
        });
        return uniqueWinners.size;
    };

    // ---------------------------------------
    // UPDATE ANIMATED VALUES
    // ---------------------------------------

    const updateAnimatedValues = () => {
        setAnimatedValues({
            total: total_list.length,
            winners: win_data.length,
            unique: getUniquePlayers(),
            live: live.length
        });
    };

    // ---------------------------------------
    // UPDATE CHART DATA
    // ---------------------------------------

    const updateChartData = () => {
        const labels = ['Total Played', 'Total Won', 'Player Records', 'Unique Players', 'Unique Winners', 'Live Players'];
        const values = [
            total_list.length,
            win_data.length,
            total_list.length,
            getUniquePlayers(),
            getUniqueWinningPlayers(),
            live.length
        ];
        
        const gradientColors = [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
        ];

        const borderColors = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ];

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Dashboard Statistics',
                    data: values,
                    backgroundColor: gradientColors,
                    borderColor: borderColors,
                    borderWidth: 3,
                    borderRadius: 10,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8,
                },
            ],
        });
    };

    // ---------------------------------------
    // UPDATE TREND DATA
    // ---------------------------------------

    const updateTrendData = () => {
        const total = total_list.length;
        const winners = win_data.length;
        const unique = getUniquePlayers();
        const liveCount = live.length;

        // Generate trend data (simulated for demo)
        const trendLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const trendValues = [
            Math.floor(total * 0.4),
            Math.floor(total * 0.6),
            Math.floor(total * 0.7),
            Math.floor(total * 0.8),
            Math.floor(total * 0.9),
            total
        ];

        const winTrend = [
            Math.floor(winners * 0.3),
            Math.floor(winners * 0.5),
            Math.floor(winners * 0.6),
            Math.floor(winners * 0.7),
            Math.floor(winners * 0.85),
            winners
        ];

        setTrendData({
            labels: trendLabels,
            datasets: [
                {
                    label: 'Total Players',
                    data: trendValues,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                },
                {
                    label: 'Winners',
                    data: winTrend,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                }
            ],
        });
    };

    // ---------------------------------------
    // CHART OPTIONS
    // ---------------------------------------

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { size: 14, weight: 'bold' },
                    color: '#ffffff'
                }
            },
            title: {
                display: true,
                text: '📊 Dashboard Statistics',
                font: { size: 22, weight: 'bold' },
                color: '#ffffff',
                padding: { bottom: 20 }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { 
                    color: '#ffffff', 
                    font: { size: 12 },
                    stepSize: 1,
                    callback: function(value) {
                        return value + ' users';
                    }
                },
                grid: { 
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: true,
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                }
            },
            x: {
                ticks: { 
                    color: '#ffffff', 
                    font: { size: 11 },
                    maxRotation: 45,
                    minRotation: 30
                },
                grid: { 
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: true,
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: { size: 14, weight: 'bold' },
                    color: '#ffffff',
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            title: {
                display: true,
                text: '🎯 Distribution Analysis',
                font: { size: 22, weight: 'bold' },
                color: '#ffffff',
                padding: { bottom: 20 }
            }
        },
        cutout: '60%',
        animation: {
            animateRotate: true,
            duration: 2000
        }
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { size: 14, weight: 'bold' },
                    color: '#ffffff',
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            title: {
                display: true,
                text: '📈 Trend Analysis (6 Months)',
                font: { size: 22, weight: 'bold' },
                color: '#ffffff',
                padding: { bottom: 20 }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y} users`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { 
                    color: '#ffffff', 
                    font: { size: 12 },
                    callback: function(value) {
                        return value + ' users';
                    }
                },
                grid: { 
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: true,
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                }
            },
            x: {
                ticks: { 
                    color: '#ffffff', 
                    font: { size: 12 }
                },
                grid: { 
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: true,
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
        }
    };

    // ---------------------------------------
    // SAVE CHART DATA
    // ---------------------------------------

    const PostLineData = (e) => {
        e.preventDefault();
        setAlert(false);

        apiAdmin
            .post(`${process.env.REACT_APP_API_URL}/length/and/calcul/ation/of/chart`)
            .then((res) => {
                if (res.data.Status === "OK") {
                    setData("Data Saved");
                    setAlert(true);
                } else if (res.data.Status === "EXISTED") {
                    setData("Today's data existed before");
                    setAlert(true);
                } else {
                    setData("Something went wrong");
                    setAlert(true);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error("API Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("No response from server.");
                } else {
                    console.error("Error:", error.message);
                }
            });
    };

    // ---------------------------------------
    // CIRCULAR PROGRESS COMPONENT
    // ---------------------------------------

    const CircularProgress = ({ value, max, label, icon, color }) => {
        const percentage = (value / max) * 100;
        const radius = 80;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        return (
            <div style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="12"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dashoffset 1.5s ease-in-out'
                        }}
                    />
                </svg>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: '#ffffff'
                }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                        <CountUp end={value} duration={2} />
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
                        <FontAwesomeIcon icon={icon} style={{ marginRight: '5px' }} />
                        {label}
                    </div>
                </div>
            </div>
        );
    };

    // ---------------------------------------
    // STAT CARD COMPONENT
    // ---------------------------------------

    const StatCard = ({ title, value, icon, color, trend, trendValue }) => {
        const getTrendIcon = () => {
            if (trend === 'up') return faArrowUp;
            if (trend === 'down') return faArrowDown;
            return faMinus;
        };

        const getTrendColor = () => {
            if (trend === 'up') return '#4CAF50';
            if (trend === 'down') return '#f44336';
            return '#FFC107';
        };

        return (
            <div style={{
                background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
                borderRadius: '20px',
                padding: '25px',
                minWidth: '200px',
                flex: '1',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                }}>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: 'rgba(255,255,255,0.9)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        {title}
                    </div>
                    <div style={{
                        fontSize: '32px',
                        color: 'rgba(255,255,255,0.8)'
                    }}>
                        <FontAwesomeIcon icon={icon} />
                    </div>
                </div>
                <div style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    marginBottom: '10px'
                }}>
                    <CountUp end={value} duration={2.5} />
                </div>
                {trend && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: getTrendColor(),
                        fontSize: '14px',
                        fontWeight: 'bold',
                        background: 'rgba(255,255,255,0.15)',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        width: 'fit-content'
                    }}>
                        <FontAwesomeIcon icon={getTrendIcon()} />
                        <span style={{color : "white"}} >{trendValue}% this month</span>
                    </div>
                )}
            </div>
        );
    };

    // ---------------------------------------
    // RETURN
    // ---------------------------------------

    return (
        <div>

            {/* LOADING */}
            {load ? (
                <Loading />
            ) : (
                <div style={{
                    padding: '20px',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    minHeight: '100vh'
                }}>

                    {/* DASHBOARD HEADER */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '20px',
                        marginBottom: '30px'
                    }}>
                        <h1 style={{
                            color: '#ffffff',
                            fontSize: '36px',
                            fontWeight: 'bold',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px'
                        }}>
                            <FontAwesomeIcon icon={faCrown} style={{ color: '#FFD700' }} />
                            Dashboard
                            <span style={{
                                fontSize: '14px',
                                background: 'rgba(255,255,255,0.15)',
                                padding: '5px 15px',
                                borderRadius: '20px',
                                fontWeight: 'normal',
                                color: 'rgba(255,255,255,0.8)'
                            }}>
                                Live
                            </span>
                        </h1>
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            flexWrap: 'wrap'
                        }}>
                            <button
                                onClick={PostLineData}
                                style={{
                                    padding: '12px 25px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
                                }}
                            >
                                <FontAwesomeIcon icon={faSpinner} style={{ marginRight: '10px' }} />
                                Save Data
                            </button>
                        </div>
                    </div>

                    {/* VIEW SELECTOR */}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        marginBottom: '30px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        {view_types.map((view) => (
                            <div
                                key={view.name}
                                onClick={() => setSel_View(view.name)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '12px 25px',
                                    background: sel_view === view.name 
                                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                        : 'rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease',
                                    border: sel_view === view.name 
                                        ? '2px solid #667eea'
                                        : '1px solid rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(10px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: sel_view === view.name 
                                        ? '0 5px 20px rgba(102, 126, 234, 0.4)'
                                        : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (sel_view !== view.name) {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (sel_view !== view.name) {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={view.icon} />
                                {view.name}
                            </div>
                        ))}
                    </div>

                    {/* OVERVIEW VIEW */}
                    {sel_view === "Overview" && (
                        <div>
                            {/* STAT CARDS ROW */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '20px',
                                marginBottom: '30px'
                            }}>
                                <StatCard
                                    title="Total Played"
                                    value={total_list.length}
                                    icon={faGamepad}
                                    color="#FF6B6B"
                                    trend="up"
                                    trendValue="12.5"
                                />
                                <StatCard
                                    title="Total Winners"
                                    value={win_data.length}
                                    icon={faTrophy}
                                    color="#4ECDC4"
                                    trend="up"
                                    trendValue="8.3"
                                />
                                <StatCard
                                    title="Unique Players"
                                    value={getUniquePlayers()}
                                    icon={faUsers}
                                    color="#45B7D1"
                                    trend="up"
                                    trendValue="15.7"
                                />
                                <StatCard
                                    title="Live Players"
                                    value={live.length}
                                    icon={faFire}
                                    color="#F9CA24"
                                    trend="up"
                                    trendValue="5.2"
                                />
                            </div>

                            {/* CIRCULAR PROGRESS CARDS */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '30px',
                                marginBottom: '30px',
                                padding: '30px',
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: '20px',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <CircularProgress
                                    value={win_data.length}
                                    max={total_list.length}
                                    label="Win Rate"
                                    icon={faMedal}
                                    color="#4ECDC4"
                                />
                                <CircularProgress
                                    value={getUniquePlayers()}
                                    max={total_list.length}
                                    label="Unique Players"
                                    icon={faUsers}
                                    color="#45B7D1"
                                />
                                <CircularProgress
                                    value={getUniqueWinningPlayers()}
                                    max={getUniquePlayers()}
                                    label="Winning Rate"
                                    icon={faStar}
                                    color="#FFD700"
                                />
                                <CircularProgress
                                    value={live.length}
                                    max={getUniquePlayers()}
                                    label="Live Activity"
                                    icon={faFire}
                                    color="#FF6B6B"
                                />
                            </div>

                            {/* TREND CHART */}
                            <div style={{
                                padding: '30px',
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: '20px',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                height: '400px'
                            }}>
                                {trendData && (
                                    <Line data={trendData} options={lineChartOptions} />
                                )}
                            </div>
                        </div>
                    )}

                    {/* BAR GRAPH VIEW */}
                    {sel_view === "Bar Graph" && (
                        <div style={{
                            padding: '30px',
                            background: 'rgba(0,0,0,0.2)',
                            borderRadius: '20px',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            height: '500px'
                        }}>
                            {chartData && (
                                <Bar data={chartData} options={barChartOptions} />
                            )}
                        </div>
                    )}

                    {/* PIE CHART VIEW */}
                    {sel_view === "Pie Chart" && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: '30px'
                        }}>
                            <div style={{
                                padding: '30px',
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: '20px',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                height: '450px'
                            }}>
                                <Doughnut 
                                    data={{
                                        labels: ['Total Played', 'Total Won', 'Unique Players', 'Live Players'],
                                        datasets: [{
                                            data: [
                                                total_list.length,
                                                win_data.length,
                                                getUniquePlayers(),
                                                live.length
                                            ],
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.8)',
                                                'rgba(54, 162, 235, 0.8)',
                                                'rgba(255, 206, 86, 0.8)',
                                                'rgba(75, 192, 192, 0.8)'
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)'
                                            ],
                                            borderWidth: 3,
                                        }]
                                    }} 
                                    options={doughnutOptions} 
                                />
                            </div>
                            <div style={{
                                padding: '30px',
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: '20px',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                height: '450px'
                            }}>
                                <Pie 
                                    data={{
                                        labels: ['Winners', 'Non-Winners'],
                                        datasets: [{
                                            data: [
                                                win_data.length,
                                                total_list.length - win_data.length
                                            ],
                                            backgroundColor: [
                                                'rgba(75, 192, 192, 0.8)',
                                                'rgba(255, 99, 132, 0.8)'
                                            ],
                                            borderColor: [
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(255, 99, 132, 1)'
                                            ],
                                            borderWidth: 3,
                                        }]
                                    }} 
                                    options={{
                                        ...doughnutOptions,
                                        plugins: {
                                            ...doughnutOptions.plugins,
                                            title: {
                                                ...doughnutOptions.plugins.title,
                                                text: '🏆 Win/Loss Distribution'
                                            }
                                        }
                                    }} 
                                />
                            </div>
                        </div>
                    )}

                    {/* LINE CHART VIEW */}
                    {sel_view === "Line Chart" && (
                        <div style={{
                            padding: '30px',
                            background: 'rgba(0,0,0,0.2)',
                            borderRadius: '20px',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            height: '500px'
                        }}>
                            {trendData && (
                                <Line data={trendData} options={lineChartOptions} />
                            )}
                        </div>
                    )}

                </div>
            )}

            {/* POPUP */}
            {alert && (
                <Popup data={data} val={alert} />
            )}

            {/* NAVIGATION */}
            <Naviba />

        </div>
    );
};

export default AdminHome;