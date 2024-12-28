import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import theme from '../global/theme';

// import { Container } from './styles';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={theme.colors.secondary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginTop: '80%'
  },
});
