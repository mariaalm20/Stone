import {StyleSheet} from 'react-native';
import theme from '../../global/theme';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  title: {
    fontWeight: '700',
    color: theme.colors.white,
    fontSize: 24,
  }
});
