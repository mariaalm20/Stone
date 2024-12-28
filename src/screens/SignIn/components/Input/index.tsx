import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from './styles';
import theme from '../../../../global/theme';
import CheckSVG from '../../../../assets/SignIn/check-solid.svg';

type Props = {
  value: string;
  placeholder: string;
  Icon: React.ReactElement;
  onChangeText: (value: string) => void;
  error?: string;
  check: boolean;
};

const Input = ({
  value,
  placeholder,
  Icon,
  onChangeText,
  error,
  check = false,
}: Props) => {
  return (
    <View style={styles.background}>
      <View style={styles.iconContainer}>
        {Icon}
        <TextInput
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray300}
          value={value}
          onChangeText={e => onChangeText(e)}
          style={styles.input}
        />
      </View>

      {check ? (
        <View style={styles.check}>
          <CheckSVG />
        </View>
      ) : error !== '' ? (
        <Text style={{color: 'red'}}>{error}</Text>
      ) : null}
    </View>
  );
};

export default Input;
