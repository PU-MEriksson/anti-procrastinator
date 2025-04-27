import { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import logoImage from '../assets/momentum-logo.png';

const HeaderContainer = styled.header`
  background-color: #b2cbf6;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  
  a {
    color: white;
    text-decoration: none;
    
    &:hover {
      text-decoration: none;
      color: #f1faee;
    }
  }
`;

const LogoImage = styled.img`
  height: 60px; 
  width: auto;
  text-align: center;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <NavContainer>
        <Logo>
          <LogoLink to="/">
            <LogoImage src={logoImage} alt="Momentum Logo" />
          </LogoLink>
        </Logo>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;