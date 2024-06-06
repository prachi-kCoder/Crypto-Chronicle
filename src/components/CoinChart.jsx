import React,{useState,useEffect} from 'react';
import { BaseUrl } from './BaseUrl';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loader from './Loader';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

const CoinChart = ({currency}) => {
    const [chartData,setChartData]=useState([]);
    const {id}=useParams();
    const [days,setDays]=useState(1);
    const CoinChartData=async()=>{
        try{

            const {data}=await axios.get(`${BaseUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
            // console.log("Coin Chart Details : ",data);
            setChartData(data.prices);
        }catch(error){
            console.log("Error in fetching coin chart data : ",error);
        }
    };
    useEffect(()=>{
        CoinChartData();
    },[currency,id,days]);
    const myData={
        labels:chartData.map((value)=>{
            const date=new Date(value[0]);//ie array ke 0 index pr date h and 1 idx pr price
            console.log("Date=",date);
            const time=date.getHours()>12
             ? `${date.getHours()-12}:${date.getMinutes()} PM`
             : `${date.getHours()} :${date.getMinutes()} AM`
             return days===1?time:date.toLocaleDateString();
        }) ,
        datasets:[
            {
                label:`Price in past days ${days} in ${currency}`,
                data:chartData.map((value)=>value[1]),//ie idx1 ele of data is price
                borderColor:'orange',
                borderWidth:'3'
            }
        ]
    }
  return (
    <>
    {chartData.length === 0 ?(<Loader/>):(
        <div>
        <Line data={myData} options={{
            elements:{
                point:{
                    radius:1,
                }
            }
        }} style={{marginTop:'5rem',width:'60rem'}}/> 
        <div className='btn' style={{marginTop:"30px"}}>
             <button onClick={()=>setDays(1)} >24 Hours</button>
             <button onClick={()=>setDays(30)}>1 Month</button>
             <button onClick={()=>setDays(365)}>1 Year</button>
           </div>
    </div>
    )
    }
    </>
  )
}

export default CoinChart;