import React from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Input,
  Button,
  Stat,
  StatNumber,
  StatHelpText,
  GridItem,
  SimpleGrid,
} from '@chakra-ui/react';
import Classes from './scss/all.module.scss';
import BannerIcon from '../../assets/images/icons/bannerIcon.png';

const HompePage = () => {
  return (
    <>
      <div className={Classes.bgColor}>
        <div className={Classes.banner}>
          <p>Get deeper insights into your crypto investments</p>
          <p>
            Earn <b>100,000% APY</b> by holding
            <span>
              <img src={BannerIcon} className={Classes.bannerIcon} />
            </span>
            <span className={Classes.colorOaysus}>Oaysus</span>. The more tokens you hold, the more
            insights you get on your investments. A protocol that changes the way you invest.
          </p>
        </div>
        <div className={Classes.bgImage}>
          <div className={Classes.wrapper}>
            <Input placeholder="Enter Token Name" />
            <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" variant="outline">
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div className={Classes.summaryInfo}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
          <GridItem w="100%" h="8">
            <Stat>
              <StatNumber className={Classes.statNumber}>$10.5</StatNumber>
              <StatHelpText className={Classes.helpText}>Oaysus Price</StatHelpText>
            </Stat>
          </GridItem>
          <GridItem w="100%" h="8">
            <Stat>
              <StatNumber className={Classes.statNumber}>$50,2M</StatNumber>
              <StatHelpText className={Classes.helpText}>Market Cap</StatHelpText>
            </Stat>
          </GridItem>
          <GridItem w="100%" h="8">
            <Stat>
              <StatNumber className={Classes.statNumber}>100,050%</StatNumber>
              <StatHelpText className={Classes.helpText}>APY</StatHelpText>
            </Stat>
          </GridItem>
          <GridItem w="100%" h="8">
            <Stat>
              <StatNumber className={Classes.statNumber}>45,000</StatNumber>
              <StatHelpText className={Classes.helpText}>Investors</StatHelpText>
            </Stat>
          </GridItem>
        </SimpleGrid>
      </div>
    </>
  );
};

export default HompePage;
