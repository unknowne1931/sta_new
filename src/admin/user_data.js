import React, { useEffect, useState } from "react";
import apiAdmin from "../pages/adminapi";
import { useParams } from 'react-router-dom';
import { data } from "autoprefixer";

const User_Data = () => {

    const [user_email, setUser_Email] = useState("")
    const [search, setSearch] = useState(true)
    const [get_data, setGet_Data] = useState([])
    const [new_bal, setNew_Bal0] = useState("")
    const [recent, setRecent] = useState([])
    const [len, setLen] = useState("")
    const [code, setCode] = useState("")

    const { pass } = useParams();

    function getAll() {
        try {
            const dat = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            setRecent(dat)
        } catch {
            return [];
        }
    }



    useEffect(() => {
        getAll()

    }, [])

    const STORAGE_KEY = "kick_array";

    function pushIfNotExists(value) {
        if (!value || typeof value !== "string") {
            return getAll();
        }

        let arr = [];
        try {
            arr = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            arr = [];
        }

        if (!arr.includes(value)) {
            arr.push(value);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
        }

        return arr;
    }



    const fetch_Data = (data) => {
        console.log(data)
        if (data.length > 0) {
            setSearch(false)
            apiAdmin.get(`http://localhost/get/all/user/data/new/for/kick/dataa/${data}`)
                .then(res => {
                    if (res.data.Status === "OK") {
                        setGet_Data(res.data)
                        pushIfNotExists(res.data.data.email)
                        getAll()

                    }
                    else if (res.data.Status !== "OK") {
                        setGet_Data('')
                    }
                    else if (res.data.Logout === "OUT") {
                        console.log("Data")
                        localStorage.removeItem("token")
                        window.location.reload()
                    }
                    else {
                        setGet_Data([])
                        console.log("No Data Found", res.data)
                    }
                }).catch(error => {
                    console.log(error)
                })
        } else {
            setGet_Data([])
            setSearch(true)
        }


    }

    function Time(utcTime) {
        if (!utcTime) return "";

        return new Date(utcTime).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "medium",
        });
    }


    const COLORS = ["#04152bff"];

    function getColor(value) {
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            hash = value.charCodeAt(i) + ((hash << 5) - hash);
        }
        return COLORS[Math.abs(hash) % COLORS.length];
    }

    useEffect(() => {
        document.body.style.backgroundColor = "#05467cff";

        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);


    const post_new_sec = (e, user, new_bal) => {
        e.preventDefault();

        apiAdmin.post(
            "http://localhost/add/from/admin/balance/to/balance",
            { user, new_balance: new_bal }
        )
            .then(res => {
                if (res.data.Status === "OK") {
                    fetch_Data(user);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const post_new_code = (e, user) => {
        e.preventDefault();

        apiAdmin.post(
            "http://localhost/verify/data/to-confirm/reported/doc/async",
            { user, id : code }
        )
            .then(res => {
                if (res.data.Status === "OK") {
                    fetch_Data(user);
                }else if(res.data.Status === "CLMD"){
                    alert("User Claimed This")
                }else if(res.data.Status === "NTHIM"){
                    alert("This Coin Not Belongs To Him")
                }else{
                    alert("Something Went Wrong")
                }
            })
            .catch(error => {
                console.log(error);
            });
    };


    return (
        <div className="moni_data_main">

            <div className="moni_data_main-div-2">
                <div className="moni_data_main-div-3">
                    <input type="text" onChange={(e) => { fetch_Data(e.target.value); setLen(e.target.value) }} placeholder="User ID / Email" />
                    <div className="moni_data_main-div-3_sub_01">
                        <span>Search</span>
                    </div>
                </div>

                {len.length <= 0 &&
                    <>
                        {recent.map((item) => (
                            <div className="moni_data_main-div-2_map" onClick={() => { fetch_Data(item) }}
                                key={item}
                                style={{
                                    backgroundColor: getColor(item),
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </>
                }

            </div>

            <div className="moni_data_main-div-1">
                {get_data?.data?._id &&

                    <>
                        <div className="moni_data_main-div-1_sub_01">
                            <div className="moni_data_main-div-1_sub_01_sub_01">
                                <h2> <span>Name</span>  : <strong>{get_data?.data?.name}</strong></h2>
                                <h2><span>Username</span> : <strong>{get_data?.data?.username}</strong></h2>
                                <h2><span>E-Mail</span> : <strong>{get_data?.data?.email}</strong></h2>
                                <h2><span>staWro ID</span> : <strong>{get_data?.data?._id}</strong></h2>
                                <h2><span>Created DOC</span> : <strong>{Time(get_data?.data?.Time)}</strong></h2>

                                <div
                                    className="user_data_top"
                                    style={{
                                        backgroundColor: get_data?.data?.valid === "yes" ? "green" : "red",
                                    }}
                                >

                                    <span>User Info</span>
                                </div>

                            </div>

                            <div className="moni_data_main-div-1_sub_01_sub_01">
                                <h2> <span>Balance</span>  : <strong>{get_data?.balance?.balance}₹</strong></h2>
                                <h2><span>Last TR ID</span> : <strong>{get_data?.balance?.last_tr_id}</strong></h2>
                                <h2><span>Created DOC</span> : <strong>{Time(get_data?.balance?.createdAt)}</strong></h2>
                                <h2><span>Doc Last Updated</span> : <strong>{Time(get_data?.balance?.updatedAt)}</strong></h2>

                                <div className="user_data_top">
                                    <span>User Balance</span>
                                </div>

                            </div>

                            <div className="moni_data_main-div-1_sub_01_sub_01">
                                <h2> <span>AC H Name</span>  : <strong>{get_data?.bank?.ac_h_nme}</strong></h2>
                                <h2><span>Bank Name</span> : <strong>{get_data?.bank?.bank_nme}</strong></h2>
                                <h2><span>Acc No</span> : <strong>{get_data?.bank?.Acc_no}</strong></h2>
                                <h2><span>IFSC</span> : <strong>{get_data?.bank?.ifsc}</strong></h2>
                                <h2><span>Payment Type</span> : <strong>{get_data?.bank?.type}</strong></h2>
                                <h2><span>Created DOC</span> : <strong>{Time(get_data?.bank?.createdAt)}</strong></h2>
                                <h2><span>Doc Last Updated</span> : <strong>{Time(get_data?.bank?.updatedAt)}</strong></h2>

                                <div className="user_data_top">
                                    <span>Bank Data</span>
                                </div>

                            </div>


                            {pass === "!amAdmin" &&

                                <><div className="moni_data_main-div-1_sub_01_sub_01">
                                    <h2>Add More</h2>
                                    <form onSubmit={(e) => post_new_sec(e, get_data?.data?._id, new_bal)}>

                                        <input type="text" placeholder={`add More ${get_data?.balance?.balance}₹`} onChange={e => { setNew_Bal0(e.target.value) }} />

                                        <button type="submit" >Add</button>
                                    </form>


                                    <div className="user_data_top">
                                        <span>Add Balance</span>
                                    </div>

                                </div>
                                </>

                            }

                            <div className="moni_data_main-div-1_sub_01_sub_01">
                                <h1>User @ Level <strong className="moni_data_main-div-1_sub_01_sub_01_str_1">{get_data?.level}</strong>  </h1>




                                <div className="user_data_top">
                                    <span>User Level</span>
                                </div>

                            </div>

                            <div className="moni_data_main-div-1_sub_01_sub_01">
                                <h2>Win : <strong style={{ fontSize: "3rem" }} >{get_data?.won}</strong> </h2>
                                <h2>Total Played : <strong style={{ fontSize: "3rem" }} >{get_data?.total_played}</strong> </h2>
                                <h2>Total Played list : <strong style={{ fontSize: "3rem" }} >{get_data?.Old_List}</strong> </h2>

                                <div className="user_data_top">
                                    <span>User Played</span>
                                </div>
                            </div>

                            <div className="moni_data_main-div-1_sub_01_sub_01">
                                <h2>Add More</h2>
                                <form onSubmit={(e) => post_new_code(e, get_data?.data?._id)}>

                                    <input type="text" placeholder={`add More ${get_data?.balance?.balance}₹`} onChange={e => { setCode(e.target.value) }} />

                                    <button type="submit" >Add</button>
                                </form>


                                <div className="user_data_top">
                                    <span>Add Code</span>
                                </div>

                            </div>









                        </div>



                    </>
                }


            </div>

        </div>
    );
};

export default User_Data;
