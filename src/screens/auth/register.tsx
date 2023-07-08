import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../../elements/layout';
import ArrowHeader from '../../components/headers/arrowheader';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { common, form, text } from '../../styles';
import { useOffset } from '../../hooks/use-offset';
import BottomActionButton from '../../components/buttons/bottombutton';
import Validator from '../../utils/validator';
import AuthAPI from '../../api/auth';

const RegisterProfile = ({ navigation }: any) => {
  const { heightOffset, onIncrementFocus } = useOffset();

  const [username, setUsername] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('●●●●●●●●●●●●');
  const [isDisabledSubmit, setDisabledSubmit] = useState<boolean>(true);

  const profileAPI = new AuthAPI(null);

  /**
   * use this to check input value for every form input
   * method place in the side effect to ensure the value change before
   * checking the input value
   */
  useEffect((): void => {
    function checkInput(): void {
      const obj = {
        username,
        emailAddress,
        password,
      };
      const isFilled: boolean = Object.values(obj).every(
        val => val?.length > 0,
      );

      const bool = {
        isValidUsername: Validator.allChar(username),
        isValidEmail: Validator.emailAddress(emailAddress),
        isValidPassword: password === '●●●●●●●●●●●●' ? false : true,
      };
      const isValid = Object.values(bool).every(val => val);
      setDisabledSubmit(isFilled && isValid);
    }

    checkInput();
  }, [username, emailAddress, password]);

  const register = async () => {
    const data = {
      username: username,
      email: emailAddress.toLowerCase(),
      password: password,
      role: 'user',
      profile: {},
    };

    try {
      const res = await profileAPI.register(data);
      if (res) {
        Alert.alert('Success', 'Your registration has been completed', [
          { text: 'Bring me to Login', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      Alert.alert('Oh uh! Something went wrong');
    }
  };

  const profileConfig = [
    {
      key: 'Username',
      placeholder: 'your username',
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
      key: 'Email Address',
      placeholder: 'Please enter email address',
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
      placeholder: '●●●●●●●●●●●●',
      lineNumber: 1,
      isMultiline: false,
      method: () => null,
      limit: 50,
      type: 'input',
      isValid: true,
      errorMessage: 'Please enter valid email address',
      secureTextEntry: true,
    },
  ];

  return (
    <Layout custom={[common.basicLayout]}>
      <ArrowHeader
        nav={navigation}
        title={'New Registration'}
        disableBack={false}
      />
      <ScrollView>
        <KeyboardAvoidingView
          enabled
          style={common.paddingHorizontalContainer}
          keyboardVerticalOffset={Platform.OS === 'ios' ? heightOffset : 0}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {profileConfig.map(({ key, placeholder, ...options }) => {
            /**
             * simple function to provide the value for each input field
             * @returns string | undefined
             */
            function onDetermineValue(): string | undefined {
              if (key === 'Username') return username;
              if (key === 'Email Address') return emailAddress;
              if (key === 'Password') return password;
            }

            /**
             * simple method to update use state hooks
             * @param event   string    value captured during change text
             */
            function onChangeValue(event: string): void | undefined {
              if (key === 'Username') setUsername(event);
              if (key === 'Email Address') setEmailAddress(event);
              if (key === 'Password') setPassword(event);
            }

            return (
              <View style={common.section} key={key}>
                <Text style={text.greyBodyReg}>{key}</Text>
                <Fragment>
                  <TextInput
                    style={form.input}
                    value={onDetermineValue()}
                    onChangeText={onChangeValue}
                    placeholder={placeholder}
                    multiline={options.isMultiline}
                    numberOfLines={options.lineNumber}
                    maxLength={options.limit}
                    onFocus={() => onIncrementFocus()}
                    secureTextEntry={options.secureTextEntry}
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
              </View>
            );
          })}
        </KeyboardAvoidingView>
      </ScrollView>
      <BottomActionButton
        content={'Register Now'}
        onPress={register}
        isInactive={!isDisabledSubmit}
      />
    </Layout>
  );
};

export default RegisterProfile;
