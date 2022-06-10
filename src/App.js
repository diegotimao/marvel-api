import React, { useContext } from "react";
import { AuthContext } from "./providers/Auth";
import Characters from "./components/CharactersList/Characters";

import './global.css';
import Banner from "./components/Banner/Banner";
import ModalOverViwer from "./ModalOverViwer/Modal";
import ModalGoogleMaps from './components/ModalAdress/Modal';
import ComicsModalEnvios from "./components/ComicsModalEnvios/ComicsModalEnvios.js";
import Form from "./components/Form/Form";

function App() {
  const { 
    activeModal, 
    isCardToShipping, 
    enviosModal 
  } = useContext(AuthContext);

  return (
    <div className="home-container">
        {
          (activeModal) && <ModalOverViwer /> 
        }
        {
          (isCardToShipping) && <ModalGoogleMaps />
        }
        {
          (enviosModal) && <ComicsModalEnvios />
        }
        <Banner />
        <Form />
        <Characters />
    </div>
  );
}

export default App;
