import React, { useCallback } from "react";
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import { AuthContext } from "../../providers/Auth";

const AnyReactComponent = ({ text }) => {
  return <div>{text}</div>
}

export default function Maps() {
  const { setAdress } = React.useContext(AuthContext);

  const key = "AIzaSyDiW9cF3VSubpmO1F85aDn6zpxObmnawZE";
  
  const defaultProps = {
    center: {
      lat: -9.404384,
      lng: -38.224871
    },
    zoom: 15,
    opt: {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
    }
  };
  
  const stylers = useCallback(() => {
    return {
      'saturation': -5000, 
      'gamma': 1.0,
      'color': '#000000',
      'lightness': 17,
      'visibility': 'on',
      "featureType": "administrative",
      "elementType": "geometry.fill",
    }
  }, []);

  async function getByAddres(latitude, longitude) {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`);
    const nameRua = response.data.results[0].address_components[1];
    const nameBairro = response.data.results[0].address_components[2];
    const nameCity = response.data.results[0].address_components[3];
    const estado = response.data.results[0].address_components[4];

    return setAdress({
      nameRua: nameRua,
      nameBairro: nameBairro,
      nameCity: nameCity,
      estado: estado,
    });
  }

  function _onClick(obj){
    return getByAddres(obj.lat, obj.lng)
  }

  return (
    <div style={{ height: '100%', width: '100%' }} >
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={_onClick}
        options={[
          defaultProps.opt.panControl, 
          defaultProps.opt.mapTypeControl, 
          defaultProps.opt.scrollwheel, 
          stylers 
        ]}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text=""
        />
      </GoogleMapReact>
    </div>
  );
}