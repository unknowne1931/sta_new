import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Loading from '../loading';

const Claimcupom = () => {

    const location = useLocation();
    const queryParm = new URLSearchParams(location.search);
    const id = queryParm.get('id');
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(()=>{
        if(id){
            try{
                setTimeout(()=>{
                    fetch(`${"http://192.168.31.133"}/get/coin/cupons/sds/by/id/${id}`)
                    .then(res => res.json())
                    .then(data =>{
                        setLoad(false);
                        setData(data.data)
                    })
                    .catch(error=>{
                        setLoad(false);
                        if (error.response) {
                            console.error("API Error:", error.response.status, error.response.data);
                        } else if (error.request) {
                            console.error("No response from server. Please check your connection.");
                        } else {
                            console.error("Error occurred:", error.message);
                        }
                    })
                },1000)
                
            }catch(error){
                setLoad(false);
                console.log(error)
            }
            
        }
    },[])



  return (
    <div>
        {load ? <Loading /> : 
        <center>
                <div className='Home-cnt-01-sub-01'>
                    <strong>sta<span>W</span>ro</strong>
                    <hr/>
                </div>
                <h1 className='Claim_cupon-h1-02'>Rank : <span>{data.no}</span></h1>

                <div className='claim_cupon-cnt-01'>
                    <span className='claim_cupon-cnt-01-span-01'>{data.title}</span>
                
                    <div className='claim_cupon-cnt-01-sub-div-cnt-01'>
                        <img src={data.img} alt='img' />
                    </div>
                    <span className='claim_cupon-cnt-01-span-03' >valid : {data.valid}</span><br/>
                    <span className='claim_cupon-cnt-01-span-02'>Time : {data.Time}</span><br/>
                    <span className='claim_cupon-cnt-01-span-04' >{data.body}</span>
                    <div className='claim_cupon-cnt-01-sub-div-cnt-02' onClick={()=>{window.location.href='/cart'}}>
                        Claim Now
                    </div>
                </div>

        </center>}
    </div>
  )
}

export default Claimcupom
