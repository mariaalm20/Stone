import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import CoffeList from '../screens/CoffeList';
import useAuthStore from '../stores/useAuth';

const Stack = createStackNavigator();


const Routes = () => {
  const {isAuthenticated, loadAuthState} = useAuthStore();

  useEffect(() => {
    loadAuthState();
  }, [])

  
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
