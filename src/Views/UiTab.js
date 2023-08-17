import {View, Text, StyleSheet, Image} from 'react-native';
import Login from './Login';
import Regiter from './Regiter';
import Mall from './Mall';
import Notification from './Notification';
import User from './User';
import Home from './Home';
import UserLog from './UserLog';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const userCurrent = auth().currentUser;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        initialRouteName: false,
        tabBarShowLabel: false,
      }}
      initialRouteName="Home">

        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  source={require('../assets/home.png')}
                  style={styles.tabIcon}></Image>
              ) : (
                <Image
                  source={require('../assets/unhome.png')}
                  style={styles.tabIcon}></Image>
              ),
          }}
        />
      
      <Tab.Screen
        name="Mall"
        component={Mall}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../assets/mall.png')}
                style={styles.tabIcon}></Image>
            ) : (
              <Image
                source={require('../assets/bag.png')}
                style={styles.tabIcon}></Image>
            ),
        }}
      />
      <Tab.Screen
        name="Notifi"
        component={Notification}
        options={{
          // unmountOnBlur: true,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../assets/notification.png')}
                style={styles.tabIcon}></Image>
            ) : (
              <Image
                source={require('../assets/unbell.png')}
                style={styles.tabIcon}></Image>
            ),
        }}
      />
      {!userCurrent ? (
        <Tab.Screen
          name="UserLog"
          component={User}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  source={require('../assets/user_home.png')}
                  style={styles.tabIcon}></Image>
              ) : (
                <Image
                  source={require('../assets/unuser.png')}
                  style={styles.tabIcon}></Image>
              ),
          }}
        />
      ) : (
        <Tab.Screen
          name="UserLog"
          component={UserLog}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  source={require('../assets/user_home.png')}
                  style={styles.tabIcon}></Image>
              ) : (
                <Image
                  source={require('../assets/unuser.png')}
                  style={styles.tabIcon}></Image>
              ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabIcon: {
    height: 30,
    width: 30,
  },
});

export default MyTabs;
