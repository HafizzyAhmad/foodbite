import React, { Fragment, useEffect, useState } from 'react';
import { useStore } from '../../hooks';
import AuthAPI from '../../api/auth';
import { IAuthLoginRequest } from '../../types/stores/app';
import { IInputForm } from '../../types/forms/input';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import common from '../../styles/common';
import { authenticateSuccess } from '../../stores/app';
import { text } from '../../styles';
import Validator from '../../utils/validator';
import form from '../../styles/form';
import { useOffset } from '../../hooks/use-offset';

const LoginMain: React.FC = () => {
  const [globalState, dispatch] = useStore();
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<object>({});
  const [heightOffset, onIncrementFocus] = useOffset();

  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [isDisabledLogin, setDisabledLogin] = useState<boolean>(true);

  const { app } = globalState;

  useEffect((): void => {
    function checkInput(): void {
      const obj = {
        emailAddress,
        password,
      };

      const isFilled: boolean = Object.values(obj).every(
        val => val?.length > 0,
      );

      const bool = {
        isValidEmail: Validator.emailAddress(emailAddress),
        isValidPassword: Validator.allChar(password),
      };

      const isValid = Object.values(bool).every(val => val);
      setDisabledLogin(isFilled && isValid);
    }

    checkInput();
  }, [emailAddress, password]);

  const authAPI = new AuthAPI(null);

  const params = {
    email: 'hafizzy01@yopmail.com',
    password: '@password',
  };

  async function onLogin() {
    console.log('CHECK PARAM: ', params);

    try {
      const res = await authAPI.login(params);
      if (res) {
        dispatch(authenticateSuccess(res.token));
      }
    } catch (error) {
      console.log('CHECK ERROR: ', error);
    }
  }

  const onRegister = () => {
    console.log('Go to Screen Register');
  };

  const loginConfig: IInputForm[] = [
    {
      key: 'Email Address',
      placeholder: 'Enter your email',
      lineNumber: 1,
      isMultiline: false,
      method: () => null,
      limit: 50,
      type: 'input',
      isValid: true,
      errorMessage: 'Please enter valid email address',
    },
    {
      key: 'Password',
      placeholder: 'Enter your password',
      lineNumber: 1,
      isMultiline: false,
      method: () => null,
      limit: 50,
      type: 'input',
      isValid: true,
      errorMessage: 'Please enter password',
    },
  ];

  return (
    <View style={common.basicLayout}>
      <View style={{ ...common.basicContainer, ...common.flexCenter }}>
        <Text
          onPress={onLogin}
          style={[text.whiteHeadlineBold, common.section]}>
          Welcome to FoodBite BETA
        </Text>
        <KeyboardAvoidingView
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? heightOffset : 0}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {loginConfig.map(({ key, placeholder, type, ...options }) => {
            /**
             * simple method to update use state hooks
             * @param event   string    value captured during change text
             */
            function onChangeValue(event: string): void | undefined {
              if (key === 'Email Address') setEmailAddress(event);
              if (key === 'Password') setPassword(event);
            }

            /**
             * simple function to provide the value for each input field
             * @returns string | undefined
             */
            function onDetermineValue(): string | undefined {
              if (key === 'Email Address') return emailAddress;
              if (key === 'Password') return password;
            }

            /**
             * use to determine style on a few input
             * @returns any
             */
            function onDetermineValid(): StyleProp<ViewStyle> {
              if (key === 'Email Address') {
                return isValidEmail ? form.address : form.addressInvalid;
              }
              if (key === 'Password') {
                return isValidPassword ? form.address : form.addressInvalid;
              }
              return form.address;
            }

            /**
             * use to determine validity status on blur
             * @returns void | undefined
             */
            function onCheckValid(): void | undefined {
              if (key === 'Email Address') {
                const result: boolean = Validator.emailAddress(emailAddress);
                setIsValidEmail(result);
              }
              if (key === 'Password') {
                const result: boolean = Validator.allChar(password);
                setIsValidPassword(result);
              }
            }

            return (
              <View key={key} style={common.section}>
                <Text style={text.greyBodyReg}>{key}</Text>
                {type === 'input' && (
                  <Fragment>
                    <TextInput
                      style={onDetermineValid()}
                      value={onDetermineValue()}
                      onBlur={onCheckValid}
                      onChangeText={onChangeValue}
                      placeholder={placeholder}
                      multiline={options.isMultiline}
                      numberOfLines={options.lineNumber}
                      maxLength={options.limit}
                      onFocus={() => onIncrementFocus()}
                    />
                    {!options.isValid && (
                      <Text
                        style={{
                          ...text.redErrorText,
                          ...common.spacingLeft,
                        }}>
                        {options.errorMessage}
                      </Text>
                    )}
                  </Fragment>
                )}
              </View>
            );
          })}
        </KeyboardAvoidingView>
        <Text
          onPress={onRegister}
          style={[text.whiteHeadlineBold, common.section]}>
          New User? Register Now
        </Text>
      </View>
    </View>
  );
};

export default LoginMain;
