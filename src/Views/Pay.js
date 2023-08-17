import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-paper';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Pay = ({route, navigation}) => {
  const db = firestore().collection('order');
  const userCurrent = auth().currentUser;
  const IDuser = userCurrent.uid;
  const [data, setdata] = useState([]);
  const [address, setAddress] = useState('Mễ sở,văn giang,Hưng yên');
  useEffect(() => {
    if (!route.params) {
      console.log('Khong co gia tri');
    } else {
      setdata(route.params.Value);
    }
  }, [route.params]);

  const AddItemtoOrder = async () => {
    try {
      db.add({detailOrder: data, address: address});
      setTimeout(() => {
        Alert.alert(
          'Thông báo',
          'Tạo đơn hàng thành công! Tiếp tục ua hàng',
          [
            {
              text: 'OK',
              onPress: () => {
                DeleteCart();
                navigation.navigate('Home');
              },
            },
          ],
          {cancelable: false},
        );
      }, 500);
      
    } catch (error) {
      console.error('tao don hang that bai', error);
    }
  };

  const DeleteCart = async () => {
    await database().ref(`/cart/${IDuser}`).set(null);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={{justifyContent: 'space-between'}}>
          <View style={{height: 100, backgroundColor: 'white'}}>
            <Text>Address </Text>
            <TextInput value={address} onChangeText={setAddress} />
          </View>
          <List data={data} />
        </View>
      </ScrollView>

      <Footer total={route.params.Total} onPress={() => AddItemtoOrder()} />
    </View>
  );
};
function Footer({navigation, total, onPress}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: 'pink',
        borderTopWidth: 2,
        justifyContent: 'space-between',
        height: 50,
        position: 'relative',
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 2}}>
        <Text style={{color: 'black'}}>Tổng tiền:</Text>
        <Text style={{color: 'red'}}>{total} đ</Text>
      </View>

      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 100,
          backgroundColor: 'red',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text style={{color: 'white'}}>MUA</Text>
      </TouchableOpacity>
    </View>
  );
}

function List({data}) {
  const renderItem = item => {
    const img = item.item.photo.filter(i => i.id == 1)
    const price = item.item.price * item.item.quantity;
    return (
      <View
        style={{
          height: 100,
          flex: 1,
          marginHorizontal: 10,
          marginVertical: 5,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {img.map(i => (
          <Image
            key={i.id}
            source={{uri: i.uri}}
            style={{height: 60, width: 60, marginHorizontal: 20}}
          />
        ))}
        <View style={{flex: 1, marginHorizontal: 10}}>
          <Text numberOfLines={1} style={{color: 'black'}}>
            {item.item.name}
          </Text>
          <Text style={{color: 'red'}}>Gia: {price}</Text>
          <Text style={{color: 'black'}}>So luong: {item.item.quantity}</Text>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      horizontal="true"
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

export default Pay;
