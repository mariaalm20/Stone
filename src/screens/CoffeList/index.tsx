/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProductList from './components/List/List';
import SkeletonButtonIcon from '../../components/SkeletonButtonIcon';

import CartSVG from '../../assets/CoffeListIcons/cart-shopping-solid.svg';
import {coffeStore} from '../../stores/coffeStore';
import theme from '../../global/theme';

// import { Container } from './styles';

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
  } = coffeStore();

  useEffect(() => {
    fetchProducts();
  }, [quantityProducts]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={{color: theme.colors.background}}> oi</Text>
        <Text style={styles.title}>COFFE</Text>

        <SkeletonButtonIcon
          onPress={() => {}}
          Icon={<CartSVG width={20} />}
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
