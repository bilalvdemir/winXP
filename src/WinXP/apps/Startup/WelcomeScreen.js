import React, { useEffect } from 'react';
import styled from 'styled-components';
import windowsStartup from 'assets/sounds/windows-startup.mp3';

const WelcomeScreen = ({ onLogin }) => {
  useEffect(() => {
    const audio = new Audio(windowsStartup);
    audio.volume = 0.6;
    audio.play().catch(error => {
      console.warn('Otomatik ses çalma başarısız oldu:', error);
    });

    const timeoutId = setTimeout(() => {
      onLogin();
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [onLogin]);

  return (
    <LoginContainer>
      <LoginTop />
      <LoginCenter>
        <WelcomeText className="welcome-text">Hoş Geldiniz</WelcomeText>
      </LoginCenter>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #508fd9;
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const LoginTop = styled.div`
  background-color: #004da3;
  flex-basis: 12.5%;
  border-style: solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(
    90deg,
    rgba(0, 77, 163, 1) 0%,
    rgba(255, 255, 255, 0.8) 30%,
    rgba(255, 255, 255, 0.9) 40%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(0, 77, 163, 1) 100%
  );
  border-width: 0 0 4px 0;
`;

const LoginBottom = styled.div`
  background-color: #004da3;
  flex-basis: 12.5%;
  border-style: solid;
  border-image-slice: 1;
  padding: 40px 80px 40px 40px;
  display: flex;
  justify-content: space-between;
  border-image-source: linear-gradient(
    90deg,
    rgba(0, 77, 163, 1) 0%,
    rgba(240, 150, 68, 1) 30%,
    rgba(240, 150, 68, 1) 40%,
    rgba(240, 150, 68, 1) 50%,
    rgba(0, 77, 163, 1) 100%
  );
  border-width: 4px 0 0 0;
`;

const LoginCenter = styled.div`
  flex: 1;
  display: flex;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.6) -21%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 700px 700px;
  background-position: -240px -210px;
  background-repeat: no-repeat;
  z-index: 0;
`;

const LoginInstructions = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 30px;
  align-items: flex-end;
  border-right-width: 1px;
  border-image-source: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 5%,
    rgba(255, 255, 255, 0.5) 15%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.5) 85%,
    rgba(255, 255, 255, 0) 95%,
    rgba(255, 255, 255, 0) 100%
  );
  border-image-slice: 0 1 0 0;
  border-right-style: solid;

  img,
  span {
    display: block;
  }

  img {
    width: 250px;
    margin-bottom: 40px;
  }

  span {
    text-align: right;
    font-size: 24px;
  }
`;

const LoginAccounts = styled.div`
  flex-basis: 50%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const LoginAccount = styled.div`
  outline: none;
  cursor: pointer;
  display: flex;
  min-width: 400px;
  max-width: 100%;
  opacity: 0.6;
  padding: 12px;
  border-radius: 8px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid transparent;
  border-right: 0;
  position: relative;
  background-clip: padding-box;
  border: 1px solid transparent;

  &:hover,
  &.active,
  &.logging-in {
    opacity: 1;

    .login-screen__account-icon {
      border-color: #ffcc36;
    }

    .login-screen__account-name {
      margin-bottom: 2px;
    }
  }

  &.active {
    cursor: pointer;
    background: linear-gradient(
      90deg,
      rgb(0, 72, 154) 60%,
      rgba(255, 255, 255, 0) 100%
    );
    background-clip: padding-box;

    &::after {
      content: '';
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.6) 40%,
        rgba(255, 255, 255, 0) 100%
      );
      border-radius: 8px;
      position: absolute;
      top: -1px;
      right: -1px;
      bottom: -1px;
      left: -1px;
      z-index: -1;
      pointer-events: none;
    }

    .login-screen__password {
      display: block;
    }
  }
`;

const AccountIcon = styled.div`
  width: 80px;
  height: 80px;
  margin-right: 20px;
  border: 3px solid #fff;
  border-radius: 5px;
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    height: 100%;
  }
`;

const AccountDetails = styled.div`
  position: relative;
`;

const AccountName = styled.span`
  font-size: 24px;
  margin-bottom: 20px;
  display: block;
`;

const LoadingSettings = styled.div`
  &.loading-settings {
    color: #00489a;
    font-size: 14px;
    font-weight: bold;
  }
`;

const PasswordSection = styled.div`
  display: block;
  position: absolute;
  bottom: -20px;

  > span {
    display: block;
    font-size: 14px;
    margin-bottom: 6px;
  }
`;

const PasswordForm = styled.form`
  display: flex;
`;

const PasswordInput = styled.input`
  padding: 5px;
  border: 0;
  border-radius: 5px;
  width: 160px;
  height: 36px;
  font-size: 16px; /* 30px → 16px küçültüldü */
  box-shadow: #00489a 2px 2px 0px 0px;
  outline: none;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  margin-left: 8px;
  border: 1px solid #fff;
  border-radius: 5px;
  width: 32px;
  height: 32px;
  background-image: linear-gradient(
    150deg,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(70, 161, 252, 0) 50%
  );
  background-repeat: no-repeat;
  box-shadow: 2px 2px 0px 0px #00489a, inset -1px -2px 4px 0 rgba(0, 0, 0, 0.7);
  position: relative;
  background-color: #3eb34d;

  &::before,
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px 0 12px 12px;
    border-color: transparent transparent transparent #ffffff;
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
  }

  &::after {
    border-width: 7px 0 7px 7px;
    border-color: #3eb34d;
    border-color: transparent transparent transparent #3eb34d;
    right: 9px;
  }

  span {
    background-color: #fff;
    position: absolute;
    height: 4px;
    width: 17px;
    top: 50%;
    transform: translateY(-50%);
    right: 9px;
    z-index: 1;
  }
`;

const QuestionButton = styled.button`
  cursor: pointer;
  margin-left: 8px;
  border: 1px solid #fff;
  border-radius: 5px;
  width: 32px;
  height: 32px;
  background-image: linear-gradient(
    150deg,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(70, 161, 252, 0) 50%
  );
  background-repeat: no-repeat;
  box-shadow: 2px 2px 0px 0px #00489a, inset -1px -2px 4px 0 rgba(0, 0, 0, 0.7);
  position: relative;
  background-color: #0573f3;
  font-size: 25px;
  font-weight: 900;
  color: #fff;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 0;
  }
`;

const ErrorText = styled.div`
  color: #ffcccc;
  font-size: 10px;
  margin-top: 4px;
`;

const TurnOffSection = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 0;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  span {
    margin-left: 10px;
    font-size: 24px;
  }
`;

const TurnOffIcon = styled.div`
  position: relative;
  background-color: #da5020;
  border: 1px solid #fff;
  border-radius: 5px;
  width: 32px;
  height: 32px;
  background-image: linear-gradient(
    150deg,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(70, 161, 252, 0) 50%
  );

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    border: 3px solid #fff;
    border-radius: 50px;
    width: 14px;
    height: 14px;
  }

  &::after {
    background-color: #fff;
    width: 3px;
    height: 8px;
  }
`;

const LoginInfo = styled.div`
  /* login-info styles can be added here if needed */
`;

const WelcomeText = styled.div`
  &.welcome-text {
    font-style: italic;
    font-size: 76px;
    font-weight: 900;
    text-shadow: 3px 4px #00489a;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
`;

export default WelcomeScreen;
