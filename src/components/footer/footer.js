import React from 'react';
import { ButtonGroup, Container, IconButton } from '@chakra-ui/react';
import { FaTwitter, FaMediumM, FaDiscord } from 'react-icons/fa';
import { SiGitbook } from 'react-icons/si';
import Classes from './scss/all.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Container className={
      window.location.pathname.includes('terms-of-service') ? [
        Classes.footerContainer, Classes.footerSmaller
      ].join(' ') : Classes.footerContainer
    }>
      <span className={Classes.footerMainColor}>Connect with us</span>
      <ButtonGroup
        variant="ghost"
        className={[Classes.footerBtnGroup, Classes.footerSubColor].join(' ')}>
        <IconButton
          as="a"
          href="https://gitbook.oaysus.com/"
          target="_blank"
          icon={<SiGitbook fontSize="1.5rem" />}
        />
        <IconButton
          as="a"
          href="https://discord.gg/mXd9rvBd"
          target="_blank"
          icon={<FaDiscord fontSize="1.5rem" />}
        />
        <IconButton
          as="a"
          href="https://twitter.com/oaysus"
          target="_blank"
          icon={<FaTwitter fontSize="1.5rem" />}
        />
        <IconButton
          as="a"
          href="https://medium.com/@oaysus"
          target="_blank"
          icon={<FaMediumM fontSize="1.5rem" />}
        />
      </ButtonGroup>
      <div
        fontSize="sm"
        color="subtle"
        className={[Classes.proDate, Classes.footerSubColor].join(' ')}>
        <a href="/terms-of-service">Terms of Service{' '}</a>
        <span className={[Classes.footerMainColor, Classes.copy].join(' ')} ml={[2]}>
          Oaysus &copy; {currentYear}
        </span>
      </div>
    </Container>
  );
};

export default Footer;
