import React, { useRef, useCallback } from 'react';
import {
  StatusBar,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  BackButton,
  Title,
  UserAvatarButton,
  UserAvatar,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateInfo } = useAuth();

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          old_password: Yup.string(),

          password: Yup.string().when('old_password', {
            is: value => !!value.length,
            then: Yup.string().required('Informar a nova senha!'),
            otherwise: Yup.string(),
          }),

          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas precisam ser idênticas!',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          password,
          password_confirmation,
          old_password,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        const response = await api.put('profile', formData);

        updateInfo(response.data);

        Alert.alert('Alteração realizada com sucesso!');

        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro na atualização!',
          'Ocorreu um erro ao realizar a atualização, tente novamente!',
        );
      }
    },
    [navigation, updateInfo],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar o seu avatar!');
          return;
        }

        const source = { uri: response.uri };

        const data = new FormData();

        data.append('avatar', {
          type: 'imagem/jpeg',
          name: `${user.id}.jpg`,
          uri: source.uri,
        });

        api.patch('users/avatar', data).then(apiResponse => {
          updateInfo(apiResponse.data);
        });
      },
    );
  }, [updateInfo, user.id]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>
            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form
              initialData={{ name: user.name, email: user.email }}
              ref={formRef}
              onSubmit={handleSignUp}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={oldPasswordInputRef}
                containerStyle={{ marginTop: 16 }}
                secureTextEntry
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  newPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={newPasswordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;