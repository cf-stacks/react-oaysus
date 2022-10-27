/* eslint-disable no-unused-vars */
import { Button } from '@chakra-ui/react';

import useMetaMask from '../../hooks/metaMask';

const MetaMask = () => {
  const { connect, disconnect, isActive, account } = useMetaMask();

  return (
    <div className="App-header">
      {isActive ? (
        <Button colorScheme="teal" variant="outline" m={[5]} onClick={disconnect}>
          {account}
        </Button>
      ) : (
        <Button
          colorScheme="teal"
          variant="outline"
          justifySelf="flex-end"
          m={[5]}
          onClick={connect}>
          Connect
        </Button>
      )}
    </div>
  );
};

export default MetaMask;
