import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import Input from './components/Input';

import LockSVG from '../../assets/SignIn/lock-solid.svg';
import EmailSVG from '../../assets/SignIn/envelope-solid.svg';
import useAuthStore from '../../stores/useAuth';
import theme from '../../global/theme';

// import { Container } from './styles';

const SignIn: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    checkEmail,
    checkPassword,
    login,
    loading,
  } = useAuthStore();

  const disabledButton = email === '' || password === '';

  return (
    <View style={styles.background}>
      <View style={styles.modal}>
        <Text style={styles.title}>Get Started With Your Coffe Journey</Text>
        <Text style={styles.subTitle}>
          Log in and get a incrivel experience
        </Text>

        <View style={styles.divisor} />

        <Input
          Icon={<EmailSVG />}
          value={email}
          placeholder="Digite seu email"
          onChangeText={setEmail}
          error={emailError}
          check={checkEmail}
        />
        <View style={styles.inputDivisor} />

        <Input
          Icon={<LockSVG />}
          value={password}
          placeholder="Digite sua senha"
          onChangeText={setPassword}
          error={passwordError}
          check={checkPassword}
        />

        <TouchableOpacity
          disabled={disabledButton}
          onPress={login}
          style={
            disabledButton
              ? [styles.button, styles.disableButton]
              : styles.button
          }>
          {loading ? (
            <ActivityIndicator size="small" color={theme.colors.white} />
          ) : (
            <Text
              style={
                disabledButton
                  ? [styles.textButtons, styles.disableTextButton]
                  : styles.textButtons
              }>
              Continue
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
