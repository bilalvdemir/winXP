import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import windowsXpLogoWhiteText from 'assets/images/windows-xp-logo-white-text.png';
import microsoftLogo from 'assets/images/microsoft-logo.jpg';

// Atlamalı loading-bars animasyonu (kısa mesafeli)
// Atlamalı loading-bars animasyonu (eşit hızlı)
const loadingBars = keyframes`
    0% {
        left: -20%;
    }
    14.28% {
        left: -10%;
    }
    28.56% {
        left: 0%;
    }
    42.84% {
        left: 20%;
    }
    57.12% {
        left: 40%;
    }
    71.4% {
        left: 60%;
    }
    85.68% {
        left: 80%;
    }
    100% {
        left: 100%;
    }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const StartupScreen = ({ onComplete }) => {
  useEffect(() => {
    // 7 saniye sonra otomatik geçiş (orijinal gibi)
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <StartupContainer>
      <StartupLogoLoaderWrapper>
        <StartupLogo>
          <img src={windowsXpLogoWhiteText} alt="Windows logo" />
        </StartupLogo>
        <StartupLoader>
          <LoadingBarsContainer>
            <LoadingBarsInner />
          </LoadingBarsContainer>
        </StartupLoader>
      </StartupLogoLoaderWrapper>
      <StartupFooter>
        <Copyright>Copyright © Microsoft Corporation</Copyright>
        <img src={microsoftLogo} alt="Microsoft Logo" />
      </StartupFooter>
    </StartupContainer>
  );
};

// Styled Components - Orjinal CSS'e göre
const StartupContainer = styled.div`
  background: #000;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  animation: ${fadeIn} 1s ease-in;
`;

const StartupLogoLoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  max-width: 100%;
  flex-grow: 1;
`;

const StartupLogo = styled.div`
  margin-bottom: 120px;
  width: 100%;

  img {
    width: 100%;
    height: auto;
  }
`;

const StartupLoader = styled.div`
  border: 1px solid #fff;
  border-radius: 4px;
  height: 20px;
  width: 50%;
  overflow: hidden;
`;

const LoadingBarsContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40px;
  animation-name: ${loadingBars};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: steps(6, end); /* 6 adımlı atlamalı animasyon */

  /* Pseudo elements için span kullanacağız */
  &::before,
  &::after {
    content: '';
    display: block;
    background-color: #0059c3;
    flex: 0 0 12px;
    height: 80%;
  }

  &::before {
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 20%,
      rgba(255, 255, 255, 0.8) 30%,
      rgba(255, 255, 255, 0.8) 40%,
      rgba(148, 187, 233, 0) 100%
    );
  }

  &::after {
    background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 60%,
      rgba(255, 255, 255, 0.8) 70%,
      rgba(255, 255, 255, 0.8) 80%,
      rgba(148, 187, 233, 0) 100%
    );
  }
`;

const LoadingBarsInner = styled.span`
  content: '';
  display: block;
  background-color: #0059c3;
  flex: 0 0 12px;
  height: 80%;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 40%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0.8) 60%,
    rgba(148, 187, 233, 0) 100%
  );
`;

const StartupFooter = styled.div`
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 40px;
`;

const Copyright = styled.span`
  font-size: 10px;
`;

export default StartupScreen;
