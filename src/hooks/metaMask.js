import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { injected } from '../components/wallet/connectors';
import { useWeb3React } from '@web3-react/core';

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({ children }) => {
    const { ethereum } = window;
    const { activate, account, active, deactivate } = useWeb3React();
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Init Loading
    useEffect(() => {
        connect().then(() => {
            setIsLoading(true);
        });
    }, []);

    const handleIsActive = useCallback(() => {
        setIsActive(active);
    }, [active]);

    useEffect(() => {
        handleIsActive();
    }, [handleIsActive]);

    // Connect to MetaMask wallet
    const connect = async () => {
        console.log('Connecting to MetaMask Wallet');
        if (ethereum.networkVersion !== 56) {
            await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{
                    chainId: "0x38",
                    // rpcUrls: ["https://bsc-dataseed.binance.org/"],
                    // chainName: "Binance Mainnet",
                    // nativeCurrency: {
                    //     name: "BNB",
                    //     symbol: "BNB",
                    //     decimals: 18
                    // },
                    // blockExplorerUrls: ["https://bscscan.com/"]
                }]

            });
        }

        try {
            await activate(injected);
        } catch (error) {
            console.log('Error on connecting: ', error);
        }
    }

    // Disconnect from Metamask wallet
    const disconnect = async () => {
        console.log('Deactivating...');
        try {
            await deactivate();
        } catch (error) {
            console.log('Error on disconnecting: ', error);
        }
    }

    const values = useMemo(
        () => ({
            isActive,
            account,
            isLoading,
            connect,
            disconnect
        }),
        [isActive, isLoading]
    );

    return <MetaMaskContext.Provider value={values}>{children}</MetaMaskContext.Provider>
}

export default function useMetaMask() {
    const context = React.useContext(MetaMaskContext);

    if (context === undefined) {
        throw new Error('useMetaMask hook must be used with a MetaMaskProvider component');
    }

    return context;
}