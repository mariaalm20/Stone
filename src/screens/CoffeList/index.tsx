/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProductList from './components/List/List';
import SkeletonButtonIcon from '../../components/SkeletonButtonIcon';

import CartSVG from '../../assets/CoffeListIcons/cart-shopping-solid.svg';
import LogoutSVG from '../../assets/SignIn/logout.svg';

import {useCoffeStore} from '../../stores/useCoffeStore';
import useAuthStore from '../../stores/useAuth';

const CoffeList: React.FC = () => {
  const {
    fetchProducts,
    products,
    quantityProducts,
    searchMore,
    loadingSearchMore,
    isLoading,
    quantityItems,
    addItemOnCart,
  } = useCoffeStore();

  const {logout} = useAuthStore();

  useEffect(() => {
    fetchProducts();
  }, [quantityProducts]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <SkeletonButtonIcon
          customStyleButton
          onPress={logout}
          Icon={<LogoutSVG width={20} />}
        />

        <Text style={styles.title}>COFFE</Text>

        <SkeletonButtonIcon
          onPress={() => {}}
          Icon={<CartSVG width={16} />}
          hasFlag={quantityItems !== 0}
          textFlag={quantityItems}
        />
      </View>

      <ProductList
        loadingSearchMore={loadingSearchMore}
        data={products}
        searchMore={searchMore}
        loading={isLoading}
        addItemOnCart={addItemOnCart}
      />
    </SafeAreaView>
  );
};

export default CoffeList;
