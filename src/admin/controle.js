import React, { useEffect, useState } from 'react'
import apiAdmin from '../pages/adminapi'

const Admin_controle = () => {

    const [data, setData] = useState('')

    useEffect(() => {
        get_data()
    }, [])

    function get_data() {
        apiAdmin.get("http://localhost/get/data/of/level/controle/data")
            .then(res => {
                if (res.data.data) {
                    setData(res.data.data)
                } else if (res.data.Logout === "OUT") {
                    console.log("Data")
                    localStorage.removeItem("token")
                    window.location.reload()
                }
                else {
                    console.log("No data Found")
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    return (
        <div>
            <h1>Welcome to Admin Controle panel</h1>

        </div>
    )
}

export default Admin_controle
