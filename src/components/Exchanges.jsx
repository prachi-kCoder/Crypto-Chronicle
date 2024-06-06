
//--------------------Modified--------------------------------------------

import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';
import Loader from './Loader';

import './Exchanges.css';
import OurModel from './OurModel';

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  const [localImages, setLocalImages] = useState([]);

  const url = `${BaseUrl}/exchanges`;

  useEffect(() => {
    const getExchangesData = async () => {
      const [apiResponse, localImagesResponse] = await Promise.all([
        axios.get(url),
        axios.get('/localImages.json')
      ]);

      const apiData = apiResponse.data;
      const imagesData = localImagesResponse.data;

      // Merge the local images with the API data
      const mergedData = apiData.map(exchange => {
        const localImage = imagesData.find(img => img.id === exchange.id);
        return {
          ...exchange,
          image: localImage ? localImage.image : exchange.image
        };
      });

      setExchanges(mergedData);
      setLoading(false);
    };
    getExchangesData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <OurModel />
          <div>
            {exchanges.map((item, i) => (
              <div key={i} className="ex-cards">
                <div className="image">
                  <img src={item.image} height={"80px"} alt="Ex-Image" />
                </div>
                <div className="name">
                  {item.name}
                </div>
                <div className="price">
                  {item.trade_volume_24h_btc.toFixed(2)}
                </div>
                <div className="rank">
                  {item.trust_score_rank}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Exchanges;
