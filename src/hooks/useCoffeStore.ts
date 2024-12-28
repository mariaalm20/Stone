import React, { useEffect } from 'react';
import { View } from 'react-native';
import {coffeStore} from '../stores/coffeStore'

// import { Container } from './styles';

const useCoffeStore = (page) => {
  const {fetchProducts} = coffeStore()

  useEffect(() => {
    let ignore = false
    fetchProducts(page)
  }, [])

  return {state: {}}
}

export default useCoffeStore;