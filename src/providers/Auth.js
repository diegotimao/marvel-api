import React, { useEffect, useMemo, useState } from 'react'
import Aos from "aos";
import "aos/dist/aos.css";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {

  const keyHash = "f600a2df83621f0496a16578bdb251ab";
  const keyApi = "664dd1acacbab143b941a837c4dff8d3";

  const [adress, setAdress] = useState({
    nameRua: '',
    nameBairro: '',
    nameCity: '',
    estado: '',
  });

  const [numero, setNumero] = useState({
    numerAdress: '',
  });

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardViwer, setCardViwer] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [cardToShipping, setCardToShipping] = useState([]);
  const [isCardToShipping, setIsCardToShipping] = useState(false);
  const [comicsSent, setComicsSent] = useState([]);
  const [enviosModal, setEnviosModal] = useState(false);
  const [filtersByName, setFilterByName] = useState({ name: '' });
  const [favorits, setFavorits] = useState(false);

  const [filters, setFilters] = useState([])

  useEffect(() => {
    if (cardViwer.length !== 0) {
      return setActiveModal(true);
    }
    return setActiveModal(false)
  }, [cardViwer]);

  useEffect(() => {
    if (cardToShipping.length !== 0) {
      return setIsCardToShipping(true);
    }

    setIsCardToShipping(false);
    return setAdress({
      nameRua: '',
      nameBairro: '',
      nameCity: '',
      estado: '',
    });

  }, [cardToShipping]);

  useEffect(() => {
    if (cards.length !== 0) {
      return setLoading(false);
    }
    return setLoading(true);
  }, [cards]);

  useEffect(() => {
    if (favorits) {
      const isFavorit = cards.filter((item) => item.favorite === true);
      return setFilters(isFavorit)
    }
    return setFilters(cards);
  }, [cards, favorits]);

  useMemo(() => {
    const lowerBusca = filtersByName.name.toLocaleLowerCase();
    const newFilter = cards.filter((item) => item.title.includes(lowerBusca));

    return setFilters(newFilter);
  }, [cards, filtersByName.name]);

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
    
    const getData = async () => {

      const response = await fetch(`http://gateway.marvel.com/v1/public/comics?limit=100&ts=1&apikey=${keyApi}&hash=${keyHash}`);
      const { data: { results }} = await response.json();
      
      const newObject = results.filter((item) => 
        !item.thumbnail.path.includes('image_not_available') 
        || !item.thumbnail.path === '' 
        || !item.description === '');
      setCards(newObject);
      setFilters(newObject);
      setLoading(false);

    }
    getData();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        cards,
        adress,
        loading,
        activeModal,
        cardViwer,
        cardToShipping,
        isCardToShipping,
        comicsSent,
        numero,
        enviosModal,
        filters,
        setCards,
        setNumero,
        setCardViwer,
        setActiveModal,
        setAdress,
        setCardToShipping,
        setIsCardToShipping,
        setComicsSent,
        setEnviosModal,
        setFilterByName,
        setFavorits,
      }}>
      { children }
    </AuthContext.Provider>
  )
}

