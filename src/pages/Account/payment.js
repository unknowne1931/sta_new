import { faCaretDown, faCaretUp, faChevronDown, faChevronUp, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import Loading from '../../loading';

const Payment = () => {

  const [show1, setShow1] = useState(false);
  const [load,setLoad] = useState(true);

  return (
    <div>
      {load ? <Loading /> :
      <center>
        
        <h1 className='account-subb-part-01'>Payment</h1>

        <div className='account-payment-main-cnt-01'>
          <span><strong>*</strong> UPI Payments are allowed.</span><br/><br/>
          <span><strong>*</strong> We are not responsible for any transactions made to other UPI accounts.</span><br/><br/>
          <span><strong>*</strong> Users are advised to verify the recipient's details carefully before making any payment.</span><br/><br/>
          <span><strong>*</strong> All transactions are final and cannot be reversed or refunded by us</span>
        </div>
        <br/>



      </center>}
      <div style={{height : "50px"}}></div>
    </div>
  )
}

export default Payment
