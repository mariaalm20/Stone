import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './styles';
import SkeletonButtonIcon from '../../../../components/SkeletonButtonIcon';
import CartSVG from '../../../../assets/CoffeListIcons/plus-solid.svg';
import {CoffeItem} from '../../../../stores/useCoffeStore';

type Props = {
  item: CoffeItem;
  addItemOnCart: (id: number) => void;
};

const CardList = ({item, addItemOnCart}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={{uri: item.image_url}} />
      </View>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.footer}>
        <View>
          <Text style={styles.weight}>{item.weight} g</Text>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>

        <SkeletonButtonIcon
          onPress={() => addItemOnCart(item.id)}
          Icon={<CartSVG width={20} />}
        />
      </View>
    </View>
  );
};

export default CardList;
