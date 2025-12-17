import { faArchive, faArrowCircleUp, faArrowUp, faChevronDown, faChevronUp, faDotCircle, faList, faListDots, faPlug, faPlus, faRightToBracket, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Navibar_user = () => {
  const [show, setShow] = useState(false);

  // Navigation items with icons and URLs
  const navItems = [
    { icon: faWallet, url: '/admin/user/wallet' },
    { icon: faPlus, url: '/admin/user/add' },
    { icon: faList, url: '/admin/user/questions' },
  ];

  return (
    <div className='user_admin-navibar-01'>
      <center>
        <div className='user_admin-navibar-01-sub-cnt-01'>
          {show ? (
            <div className='user_admin-navibar-01-sub-cnt-01-sub-01'>
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className='user_admin-navibar-01-sub-cnt-01-sub-01-sub-01'
                  onClick={() => (window.location.href = item.url)}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </div>
              ))}

                <button className='btn-01' onClick={() => {localStorage.removeItem('admin_token');localStorage.removeItem('ssid_admin');window.location.reload()}}>
                    <FontAwesomeIcon className='user_admin-navibar-01-sub-cnt-01-icon-01' icon={faRightToBracket} />
                </button>
              <button className='btn-01' onClick={() => setShow(false)}>
                <FontAwesomeIcon className='user_admin-navibar-01-sub-cnt-01-icon-01' icon={faChevronDown} />
              </button>

            </div>
          ) : (
            <div onClick={() => setShow(true)}>
              <FontAwesomeIcon className='user_admin-navibar-01-sub-cnt-01-icon-01' icon={faChevronUp} />
            </div>
          )}
        </div>
      </center>
    </div>
  );
};

export default Navibar_user;
