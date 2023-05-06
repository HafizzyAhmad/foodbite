import React, { useState } from 'react';
import { useStore } from '../../hooks';
import AuthAPI from '../../api/auth';
import { IAuthLoginRequest } from '../../types/stores/app';
import { Text, View } from 'react-native';
import common from '../../styles/common';

const LoginMain: React.FC = () => {
  const [globalState, dispatch] = useStore();
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<object>({});

  const { app } = globalState;

  const authAPI = new AuthAPI(null);

  const params = {
    email: 'hafizzy01@yopmail.com',
    password: '@password',
  };

  async function onLogin() {
    console.log('CHECK PARAM: ', params);

    try {
      const res = await authAPI.login(params);
      console.log('CHECK RES: ', res);
    } catch (error) {
      console.log('CHECK ERROR: ', error);
    }
  }

  return (
    <View style={common.flexCenter}>
      <Text onPress={onLogin}>Try Click</Text>
    </View>
  );
};

export default LoginMain;
