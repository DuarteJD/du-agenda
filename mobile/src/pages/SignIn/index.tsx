import React from 'react';
import { StatusBar, Image } from 'react-native';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Container>
        <Image source={logoImg} />
        <Title>Faça seu logon</Title>

        <Input name="email" icon="mail" placeholder="E-mail" />
        <Input name="password" placeholder="Senha" />
        <Button
          onPress={() => {
            console.log('teste');
          }}
        >
          Entrar
        </Button>
      </Container>
    </>
  );
};

export default SignIn;
