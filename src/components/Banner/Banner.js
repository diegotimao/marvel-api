import React from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

import './banner.css';
import BannerImage from '../../assets/banner.svg';
import Logo from '../../assets/logo.svg';

function Banner() {

  return (
    <div className="banner-container">
      <div className="nav-menu-container">
        <div className="nav-menu-content">
          <img src={ Logo } alt="Logo Icon" />
          <ul className="menu-list">
            <li>
              <FiGithub size={20}/>
            </li>
            <li>
              <FiLinkedin size={20}/>
            </li>
          </ul>
        </div>
      </div>
      <div className="banner-content">
        <div className="description-banner">
          <h1>Sou o <strong>melhor no que faço</strong>, mas o que eu faço pode não ser o melhor.</h1>
          <p>"Wolverine"</p>
        </div>
        <img src={BannerImage} alt="Banner" />
      </div>
    </div>
  );
}

export default Banner;