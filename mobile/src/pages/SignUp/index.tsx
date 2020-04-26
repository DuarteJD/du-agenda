import React from 'react';
import { StatusBar } from 'react-native';
import { Container } from './styles';

const SignUp: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Container style={{ flex: 1, backgroundColor: '#312e38' }} />
    </>
  );
};

export default SignUp;
