import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Naviba from './naviba'
import Popup from '../pages/popup';
import Loading from '../loading';

const Cupon = () => {

    const user = localStorage.getItem("username");
    const [title, setTitle] = useState([]);
    const [img, setImg] = useState([]);
    const [valid, setValid] = useState([]);
    const [body, SetBody] = useState([]);
    const [type, setType] = useState([]);
    const [cupon_data, setCupon_Data] = useState([]);

    const [data, setData] = useState([])
    const [alert, setAlert] = useState(false)
    const [load, setLoad] = useState(true);

    useEffect(()=>{
        GetCupon()
    },[])

    const GetCupon = () =>{
        try{
            setTimeout(()=>{
                fetch(`${"http://kalanirdhari.in"}/get/cupon/get/all/datas`)
                .then(res => res.json())
                .then(data =>{
                    if(data.data){
                        setCupon_Data(data.data)
                        setLoad(false);
                    }else{
                        setLoad(false);
                        console.log("Unexpected error", data)
                    }
                }).catch(error=>{
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
    
    const PostS = (e) =>{
        try{
            e.preventDefault();
            setAlert(false)
            axios.post(`${"http://kalanirdhari.in"}/get/new/cupon/for/neww/cupon`, {title, img, valid, body, type, user})
            .then(res=>{
                if(res.data.Status === "OK"){
                    GetCupon()
                    setData("New Cupon Created");
                    setAlert(true);
                }else{
                    setData("Something went Wrong");
                    setAlert(true)
                }
            })
            .catch(error=>{
                if (error.response) {
                    console.error("API Error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("No response from server. Please check your connection.");
                } else {
                    console.error("Error occurred:", error.message);
                }
            })
        }catch(error){
            console.log(error)
        }
        
    }
  
    return (
    <div>
        {load ? <Loading /> : 
        <center>
            <div className='Home-cnt-01-sub-01'>
                <strong>sta<span>W</span>ro</strong>
                <hr/>
            </div>
            <h1 className='admin_cupon-h1-01'>Cupons Adds</h1>

            <div className='admin_cupon-main-cnt-01'> 
                <form onSubmit={PostS}>
                    <input type='text' placeholder='Title' onChange={e=>{setTitle(e.target.value)}} required /><br/>
                    <input type='url' placeholder='Image' onChange={e=>{setImg(e.target.value)}} required /><br/>
                    <input type='date' placeholder='valid' onChange={e=>{setValid(e.target.value)}} required /><br/>
                    <input type='text' placeholder='Body of Text' onChange={e=>{SetBody(e.target.value)}} required /><br/>
                    <select required onChange={e=>{setType(e.target.value)}} >
                        <option value=''>select</option>
                        <option value='Cupon'>Cupon</option>
                        <option value='Money'>Money</option>
                    </select><br/>
                    <button type='submit'>Post</button>
                </form>
            </div>
            <br />

            <div className='cart-page-main-cnt-02-sub-cnt-01'>

                {cupon_data.map((data, i) =>{

                    const Dele = () =>{
                        try{
                            setAlert(false)
                            axios.delete(`${"http://kalanirdhari.in"}/delete/cupon/s/by/id/${data._id}`)
                            .then(res=>{
                                if(res.data.Status === "OK"){
                                    GetCupon()
                                }else{
                                    setData("Something went Wrong")
                                    setAlert(true)
                                }
                            }).catch(error=>{
                                if (error.response) {
                                    console.error("API Error:", error.response.status, error.response.data);
                                } else if (error.request) {
                                    console.error("No response from server. Please check your connection.");
                                } else {
                                    console.error("Error occurred:", error.message);
                                }
                            })
                        }catch(error){
                            console.log(error)
                        }
                        

                    }

                    return(
                        <div key={i} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01'>
                            <strong className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-strong-01'>{data.title}</strong>
                            <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-01'>
                                <img src={data.img} alt='img' />
                            </div><br/>
                            <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-01'>Valid : <strong>{data.valid}</strong></span><br/>
                            <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-02'>No : <strong>{i+1}</strong></span><br/>
                            <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-02'>
                                <strong onClick={Dele}>Delete</strong>
                            </div>
                        </div>
                    )
                })}

            </div>
            <div style={{height : "50px"}}>

            </div>


        </center>}
        <Naviba />
        {alert &&
        <Popup data={data} val={alert} />
        }
    </div>
  )
}

export default Cupon
