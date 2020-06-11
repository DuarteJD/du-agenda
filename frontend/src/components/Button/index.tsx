import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Input: React.FC<ButtonProps> = ({ children, loading, ...next }) => (
  <Container type="button" {...next}>
    {loading ? 'Aguarde...' : children}
  </Container>
);

export default Input;
