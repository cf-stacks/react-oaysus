import { ColorModeScript, ThemeProvider, ColorModeProvider } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import { MetaMaskProvider } from './hooks/metaMask';

import customTheme from './theme';

// layout router
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
function getLibrary(provider, connector) {
  return new Web3(provider);
}

root.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <ThemeProvider theme={customTheme}>
          <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
          <ColorModeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ColorModeProvider>
        </ThemeProvider>
      </MetaMaskProvider>
    </Web3ReactProvider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
