import React from 'react';
import { useState, useEffect } from 'react';
import { BaseUrl } from './BaseUrl';
import Loader from './Loader';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';
import './Res.css';

const Coins = () => {
  const [loading,setLoading]= useState(true);
  const [coins, setCoins] =useState([]);
  const [currency, setCurrency]=useState('inr');
  const [search,setSearch]=useState('');
  const currencySymbol=currency==='inr'? '₹': '$';

  const url=`${BaseUrl}/coins/markets?vs_currency=${currency}`;
  useEffect(()=>{
    const getCoinsData=async ()=> {
      const {data}=await axios.get(url);
      console.log("Api Coin res = ",data);
      setCoins(data);
      setLoading(false);
    }
    getCoinsData();
  },[currency]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="search-bar">
            <input type="text"
            placeholder='Search your coin'
             onChange={(e)=>setSearch(e.target.value)}/>
          </div>
          
          <div className="btns">
            <button onClick={()=>setCurrency('inr')}>INR</button>
            <button onClick={()=>setCurrency('usd')}>USD</button>
          </div>
          {coins.filter((data)=>{
            if(data==''){
              return data
            }else if (data.name.toLowerCase().includes(search.toLowerCase())){
              return data
            }
          }).map((coinData, i) => (
            <CoinCard key={coinData.id} coinData={coinData} i={i} id={coinData.id} currencySymbol={currencySymbol} />
            )
          )}
        </>
      )}
    </>
  );
}
const CoinCard=({coinData,i,currencySymbol,id})=>{
  const profit=coinData.price_change_percentage_24h>0;
  return (
    <Link to={`/coins/${id}`} style={{color:"white", textDecoration:'none'}}>
    <div className='ex-cards'>
              <div className="image">
                <img src={coinData.image} height={"80px"} alt="Coin-Image" />
              </div>
              <div className="name">
                {coinData.name}
              </div>
              <div className="price">
               {currencySymbol} {coinData.current_price.toFixed(1)}
              </div>
              <div style={profit?{color:"green"}:{color:"red"}} className="rank">
                  {profit ? "+" + coinData.price_change_percentage_24h.toFixed(2): coinData.price_change_percentage_24h.toFixed(2)}
              </div>
            </div>
      </Link>

  )
}

export default Coins;