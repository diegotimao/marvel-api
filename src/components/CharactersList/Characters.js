import React, { useContext } from 'react';
import { AuthContext } from '../../providers/Auth';
import { FiHeart } from 'react-icons/fi';

import "./styles.css";

function Characters() {
  const { 
    filters, 
    setCards, 
    setCardViwer, 
  } = useContext(AuthContext);

  function handleFavorite(id) {
    const newCards = filters.map( card => {
      return card.id === id ? { ...card, favorite: !card.favorite } : card;
    });
    setCards(newCards);
  }

  return (
    <div className="characters-container">
      <div className="content">
        <div className="cards">
          {filters.map((card) => (
            <div className="card" 
              key={ card.id } data-aos="zoom-in">
              <div className="card-header" onClick={ () => setCardViwer(card)}>
                <img src={ card.thumbnail.path + "/portrait_incredible.jpg"} 
                  alt="CharacterImage" 
                />
                <div className="poster">
                  <h3>Ver detalhado</h3>
                </div>
              </div>
              <div className="card-body">
                <div className="card-content">
                  <h1>{card.title.substring(0,20)}</h1>
                  <p>{card.format}</p>
                </div>
              </div>
              <div className="card-footer">
                <FiHeart stroke={(card.favorite) ? 'red' : 'gray'} size={25} fill={(card.favorite) ? 'red' : 'gray'} onClick={ () => handleFavorite(card.id)} className="icon-favorites" />
                <strong className="price">{(card.prices[0].price === 0) 
                    ? 'Esgotado' : card.prices[0].price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Characters;