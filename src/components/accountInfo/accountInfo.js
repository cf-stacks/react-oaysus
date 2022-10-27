import React from 'react';
import Stepper from '../stepper/stepper';
import Classes from './scss/all.module.scss';

const accountInfoPageData = [
  {
    step: 0,
    title: 'Connect Your Wallet',
    description: 'Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.',
    children: null
  },
  {
    step: 1,
    title: 'Buy Oyasus',
    description: 'Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.',
    children: null
  },
  {
    step: 2,
    title: 'Stake Tokens',
    description: 'Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.',
    children: null
  },
  {
    step: 3,
    title: 'Connect Socials',
    description: 'Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.',
    children: null
  },
  {
    step: 4,
    title: 'Account Info',
    description: 'Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.',
    children: null
  }
]

const AccountInfoPage = () => {
  const step = 0;

  return (
    <div>
      <div className={Classes.banner}>
        <p>{accountInfoPageData[step].title}</p>
        <p>{accountInfoPageData[step].description}</p>
      </div>
      <div className={Classes.bgImage}>
        <Stepper accountInfoPageData={accountInfoPageData} step={step} />
        {accountInfoPageData[step].children}
      </div>
    </div>
  );
};

export default AccountInfoPage;
