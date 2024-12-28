import {StyleSheet} from 'react-native';
import theme from '../../global/theme';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.secondary,
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: theme.colors.primary,
    height: '50%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  title: {
    fontWeight: '500',
    color: theme.colors.white,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  subTitle: {
    fontWeight: '300',
    color: theme.colors.grayLight,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
  divisor: {
    height: 40,
  },
  inputDivisor: {
    height: 24,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    height: 40,
    borderRadius: 12,
    marginTop: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disableButton: {
    backgroundColor: theme.colors.gray300,
  },
  textButtons: {
    fontWeight: '700',
    color: theme.colors.gray,
    fontSize: 16,
    textAlign: 'center',
  },
  disableTextButton: {
    color: theme.colors.grayLight,
  }
});
