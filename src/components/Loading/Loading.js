import React from 'react';
import { ImEarth } from "react-icons/im";
import './loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-content" 
        data-aos="zoom-in-up" 
        data-aos-duration="300"
      >
        <ImEarth size={30} color="green" />
        <strong>Estabelecendo conexão com Api..</strong>
      </div>
    </div>
  );
}

export default Loading;