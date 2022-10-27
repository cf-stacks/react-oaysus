import React, { Fragment } from 'react';
import AppHeaderComponent from '../../components/header/navigation/appHeader';
import Classes from './scss/all.module.scss';

export default function AppHeader() {
  
  return (
    <Fragment>
      <header className={
        window.location.pathname.includes('terms-of-service') ? [
          Classes.appHeader, Classes.basicHeader
        ].join(' ') : Classes.appHeader
      }>
        <AppHeaderComponent />
      </header>
    </Fragment>
  );
}