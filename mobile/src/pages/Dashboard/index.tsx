import React from 'react';

import { View, Text, Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <View>
      <Text>
        Seja bem vindo
        {user.name}
      </Text>
      <Button title="sair" onPress={signOut} />
    </View>
  );
};

export default Dashboard;
