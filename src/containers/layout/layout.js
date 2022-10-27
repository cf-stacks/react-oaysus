import React from 'react';

import Header from '../header/header';
import AppHeader from '../appHeader/appHeader';
import Footer from '../../components/footer/footer';
import Classes from './scss/modules/all.module.scss';
import './scss/global/all.scss';

const Layout = props => {
  return (
    <div className={ props.mobileHeader? Classes.mobileLayout : Classes.layoutContainer}>
      {
        props.mobileHeader? <AppHeader /> : <Header />
      }
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
