import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import {
  Button,
  List,
  TextInput,
  Modal,
  Portal,
  Provider,
} from 'react-native-paper';
import { launchImageLibrary} from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';
import db from '../../db.json';
import {useDispatch, useSelector} from 'react-redux';
import {getProduct} from '../Redux/productSlice';

const dbase = firebase.firestore();

const Product = ({navigation}) => {
  const user = useSelector(state => state.user.user);
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [imageUri, setImageUri] = useState([]);
  const [describe, setdescribe] = useState('');
  const [ID, setID] = useState(1);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const [Danhmuc, setDanhmuc] = useState('');
  const dispatch = useDispatch();
  let nameShop, ava;
  user.map(i => ((nameShop = i.name), (ava = i.avatar)));

  const Getimage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setID(ID + 1);
        const res = {uri: response.assets[0].uri, id: ID};
        setImageUri([...imageUri, res]);
      }
    });
  };

  const ClearText = () => {
    setDanhmuc('');
    setImageUri([]);
    setname('');
    setprice('');
    setdescribe('');
  };
  const checkInput = () => {
    if (name.length === 0 || imageUri.length === 0 || price.length === 0) {
      alert('Hãy nhập đủ thông tin sản phẩm');
    } else if (Danhmuc.length === 0) {
      alert('Bạn chưa chọn Danh mục cho sản phẩm');
    } else {
      ClearText();
      AddToFireBase();
    }
  };

  const AddToFireBase = async () => {
    try {
      await dbase.collection('product').add({
        id: uuid.v4(),
        category: Danhmuc,
        photo: imageUri,
        name: name,
        price: price,
        sell: '',
        nameShop: nameShop,
        detail: describe,
        avatar: ava,
      });

      alert('them san pham thanh cong');
      dispatch(getProduct());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider>
      <Portal>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            marginVertical: 100,
          }}>
          <Text style={{color: 'black', marginHorizontal: 10}}>
            Chọn Danh mục
          </Text>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <TouchableOpacity
              onPress={showModal}
              style={{
                height: 20,
                width: 40,
                backgroundColor: 'blue',
                marginHorizontal: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>Chọn</Text>
            </TouchableOpacity>
            <Text style={{color: 'black', marginHorizontal: 20}}>
              {Danhmuc}
            </Text>
          </View>
          <Item
            name="Tên "
            holder="Nhập tên"
            text="/100"
            value={name}
            onChangeText={setname}
          />
          <Text style={{color: 'black'}}>Hình ảnh sản phẩm</Text>
          <View style={{flexDirection: 'row'}}>
            {imageUri.map(i => (
              <Image
                key={i.id}
                source={{uri: i.uri}}
                style={{width: 50, height: 50, marginLeft: 5}}
              />
            ))}
            <View
              style={{
                marginLeft: 10,
                height: 50,
                width: 50,
                borderStyle: 'dashed',
                borderColor: 'red',
                borderWidth: 1,
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
                onPress={() => Getimage()}>
                <Text style={{color: 'red'}}>Chọn</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Item
            name="Giá "
            holder="Nhập Giá"
            text="/vnđ"
            Type="numeric"
            value={price}
            onChangeText={setprice}
          />

          <Item
            name="Mô tả"
            holder="Mô tả"
            text="/1000"
            value={describe}
            onChangeText={setdescribe}
          />
          <View style={{flex: 1, alignItems: 'center', marginVertical: 10}}>
            <Button
              mode="contained-tonal"
              style={{width: 100}}
              onPress={checkInput}>
              save
            </Button>
          </View>

          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <Listitem setDanhmuc={setDanhmuc} hideModal={hideModal} />
          </Modal>
        </View>
      </Portal>
    </Provider>
  );
};

function Item({name, holder, onPress, value, text, onChangeText, Type}) {
  return (
    <View>
      <TextInput
        style={{marginVertical: 5}}
        outlineColor="blue"
        mode="outlined"
        textColor="black"
        keyboardType={Type}
        value={value}
        onChangeText={onChangeText}
        label={name}
        placeholder={holder}
        right={<TextInput.Affix text={text} />}
      />
    </View>
  );
}

function Listitem({setDanhmuc, hideModal}) {
  const dataDanhmuc = db.TitleCategory.slice(1);
  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          setDanhmuc(item.item.titie), hideModal();
        }}
        key={item.item.titie}
        style={{height: 40, flex: 1, borderColor: 'black', borderWidth: 0.5}}>
        <Text style={{color: 'black'}}>{item.item.titie}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal={false}
      data={dataDanhmuc}
      renderItem={renderItem}
      keyExtractor={item => item.titie}
    />
  );
}

export default Product;
