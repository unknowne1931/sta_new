import React, { useEffect, useState } from 'react';
import api from '../api';

const Ac_upi = () => {
  const [select_payment_typ, setSelect_payment_typ] = useState('Bank');
  const [form_data, setForm_data] = useState({
    name: "",
    account_number: "",
    ifsc: "",
    bank_name: "",
    upi_id: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // State for storing fetched data
  const [bankData, setBankData] = useState(null);
  const [upiData, setUpiData] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [type_data, setType_data] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm_data((prev) => ({
      ...prev,
      [name]: value
    })); 
  };

  // ============ FETCH DATA FUNCTION ============
  const fetchUserData = async () => {
    try {
      setFetching(true);
      setError(null);
      
      // Fetch all data for the user
      const response = await api.get(`${process.env.REACT_APP_API_URL}/bank/upi/data/get/upi_data`);
      
      console.log("Full response:", response.data);
      
      // Check if data exists
      if (response.data.Status === "OK") {
        const allData = response.data.data || [];
        
        // Separate Bank and UPI data
        const bankData = allData.find(item => item.type === 'Bank');
        const upiData = allData.find(item => item.type === 'UPI');
        
        setBankData(bankData || null);
        setUpiData(upiData || null);
        
        // If data exists, show data view (hide form)
        if (bankData || upiData) {
          setType_data(false);
          setShowForm(false);
        } else {
          // If no data exists, show form
          setType_data(true);
          setShowForm(true);
        }
        
        console.log("Bank Data:", bankData);
        console.log("UPI Data:", upiData);
      } else {
        // If response status is not OK, show form
        setType_data(true);
        setShowForm(true);
        setBankData(null);
        setUpiData(null);
      }
      
    } catch (err) {
      console.error("Error fetching data:", err);
      setType_data(true);
      setShowForm(true);
      setBankData(null);
      setUpiData(null);
    } finally {
      setFetching(false);
    }
  };

  // ============ POST DATA FUNCTION ============
  const post_data = async (e) => {
    e.preventDefault();
    
    setError(null);
    setSuccess(null);
    
    // Validate based on payment type
    if (select_payment_typ === "Bank") {
      if (!form_data.name || !form_data.account_number || !form_data.ifsc || !form_data.bank_name) {
        setError("Please fill all bank details");
        return;
      }
    } else if (select_payment_typ === "UPI") {
      // Only validate name and upi_id for UPI
      if (!form_data.name || !form_data.upi_id) {
        setError("Please fill all UPI details");
        return;
      }
    }

    // Prepare data for API - send all fields with proper values
    const payload = {
      user: "USER_ID_HERE",
      ac_h_nme: form_data.name,
      type: select_payment_typ,
      // For Bank: send bank details, set UPI fields to null
      ...(select_payment_typ === "Bank" && {
        bank_nme: form_data.bank_name,
        Acc_no: form_data.account_number,
        ifsc: form_data.ifsc,
        app: null,
        upi_id: null
      }),
      // For UPI: send only name and upi_id, set all bank fields to null
      ...(select_payment_typ === "UPI" && {
        bank_nme: null,
        Acc_no: null,
        ifsc: null,
        app: null,
        upi_id: form_data.upi_id
      })
    };

    try {
      setLoading(true);
      
      const response = await api.post(
        `${process.env.REACT_APP_API_URL}/bank/upi/data/collect`, 
        payload
      );
      
      setSuccess(response.data.message || "Payment details submitted successfully!");
      
      // Reset form
      setForm_data({
        name: "",
        account_number: "",
        ifsc: "",
        bank_name: "",
        upi_id: ""
      });
      
      // Refetch data to show updated info
      await fetchUserData();
      setShowForm(false);
      
    } catch (err) {
      console.error("Error submitting data:", err);
      setError(err.response?.data?.message || "Failed to submit payment details");
    } finally {
      setLoading(false);
    }
  };

  // ============ SHOW FORM HANDLER ============
  const handleShowForm = () => {
    setShowForm(true);
    // Pre-fill form if data exists
    if (select_payment_typ === "Bank" && bankData) {
      setForm_data({
        name: bankData.ac_h_nme || "",
        account_number: bankData.Acc_no || "",
        ifsc: bankData.ifsc || "",
        bank_name: bankData.bank_nme || "",
        upi_id: ""
      });
    } else if (select_payment_typ === "UPI" && upiData) {
      setForm_data({
        name: upiData.ac_h_nme || "",
        account_number: "",
        ifsc: "",
        bank_name: "",
        upi_id: upiData.upi_id || ""
      });
    }
  };

  // ============ FETCH DATA ON LOAD ============
  useEffect(() => {
    fetchUserData();
  }, []);

  // ============ REFETCH WHEN SWITCHING TABS ============
  useEffect(() => {
    if (!fetching) {
      const hasData = select_payment_typ === "Bank" ? bankData : upiData;
      // If data exists for current tab, hide form
      if (hasData) {
        setShowForm(false);
      } else {
        // If no data for current tab, show form to add data
        setShowForm(true);
      }
    }
  }, [select_payment_typ, bankData, upiData]);

  return (
    <>
      <div className='ac_bnk_body_01'>
        <h1 className='ac_bnk_body_01_h1_01'>Payment Account</h1>

        <div style={{height : "30px"}}></div>

        <div className='ac_uppi_form_01_sub_01'>
            <h2>Your personal information is safe with us. We do not share it with anyone outside our company</h2>
            <div className='ac_uppi_form_01_sub_01_sub_01'>Note</div>
        </div>

        {/* Only render the main content if type_data is true */}
        {type_data && (
          <>
            <div className='ac_uppi_form_01'>
              <div className='ac_uppi_acnt_upi'>
                <div
                  onClick={() => {
                    setSelect_payment_typ("Bank");
                    setError(null);
                    setSuccess(null);
                    // Show form if no bank data exists
                    if (!bankData) {
                      setShowForm(true);
                    } else {
                      setShowForm(false);
                    }
                  }}
                  style={select_payment_typ === "Bank" ? { boxShadow: "0 2px 0 rgb(252, 252, 252)" } : {}}
                >
                  Bank
                </div>

                <div
                  onClick={() => {
                    setSelect_payment_typ("UPI");
                    setError(null);
                    setSuccess(null);
                    // Show form if no UPI data exists
                    if (!upiData) {
                      setShowForm(true);
                    } else {
                      setShowForm(false);
                    }
                  }}
                  style={select_payment_typ === "UPI" ? { boxShadow: "0 2px 0 rgb(252, 252, 252)" } : {}}
                >
                  UPI
                </div>
              </div>

              {/* Loading State */}
              {fetching && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '20px',
                  color: '#666'
                }}>
                  Loading your payment details...
                </div>
              )}

              {/* Error and Success Messages */}
              {error && (
                <div style={{ 
                  color: 'red', 
                  marginBottom: '10px', 
                  padding: '10px', 
                  background: '#ffebee', 
                  borderRadius: '4px' 
                }}>
                  ❌ {error}
                </div>
              )}
              {success && (
                <div style={{ 
                  color: 'green', 
                  marginBottom: '10px', 
                  padding: '10px', 
                  background: '#e8f5e9', 
                  borderRadius: '4px' 
                }}>
                  ✅ {success}
                </div>
              )}

              {/* Show Data or Form */}
              {!fetching && (
                <>
                  {/* Bank Section */}
                  {select_payment_typ === "Bank" && (
                    <>
                      {/* Show form only when no bank data exists OR when showForm is true */}
                      {(!bankData || showForm) && (
                        <form onSubmit={post_data}>
                          <legend>{bankData ? 'Update Bank Details' : 'Add Bank Details'}</legend>
                          
                          <legend>Account Holder Name</legend>
                          <input
                            type="text"
                            name="name"
                            placeholder="Account Holder Name. Ex: Avi"
                            required
                            autoComplete="off"
                            value={form_data.name}
                            onChange={handleChange}
                            onInvalid={(e) =>
                              e.target.setCustomValidity("Please enter the Account Holder Name. Ex: Avi")
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                          />

                          <legend>Account Number</legend>
                          <input 
                            type='text' 
                            name="account_number"
                            placeholder='Account Number. Ex : 1234 2005 2002 1931'
                            value={form_data.account_number}
                            onChange={handleChange}
                            onInvalid={(e) =>
                              e.target.setCustomValidity("Please enter the Account Number. Ex : 1234 2005 2002 1931")
                            }
                            onInput={(e) => e.target.setCustomValidity("")} 
                            required 
                            autoComplete='off'
                          />

                          <legend>IFSC</legend>
                          <input 
                            type='text' 
                            name="ifsc"
                            placeholder='IFSC. Ex : AVI1234'
                            value={form_data.ifsc}
                            onChange={handleChange}
                            required 
                            autoComplete='off'
                            onInvalid={(e) =>
                              e.target.setCustomValidity("Please enter the IFSC. Ex : AVI1234")
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                          />

                          <legend>Bank Name</legend>
                          <input 
                            type='text' 
                            name="bank_name"
                            placeholder='Bank Name. Ex : Avi Central Bank'
                            value={form_data.bank_name}
                            onChange={handleChange}
                            required 
                            autoComplete='off'
                            onInvalid={(e) =>
                              e.target.setCustomValidity("Please enter the Bank Name. Ex : Avi Central Bank")
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                          />

                          <br />
                          <button type='submit' disabled={loading}>
                            {loading ? 'Submitting...' : bankData ? 'Update' : 'Post'}
                          </button>
                          
                          {bankData && showForm && (
                            <button 
                              type="button"
                              onClick={() => setShowForm(false)}
                              style={{
                                marginLeft: '10px',
                                padding: '10px 20px',
                                background: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              Cancel
                            </button>
                          )}
                        </form>
                      )}
                    </>
                  )}

                  {/* UPI Section */}
                  {select_payment_typ === "UPI" && (
                    <>
                      {/* Show form only when no UPI data exists OR when showForm is true */}
                      {(!upiData || showForm) && (
                        <form onSubmit={post_data}>
                          <legend>{upiData ? 'Update UPI Details' : 'Add UPI Details'}</legend>
                          
                          <legend>UPI Account Holder Name</legend>
                          <input
                            type="text"
                            name="name"
                            placeholder="UPI Account Holder Name. Ex: Avi"
                            required
                            autoComplete="off"
                            value={form_data.name}
                            onChange={handleChange}
                            onInvalid={(e) =>
                              e.target.setCustomValidity("Please enter the UPI Account Holder Name. Ex: Avi")
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                          />

                          <legend>UPI ID</legend>
                          <input 
                            type='text' 
                            name="upi_id"
                            placeholder='UPI ID. Ex : avi@ybl or 1234@ybl'
                            value={form_data.upi_id}
                            onChange={handleChange}
                            onInvalid={(e) =>
                              e.target.setCustomValidity("Please enter the UPI ID. Ex : avi@ybl or 1234@ybl")
                            }
                            onInput={(e) => e.target.setCustomValidity("")} 
                            required 
                            autoComplete='off'
                          />

                          <br />
                          <button type='submit' disabled={loading}>
                            {loading ? 'Submitting...' : upiData ? 'Update' : 'Post'}
                          </button>
                          
                          {upiData && showForm && (
                            <button 
                              type="button"
                              onClick={() => setShowForm(false)}
                              style={{
                                marginLeft: '10px',
                                padding: '10px 20px',
                                background: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              Cancel
                            </button>
                          )}
                        </form>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {/* Display Bank Data when it exists */}
        {bankData && (
          <div className='ac_upi_main_01'>
            <h1 className='ac_upi_main_01_h1_01' >{bankData.bank_nme}</h1>
            <p className='ac_upi_main_01_p_1'>{bankData.Acc_no}</p>
            <div className='ac_upi_main_01_sub_cnt_01'>
              <p>{bankData.ifsc}</p>
              <p style={{ fontSize: "4rem" }}>{bankData.ac_h_nme}</p>
            </div>
          </div>
        )}

        {/* Display UPI Data when it exists */}
        {upiData && (
          <div className='ac_upi_main_01'>
            <h1 className='ac_upi_main_01_h1_01' >App</h1>
            <p className='ac_upi_main_01_p_1'>{upiData.upi_id}</p>
            <div className='ac_upi_main_01_sub_cnt_01'>
              <p>{upiData.app || "N/A"}</p>
              <p style={{ fontSize: "4rem" }}>{upiData.ac_h_nme}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Ac_upi;