import React from 'react';
import {FlatList, View} from 'react-native';
import CardList from '../CardList/CardList';
import {styles} from './styles';
import {CoffeItem} from '../../../../stores/useCoffeStore';
import Loading from '../../../../components/Loading';

type Props = {
  data: CoffeItem[];
  searchMore: () => Promise<void>;
  loadingSearchMore: boolean;
  loading: boolean;
  addItemOnCart: (id: number) => void;
};

const renderItem = (
  {item, index}: {item: any; index: number},
  addItemOnCart: (id: number) => void,
) => {
  return (
    <>
      <CardList item={item} addItemOnCart={addItemOnCart} />

      {index % 2 === 0 && <View style={styles.divisor} />}
    </>
  );
};

const ProductList = ({
  data,
  searchMore,
  loadingSearchMore,
  loading,
  addItemOnCart,
}: Props) => {
  return (
    <FlatList
      renderItem={({item, index}) => renderItem({item, index}, addItemOnCart)}
      data={data}
      numColumns={2}
      style={styles.list}
      ListEmptyComponent={<Loading />}
      onEndReached={searchMore}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<>{loadingSearchMore && !loading && <Loading />}</>}
      // extraData={}
    />
  );
};

export default ProductList;
