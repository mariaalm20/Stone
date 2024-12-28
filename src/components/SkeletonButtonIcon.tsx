import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from '../global/theme';

type Props = {
  Icon?: React.ReactElement;
  onPress: () => void;
  hasFlag?: boolean;
  textFlag?: number;
  isLoading?: boolean;
};

const SkeletonButtonIcon = ({
  Icon,
  onPress,
  hasFlag = false,
  textFlag,
  isLoading = false,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {hasFlag && (
        <View style={styles.flag}>
          <Text style={styles.quantityOnCart}>{textFlag}</Text>
        </View>
      )}

      {isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.secondary} />
      ) : (
        <>{Icon}</>
      )}
    </TouchableOpacity>
  );
};

export default SkeletonButtonIcon;

const styles = StyleSheet.create({
  containerButton: {
    flex: 1,
  },
  button: {
    backgroundColor: theme.colors.gray,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  flag: {
    backgroundColor: theme.colors.secondary,
    width: 16,
    height: 16,
    position: 'absolute',
    right: -2,
    top: -4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityOnCart: {
    color: theme.colors.gray,
    fontSize: 10,
    fontWeight: '700',
  },
});
