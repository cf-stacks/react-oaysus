import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

import Classes from './scss/all.module.scss';
import Logo from '../../../assets/images/logo.png';

const Navigation = () => {
  return (
    <nav className={Classes.navigation}>
      <a href="/">
        <img src={Logo} className={Classes.logo} />
      </a>
      <div className={Classes.navigationMenu}>
        <ul>
          <li>
            <a href="/buynow">
              <FaCalendarAlt fontSize="15px" />
              <span>Buy Oaysus Now</span>
            </a>
          </li>
          <li>
            <a href="/home">Launch App</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
