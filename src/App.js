import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

// pages
import Home from './containers/home/home';
import WalletInfo from './containers/walletInfo/walletInfo';
import AccountInfo from './containers/accountInfo/accountInfo';
import TermsOfService from './containers/termsOfService/termsOfService';
import Swap from './containers/swap/swap'; 

import { Routes, Route } from "react-router-dom";
import customTheme from './theme';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buynow" element={<WalletInfo />} />
        <Route path="/account-info" element={<AccountInfo />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/swap" element={<Swap />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
