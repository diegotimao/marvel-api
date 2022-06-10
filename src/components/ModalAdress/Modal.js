import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/Auth';
import { FiMap, FiXSquare } from 'react-icons/fi'

import IconAtencao from '../../assets/atenção.svg';
import Maps from '../GoogleMaps/Maps';
import './mapsModal.css';

function Modal() {
  const { 
    cardToShipping,
    adress, 
    setCardToShipping, 
    setIsCardToShipping, 
    comicsSent, 
    setComicsSent 
  } = useContext(AuthContext);

  const [numberAdress, setNumberAdres] = useState('');

  function resetModal() {
    setCardToShipping([]);
    return setIsCardToShipping(false);
  }

  function addToAdress() {
    if (numberAdress !== '') {
      setComicsSent([
        ...comicsSent, {
          cardToShipping,
          destination: {
            ...adress,
            numberAdress,
          }
        }]);
      return resetModal();
    }
    return;
  }

  return (
    <div className="modal-container"> 
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title ">
            <FiMap size={24}/>
            <h1>Endereço de entrega</h1>
          </div>
          <FiXSquare size={25} onClick={ () => resetModal() } className="btn-close"/>
        </div>
        <div className="modal-body">
          <div className='dados-form'>
            <div className="card-selecionado">
              <img src={ cardToShipping.thumbnail.path + "/standard_fantastic.jpg"} 
                alt={ cardToShipping.name } />
              <div className="info-card">
                <strong className="title-card">
                  {(cardToShipping.title) 
                  ? cardToShipping.title.substring(0,25) 
                  : 'Este card não possui uma descrição'
                }</strong>
                <p className="description-card">
                  {(cardToShipping.description) 
                  ? cardToShipping.description.substring(0,30) 
                  : 'Este card não possui uma descrição'}
                .</p>
                <div className="values-card">
                  <span className="format-card">
                    {(cardToShipping.format) 
                    ? cardToShipping.format : null }
                  </span>
                  <strong className="price-card">
                    {cardToShipping.prices[0].price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                  </strong>
                </div>
              </div>
            </div>
            <div className="form">
              <div className="adress-item">
                <label>Rua</label>
                <span className="item">
                  {(adress.nameRua.long_name)
                  ? adress.nameRua.long_name 
                  : adress.nameRua.short_name}
                </span>
              </div>
              <div className="adress-item">
                <label>Bairro</label>
                <span className="item">
                  {(adress.nameBairro.long_name) 
                  ? adress.nameBairro.long_name 
                  : adress.nameBairro.short_name}
                </span>
              </div>
              <div className="adress-item">
                <label>Cidade</label>
                <span className="item">
                  {(adress.nameCity.long_name) 
                  ? adress.nameCity.long_name 
                  : adress.nameCity.short_name}
                </span>
              </div>
              <div className="section-grid">
                <div className="section-grid-item-currenty">
                  <label>Estado</label>
                  <span className="section-grid-item ">
                    {(adress.estado.long_name) 
                    ? adress.estado.long_name 
                    : adress.estado.short_name}
                  </span>
                </div>
                <div className="section-grid-item-resindency">
                  <label>Casa</label>
                  <input type="number"
                    placeholder='Numero'
                    value={numberAdress} 
                    onChange={ (e) => setNumberAdres(e.target.value)}
                    required={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="google-maps">
            <Maps />
          </div>
        </div>
        <div className="footer-action">
          <div className="message-info">
            <img src={ IconAtencao } alt="Icon atenção" />
            <strong>Importante!</strong> 
            <strong>Use o mapa para selecionar seu endeço</strong>
          </div>
          <button type="button" className="btn-address" 
            onClick={ () => addToAdress() } 
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;