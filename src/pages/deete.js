import React from 'react'

const Delete = () => {

    const handleDeactivate = () => {
        // Logic to deactivate the account
        // This could involve making an API call to the backend
        console.log("Account deactivated");
        alert("Your account will be deactivated and all associated data will be removed. A request has been sent.");
        // Optionally, redirect the user or perform other actions after deactivation
    }

    return (
        <div>
            <div className="Home-cnt-01-sub-01">
                <strong>sta<span>W</span>ro</strong>
                <hr />
            </div>
            <center>
                <div>
                    <h2>Deactivate Account</h2>
                    <p>Are you sure you want to deactivate your account? This action cannot be undone.</p>
                    <button onClick={handleDeactivate} className="deactivate-button">
                        Deactivate
                    </button>
                </div>
            </center>
        </div>
    )
}

export default Delete;
