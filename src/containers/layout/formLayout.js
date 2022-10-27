import React from 'react';

import AppHeader from '../appHeader/appHeader';
import Footer from '../../components/footer/footer';
import Classes from './scss/modules/all.module.scss';
import './scss/global/all.scss';

const FormLayout = props => {
  return (
    <>
      <AppHeader />
      <div className={Classes.formLayout}>
        <div className={Classes.formLayoutBgImage}>{props.children}</div>
      </div>
      <Footer />
    </>
  );
};

export default FormLayout;
