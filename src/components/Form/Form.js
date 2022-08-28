import React, { useContext } from 'react';
import { AuthContext } from '../../providers/Auth';

import './form.css';

function Form() {
  const { setFilterByName, setFavorits, setEnviosModal } = useContext(AuthContext);

  return (
    <div className="form-container">
      <div className="form-content">
        <strong>Filtros</strong>
        <div className="filter-content">
          <div className="filtros">
            <button onClick={ () => setFavorits(false) }>Todos</button>
            <button onClick={ () => setFavorits(true) }>Favoritos</button>
            <button onClick={ () => setEnviosModal(true)}>Meus Envios</button>
          </div>
          <input placeholder="Pesquisar" onChange={ (e) => setFilterByName({ name: e.target.value})}/>
        </div>
      </div>
    </div>
  );
}

export default Form;