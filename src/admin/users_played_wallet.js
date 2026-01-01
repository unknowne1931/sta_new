import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faPersonBooth, faRecycle, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';

import React, { useEffect, useState } from "react";
import apiAdmin from "../pages/adminapi";

const UsersPlayedWalletAdmin = () => {

    const [ref_data, setRef_data] = useState({});
    const [paid_data, setPaid_data] = useState({
        count: 0,
        user_id: []
    });

    const [tick, setTick] = useState([]);

    useEffect(() => {
        document.body.style.backgroundColor = "#14036bff";
        get_referd_coin();
        get_paid_data();
        get_refund_ticket();
    }, []);

    function get_refund_ticket() {
        apiAdmin.get('http://localhost/admin/refund/tickets/list')
            .then((response) => {
                if (response.data.Logout === "OUT") {
                } else {
                    setTick(response.data.data);
                }

            })
            .catch((error) => console.error('There was an error!', error));
    }
 
    function get_referd_coin() {
        apiAdmin.get('http://localhost/admin/refund/data/list')
            .then((response) => {
                if (response.data.Logout === "OUT") {
                    window.location.href = "/admin/login";
                } else if (response.data.data) {
                    console.log(response.data.data);
                    setRef_data(response.data.data);
                }
            })
            .catch((error) => console.error('There was an error!', error));
    }

    function get_paid_data() {
        apiAdmin.get('http://localhost/admin/balance/wallet')
            .then((response) => {
                if (response.data.Logout === "OUT") {
                    window.location.href = "/admin/login";
                } else if (response.data.data) {
                    setPaid_data(response.data.data);
                }
            })
            .catch((error) => console.error('There was an error!', error));
    }

    return (
        <div className="wallet-admin-page">

            <div className="wallet-admin-page_01">
                <div className="wallet-admin-page_01_sub-01" style={{ width: "80%" }}>
                    <h2><FontAwesomeIcon icon={faWallet} /></h2>

                    <div className="wallet-admin-page_01_sub-0_sub-01">
                        <div className="wallet-admin-page_01_sub-0_sub-01-sub-01">
                            <FontAwesomeIcon icon={faArrowDown} /> <strong>₹</strong> {paid_data?.count}
                            <div className="wallet-admin-page_01_sub-0_sub-01-sub-02_sub-01" style={{ fontSize: "2rem" }}>Charge</div>
                        </div>
                        <div className="wallet-admin-page_01_sub-0_sub-01-sub-02">
                            <FontAwesomeIcon icon={faArrowUp} /> {ref_data?.count}
                            <div className="wallet-admin-page_01_sub-0_sub-01-sub-02_sub-01" style={{ fontSize: "2rem" }}>Paid</div>
                        </div>
                    </div>

                    <div className="wallet-admin-page-h1-01">
                        <h1>Wallet</h1>
                    </div>
                </div>

                <div className="wallet-admin-page_01_sub-01" style={{ width: "20%" }}>
                    <h2><FontAwesomeIcon icon={faRecycle} /></h2>
                    <div className="wallet-admin-page_01_sub-0_sub-01-sub-03">
                        <h2>{tick?.count ?? 0}</h2>
                        <div className="wallet-admin-page_01_sub-0_sub-01-sub-02_sub-01" style={{ fontSize: "2rem" }}>Refund</div>
                    </div>
                    <div className="wallet-admin-page-h1-01">
                        <h1>Refund</h1>
                    </div>
                </div>
            </div>

            <br />
            <span className="pppp_pichi">Users List</span>
            <br />

            <div className="wallet_usr_cnt-01">
                {paid_data?.user_id?.map((item, index) => (
                    <div className="wallet-admin-page-transaction-card" key={index}>
                        <div>
                            <h2><FontAwesomeIcon icon={faUser} /></h2>
                        </div>
                        <div>
                            <h3>User ID: {item.user}</h3>
                        </div>
                        <div>
                            <p>Amount: ₹<span>{item.rupee}</span></p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default UsersPlayedWalletAdmin;
