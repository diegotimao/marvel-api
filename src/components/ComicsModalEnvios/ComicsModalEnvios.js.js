import React, { useContext } from 'react';
import { AuthContext } from '../../providers/Auth';
import { FiXSquare, FiFrown, FiTrash2 } from  "react-icons/fi";

import './comicsEnvio.css';

function Favorites() {
  const { 
    setEnviosModal,
    comicsSent,
    setComicsSent,
  } = useContext(AuthContext);

  function commicCancel(id) {
    const newList = comicsSent.filter(comic => {
      return comic.cardToShipping.id !== id;
    });
    setComicsSent(newList);
  }

  return (
    <div className='modal-viwer-container'>
      <div className='modal-content-favorits' 
        data-aos="zoom-out-up" 
        data-aos-duration="200"
      >
        <div className='modal-header'>
          <strong>Commics enviados</strong>
          <span className="btn-close" 
            onClick={ () => setEnviosModal(false)}>
            <FiXSquare size={30} />
          </span>
        </div>

        <div className="cards-favorites">
          {(comicsSent.length > 0) 
            ? comicsSent.map((commic, index) => (
            <div className="card-selecionado" key={index}>
              <img src={ commic.cardToShipping.thumbnail.path + "/standard_fantastic.jpg"} 
                alt={ commic.cardToShipping.name } 
              />
              <div className="info-card">
                <strong className="title-card">
                  {(commic.cardToShipping.title) 
                    ? commic.cardToShipping.title.substring(0,30) 
                    : 'Este card não possui uma descrição'
                  }
                </strong>
                <p className="description-card">
                  {(commic.cardToShipping.description) 
                    ? commic.cardToShipping.description.substring(0,65) 
                    : 'Este card não possui uma descrição'}
                  .</p>
                <div className="values-card">
                  <span className="format-card">
                    {(commic.cardToShipping.format) 
                      ? commic.cardToShipping.format 
                      : null 
                    }
                  </span>
                </div>
              </div>
              <div className="card-action">
                <div className="card-action-content">
                  <FiTrash2 onClick={ () => commicCancel(commic.cardToShipping.id)} />
                  <strong className="price-card">
                      {commic.cardToShipping.prices[0].price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                  </strong>
                </div>
              </div>
            </div>
          )) : 
            <div className="more-info">
              <div className="more-info-content">
                <FiFrown size={45} stroke="#F2C94C" />
                <h1>Você não possui comics cadastrado pra envio!</h1>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Favorites;