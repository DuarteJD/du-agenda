import React from 'react';

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';

import Toast from './Toast';

interface ToastContainerMessages {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerMessages> = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} toast={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
