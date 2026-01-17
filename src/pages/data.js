import React, { useEffect, useState } from 'react'
import api from './api'
import Loading from '../loading'
import { getFromDB, saveToDB } from '../db'

const Data = () => {
  const CACHE_TIME = 2 * 60 * 1000 // 2 minutes
  const CACHE_KEY_USER = 'userData'
  const CACHE_KEY_BANK = 'bankData'

  const user = localStorage.getItem('user')
  const [info, setInfo] = useState(null)
  const [hasData, setHasData] = useState(false)
  const [data, setData] = useState({})
  const [isBank, setIsBank] = useState(false)
  const [load, setLoad] = useState(true)

  useEffect(() => {
    loadUserData()
    loadBankData()
  }, [])

  const loadUserData = async () => {
    const cached = await getFromDB(CACHE_KEY_USER)
    const now = Date.now()

    if (cached && now - cached.timestamp < CACHE_TIME) {
      setData(cached.data)
      console.log('✅ Loaded user data from cache')
    } else {
      try {
        const res = await api.get(
          `http://192.168.31.133/users/name/and/more/get/${user}`
        )
        if (res.data?.data) {
          setData(res.data.data)
          await saveToDB(CACHE_KEY_USER, {
            data: res.data.data,
            timestamp: now,
          })
        }
      } catch (err) {
        console.error('User data fetch failed', err)
      }
    }
  }

  const loadBankData = async () => {
    const cached = await getFromDB(CACHE_KEY_BANK)
    const now = Date.now()

    if (cached && now - cached.timestamp < CACHE_TIME) {
      setHasData(true)
      setInfo(cached.data)
      setIsBank(cached.data.type === 'BANK')
      setLoad(false)
      console.log('✅ Loaded bank data from cache')
    } else {
      try {
        const res = await api.get(
          `http://192.168.31.133/get/bank/account/data`
        )
        const result = res.data

        if (result.data) {
          setHasData(true)
          setInfo(result.data)
          setIsBank(result.data.type === 'BANK')
          await saveToDB(CACHE_KEY_BANK, {
            data: result.data,
            timestamp: now,
          })
        } else if (result.Status === 'No') {
          setHasData(false)
        } else if (result.Logout === 'OUT') {
          localStorage.removeItem('ssid')
          window.location.reload()
        }
      } catch (error) {
        console.error('Bank data fetch failed', error)
      } finally {
        setLoad(false)
      }
    }
  }

  return (
    <div>
      {load ? (
        <Loading />
      ) : (
        <center>
          <div className='Home-cnt-01-sub-01'>
            <strong>
              sta<span>W</span>ro
            </strong>
            <hr />
          </div>

          <h2 className='data_page-h2-01'>
            <span>User</span> Data
          </h2>
          <br />

          <div className='data_page-profile-cnt-01'>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJa_CcFSwA2X0Y-kYFsSxHaiPE5Z2EOd50FA&s'
              alt='profile'
            />
          </div>

          <h2 className='data_page-h2-02'>
            Hello <span>{data?.name}</span>.
          </h2>

          <div style={{ height: '20px' }}></div>

          <div className='data-page-main-cnt-01'>
            <span>
              Username : <strong>{data?.username}</strong>
            </span>
            <br />
            <br />
            <span>
              Name : <strong>{data?.name}</strong>
            </span>
            <br />
            <br />
            <span>
              Email : <strong>{data?.email}</strong>
            </span>
            <br />
          </div>

          <br />

          <div className='data-page-main-cnt-02'>
            {hasData ? (
              <div>
                {isBank ? (
                  <div className='data-page-main-cnt-02-sub-01'>
                    <h3>Bank</h3>
                    {info?.type === 'BANK' && (
                      <div>
                        <span>
                          Account Holder Name : <strong>{info.ac_h_name}</strong>
                        </span>
                        <br />
                        <span>
                          Account Number : <strong>{info.Acc_no}</strong>
                        </span>
                        <br />
                        <span>
                          Bank Name : <strong>{info.bank_name}</strong>
                        </span>
                        <br />
                        <span>
                          IFSC : <strong>{info.ifsc}</strong>
                        </span>
                        <br />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='data-page-main-cnt-02-sub-01'>
                    <h3>UPI</h3>
                    {info?.type === 'UPI' && (
                      <div>
                        <span>
                          Account Holder Name :{' '}
                          <strong>{info.ac_h_name}</strong>
                        </span>
                        <br />
                        <span>
                          UPI ID : <strong>{info.Acc_no}</strong>
                        </span>
                        <br />
                        <span>
                          App : <strong>{info.app}</strong>
                        </span>
                        <br />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2>No Bank / UPI Account Linked</h2>
              </div>
            )}
          </div>

          <div style={{ height: '50px' }}></div>
        </center>
      )}
    </div>
  )
}

export default Data
