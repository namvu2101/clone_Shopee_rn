import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const Setting = ({navigation}) => {
const handelSingout=()=>{
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
  navigation.navigate('Login')
}

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={()=> handelSingout()}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
