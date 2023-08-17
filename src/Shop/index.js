import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Product from './Product';
import ViewProduct from './ProductShop';
import {NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import User from './User';
import ResgiterShop from './ResgiterShop';

const IndexAdmin = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Provider >
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
        name="ResgiterShop"
        component={ResgiterShop}
      />
    <Stack.Screen
        name="User"
        component={User}
      />
      <Stack.Screen
        name="Product"
        options={{
          title: 'Đăng ký',
          headerTintColor: 'red',
        }}
        component={Product}
      />
        <Stack.Screen
        name="View"
        options={{
          title: 'Đăng ký',
          headerTintColor: 'red',
        }}
        component={ViewProduct}
      />
    
    
    </Stack.Navigator>
  </NavigationContainer>
  </Provider>
  )
}

export default IndexAdmin