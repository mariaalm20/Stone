import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import CoffeList from '../screens/CoffeList';

const Stack = createStackNavigator();

// import { Container } from './styles';

const isAuthenticated = true;

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="CoffeList"
            component={CoffeList}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
