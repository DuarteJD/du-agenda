import React from 'react';
import { StatusBar, Image } from 'react-native';
import { Container } from './styles';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Container>
        <Image source={logoImg} />
      </Container>
    </>
  );
};

export default SignIn;
