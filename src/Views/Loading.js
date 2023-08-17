import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getProduct} from '../Redux/productSlice';
import auth, {firebase} from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
import {getUser} from '../Redux/userSlice';

const LoadingScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = auth().currentUser;


  useEffect(() => {
    if (user) {
      dispatch(getUser(user.email));
    }
  },[user,isFocused]);
  useEffect(() => {
    if (isFocused) {
      dispatch(getProduct());
      setTimeout(() => {
        navigation.navigate('HomeTabs');
      }, 3000);
    }
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default LoadingScreen;
