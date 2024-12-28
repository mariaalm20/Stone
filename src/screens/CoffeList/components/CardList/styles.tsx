import {StyleSheet} from 'react-native';
import theme from '../../../../global/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.primary,
    marginTop: 16,
    borderRadius: 32,
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: theme.colors.white,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    color: theme.colors.gray300,
    marginTop: 4,
  },
  weight: {
    fontSize: 16,
    color: theme.colors.gray300,
    marginTop: 16,
  },
  price: {
    fontSize: 16,
    color: theme.colors.white,
    fontWeight: '700',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerImage: {
    width: '100%',
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});
