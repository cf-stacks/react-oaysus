import React from 'react';
import { BsGlobe } from 'react-icons/bs';
import CoinIcon from '../../../assets/images/icons/coinIcon.svg';
import Classes from './scss/all.module.scss';
import Logo from '../../../assets/images/logo.png';
import Beosin from '../../../assets/images/beosin.svg';

const AppHeaderComponent = () => {
  return (
    <nav className={Classes.mobileNavigation}>
      <a href="/">
        <img src={Logo} className={Classes.logo} />
      </a>
      <ul className={Classes.rightNavMenu}>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/swap">Swap</a>
        </li>
      </ul>
      <div className={Classes.navigationMenu}>
        <ul>
          <li>
            <a href="#">
              <img src={Beosin} />
            </a>
          </li>

          <li>
            <a href="/buynow">
              <BsGlobe fontSize="20px" />
              <span>Network</span>
            </a>
          </li>
          <li className={Classes.price}>
            <a href="/buynow">
              <img src={CoinIcon} />
              <span>24,033.00</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AppHeaderComponent;
