import React, { useContext } from 'react';
import { AuthContext } from '../../providers/Auth';
import { FiXSquare } from 'react-icons/fi';
import './modal.css';


function ModalOverViwer() {
  const {
    cardViwer,
    setCardViwer,
    setActiveModal,
    setCardToShipping,
    setIsCardToShipping,
  } = useContext(AuthContext);

  const creatorsAll = cardViwer.creators.items.splice(0, 3);
  const comicsImages = cardViwer.images.splice(0, 6);

  function resetModal() {
    setCardViwer([])
    return setActiveModal(false);
  }

  function addCommicShipping(comic) {
    setCardViwer([]);
    setActiveModal(false);
    setIsCardToShipping(true);
    return setCardToShipping(comic);
  }

  return (
    <div className='modal-viwer-container'>
      <div 
        className='modal-viwer-content' 
        data-aos="zoom-out-up" 
        data-aos-duration="200">
        <div className='modal-header'>
          <strong>Detalhes do Card</strong>
          <FiXSquare size={30} className="btn-close" onClick={ () => resetModal()}/>
        </div>
        <div className='card-modal'>
          <div className='card-image'>
            <img 
              src={ cardViwer.thumbnail.path + "/standard_fantastic.jpg" } 
              alt={ cardViwer.name } 
            />
          </div>
          <div className='card-info'>
            <div className='card-description'>
              <h1>{ cardViwer.title }</h1>
              {(creatorsAll.length > 0) ? (
                <div className='creators'>
                  <strong>Criadores</strong>
                  <ul className='creators-list'>
                    {creatorsAll.map((creator) => (
                      <li key={creator.name}>{creator.name}</li>
                    ))}
                  </ul>
                </div>
              ) 
              : null }
              <p>
                {(cardViwer.textObjects[0]) 
                  ? cardViwer.textObjects[0].text.substring(0,180) 
                  : 'Este card não possui descrição!'
                }
              </p>
              <div className='card-info-details'>
                <strong className='format'>
                  {cardViwer.format}
                </strong>
                <strong className='prices'>
                  {cardViwer.prices[0].price.toLocaleString('pt-br',
                  {style: 'currency', currency: 'BRL'})}
                </strong>      
              </div>
              <div className='action-pay'>
                <button onClick={ () => addCommicShipping(cardViwer) }
              >
                Comprar Commics
              </button>
              </div> 
            </div>
          </div>
        </div>
        {(comicsImages.length > 0) ? (
          <div className='images-related'>
            <h1>Imagens Relacionadas</h1>
            <ul className='images-related-list'>
              { comicsImages.map((image, index) => (
                <li className='images-related-item' key={index}>
                  <img src={image.path + "/standard_fantastic.jpg"} 
                    alt='Creators' 
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null }
      </div>
    </div>
  );
}

export default ModalOverViwer;