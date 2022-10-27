import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({ supportedChainIds: [56] });

// 1    Ethereum Mainnet
// 25   Cronos Mainnet Beta
// 56   Binance Mainnet
// 42   Kovan Testnet
// 1337 Local Host chain 
