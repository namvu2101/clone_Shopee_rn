import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import firebase from '@react-native-firebase/app';
import { useSelector, useDispatch } from 'react-redux';

const dbase = firebase.firestore();

const ViewProduct = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        const querySnapshot = await dbase.collection('product').get();
        const res = querySnapshot.docs.map(doc => doc.data());
        setdata(res.filter(i=>i.add === 'Hưng Yên'));
      } catch (error) {
        console.log(error);
      }
    };
    GetData();
  }, []);
  const renderItem = item => {
    const img = item.item.photo.filter(i => i.id === 1);
    return (
      <View key={item.id} style={{width:"50%"}}>
        <Text>{item.item.name}</Text>
        <Text>{item.item.price}</Text>
        <Text>{item.item.add || item.item.NameShop}</Text>
       
         {img.map((i,index)=>(
          <View key={index}>
            <Image  source={{uri:i.uri}} style={{height:60,width:60}}/>
            </View>
         ))}
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>

      <View style={{flex: 1}}>
        <FlatList
          numColumns={2}
          data={data}
          renderItem={renderItem}
          key={item => item.id}
        />
      </View>
    </View>
  );
};

export default ViewProduct;
