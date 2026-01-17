import React, { useEffect, useState } from "react";
import apiAdmin from "../pages/adminapi";

const User_Data = () => {

    const [user_email, setUser_Email] = useState("")
    const [search, setSearch] = useState(true)
    const [get_data, setGet_Data] = useState([])
    const data = ["kick", "hello", "HP", "Meti", "Navi"];

    const fetch_Data = (data) => {
        console.log(data)
        if (data.length > 0) {
            setSearch(false)
            apiAdmin.get(`http://localhost/get/all/user/data/new/for/kick/dataa/${data}`)
                .then(res => {
                    if (res.data.Status === "OK") {
                        setGet_Data(res.data)
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

    return (
        <div className="moni_data_main">

            <div className="moni_data_main-div-2">
                <div className="moni_data_main-div-3">
                    <input type="text" onChange={(e) => { fetch_Data(e.target.value) }} placeholder="User ID / Email" />
                    <div className="moni_data_main-div-3_sub_01">
                        <span>Search</span>
                    </div>
                </div>

                {search &&
                    <>
                        {data.map((item) => (
                            <div className="moni_data_main-div-2_map"
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


                            

                        </div>



                    </>
                }


            </div>

        </div>
    );
};

export default User_Data;
