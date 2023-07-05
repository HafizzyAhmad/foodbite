import React, { Fragment, useEffect, useState } from 'react';
import { useStore } from '../../hooks';
import AuthAPI from '../../api/auth';
import { IInputForm } from '../../types/forms/input';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  StyleProp,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import common from '../../styles/common';
import { authenticateSuccess } from '../../stores/app';
import { image, text } from '../../styles';
import Validator from '../../utils/validator';
import form from '../../styles/form';
import { useOffset } from '../../hooks/use-offset';
import PrimaryButton from '../../components/buttons/primary';
import IMAGE from '../../constants/image';
import { StackTabScreenProps } from '../../types/routes/main';

const LoginMain = ({ navigation }: StackTabScreenProps<'LoginMain'>) => {
  const [globalState, dispatch] = useStore();
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<object>({});
  const { heightOffset, onIncrementFocus } = useOffset();

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
    email: emailAddress.toLocaleLowerCase(),
    password: password,
  };

  async function onLogin() {
    try {
      const res = await authAPI.login(params);
      if (res) {
        dispatch(authenticateSuccess(res));
      }
    } catch (error) {
      Alert.alert(error as string);
    }
  }

  const onRegister = () => {
    navigation.navigate('RegisterProfile');
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
      secureTextEntry: false,
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
      secureTextEntry: true,
    },
  ];

  return (
    <>
      <ImageBackground
        source={IMAGE.loginBanner}
        style={[image.squareImage]}
        // resizeMode="center"
      >
        <View style={[common.paddingHorizontalContainer, common.positionTop60]}>
          <Text style={[text.whiteHeadlineBold]}>
            {`Welcome to\nFoodBite BETA`}
          </Text>
          <Text style={[text.whiteTitleScreen]}>Sign In to Your Account</Text>
        </View>
      </ImageBackground>
      <View style={[common.basicLayout, common.paddingContainer]}>
        <KeyboardAvoidingView
          enabled
          // keyboardVerticalOffset={Platform.OS === 'ios' ? heightOffset : 0}
          // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {loginConfig.map(
            ({ key, placeholder, type, secureTextEntry, ...options }) => {
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
                  return isValidEmail ? form.input : form.inputInvalid;
                }
                if (key === 'Password') {
                  return isValidPassword ? form.input : form.inputInvalid;
                }
                return form.input;
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
                <View key={key} style={[common.marginVerticalSmall]}>
                  <Text style={[text.greyBodyReg]}>{key}</Text>
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
                        secureTextEntry={secureTextEntry}
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
            },
          )}
        </KeyboardAvoidingView>
        <PrimaryButton
          buttonText="LOGIN NOW"
          nav={onLogin}
          disable={isDisabledLogin}
        />
        <Text
          onPress={onRegister}
          style={[text.blackBodyHighlight, text.center]}>
          New User? Register Now
        </Text>
      </View>
    </>
  );
};

export default LoginMain;
