import {StyleSheet} from 'react-native';
import theme from '../../../../global/theme';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 12,
  },
  input: {
    fontSize: 15,
    marginLeft: 8,
    color: theme.colors.white,
  },
  check: {
    backgroundColor: theme.colors.secondary,
    width: 24,
    height: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
  },
});
