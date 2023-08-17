import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageComponent,
} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './Login';
import Regiter from './Regiter';
import Setting from './Setting';
import Profile, {UpdateName} from './Profile';
import MyTabs from './UiTab';
import Cart from './Cart';
import ProDuct from './ProDuct';
import App from '../../App';
import Pay from './Pay';
import {Provider} from 'react-redux';
import store from '../Redux/store';
import LoadingScreen from './Loading';
import Chat from './Chat';
import ChatMessage from './ChatMessage';
import Product from '../Shop/Product';
import ViewProduct from '../Shop/ProductShop';
import ResgiterShop from '../Shop/ResgiterShop';
import Shop from '../Shop/Shop';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Shop"
            component={Shop}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HomeTabs"
            component={MyTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="adminProduct"
            component={Product}
            options={{title: 'Thêm thông tin sản phẩm', headerTintColor: 'red'}}
          />
          <Stack.Screen
            name="ShopProduct"
            component={ViewProduct}
            options={{title: 'Thêm thông tin sản phẩm', headerTintColor: 'red'}}
          />
          <Stack.Screen
            name="ResgiterShop"
            component={ResgiterShop}
            options={{title: 'Tạo cửa hàng', headerTintColor: 'red'}}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            options={{
              title: 'Đăng Nhập',
              headerShown: false,
            }}
            component={Login}
          />
          <Stack.Screen
            name="Regiter"
            options={{
              title: 'Đăng ký',
              headerTintColor: 'red',
            }}
            component={Regiter}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Update"
            component={UpdateName}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Product"
            component={ProDuct}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="App"
            component={App}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pay"
            component={Pay}
            options={{
              title: 'Thanh Toán',
              headerTintColor: 'red',
            }}
          />
          <Stack.Screen
            name="ChatItem"
            component={Chat}
            options={{
              title: 'Chat',
              headerTintColor: 'red',
            }}
          />
          <Stack.Screen
            name="Message"
            component={ChatMessage}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
