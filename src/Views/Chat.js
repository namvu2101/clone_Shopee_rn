import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
const Chat = ({navigation}) => {
  const [userData, setuserData] = useState([]);
  const [data, setdata] = useState([]);
  const [user, setUser] = useState();

  // function onAuthStateChanged(user) {
  //   setUser(user);
    
  // }
  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);
  // console.log('==>',user);

  
  useEffect(() => {
    const Getdata = async () => {
      try {
        const query = await firestore()
          .collection('user')
          .where('email', '==', 'admin@gmail.com')
          .get();
        const res = query.docs.map(doc => doc.data());
        setuserData(res);
      } catch (error) {
        console.log(error);
      }
    };
    Getdata();
  }, []);
  useEffect(() => {
    const GetMess = async () => {
      try {
        const query = await firestore().collection('user').get();
        const res = query.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setdata(res);
      } catch (error) {
        console.log(error);
      }
    };
    GetMess();
  }, []);
  const renderItem = ({item}) => {
    let img;
    if (!item.avatar) {
      img =
        'https://th.bing.com/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2';
    } else img = item.avatar;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Message',{infor : item})
        }}
        style={{
          height: 80,
          flex: 1,
          borderBottomColor: 'black',
          borderBottomWidth: 0.5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'flex-end'}}>
          <Image
            source={{uri: img}}
            style={{
              height: 60,
              width: 60,
              borderRadius: 25,
              marginHorizontal: 10,
            }}
            resizeMode="stretch"
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: 10,
              height:20,
              width:20,
              alignItems:'center',
              justifyContent:'center'
            }}>
            <Text
              style={{
                color: 'white',
              }}>
              2
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: 'black',
              marginHorizontal: 20,
            }}>
            {item.name}
          </Text>
          <Text>{item.mess}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      {/* <View
        style={{
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: 'red',
          flexDirection: 'row',
        }}>
        {userData.map(i => (
          <Text key={i.email}>{i.name}</Text>
        ))}
      </View> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Chat;
