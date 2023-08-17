import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useReducer} from 'react';
import uuid from 'react-native-uuid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native-paper';

function ResgiterShop(){
  const [nameShop, setNameShop] = useState('');
  const [describeShop, setDescribe] = useState('');
  const [phoneShop, setPhoneShop] = useState('');
  const [addShop, setAddShop] = useState('');
  const [imageUri, setImageUri] = useState();
  const user = auth().currentUser;
  const clearText = () => {
    setAddShop('');
    setDescribe('');
    setImageUri();
    setPhoneShop('');
    setNameShop('');
  };
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
        const res = {uri: response.assets[0].uri};
        setImageUri(res);
      }
    });
  };


    const CheckData = async () => {
      try {
        const data = await firebase
          .firestore()
          .collection('Shop')
          .where('NameShop', '==', nameShop)
          .get();
        const res = data.docs.map(doc => doc.data());
        if(res.length==0){
          AddNewShop()
        }
        else{
          Alert.alert(
            'Thông báo',
            'tên cửa hàng đã tồn tại',
            [
              {
                text: 'OK',
              },
            ],
            {cancelable: false},
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handelSubmit=()=>{
      if (nameShop.length == 0) {
        Alert.alert(
          'Thông báo',
          'Chưa điền tên cửa hàng',
          [
            {
              text: 'OK',
            },
          ],
          {cancelable: false},
        );
      } else if (!imageUri) {
        Alert.alert(
          'Thông báo',
          'Logo cửa hàng trống',
          [
            {
              text: 'OK',
            },
          ],
          {cancelable: false},
        );
      } else if (addShop.length == 0) {
        Alert.alert(
          'Thông báo',
          'Chưa điền địa chỉ Cửa hàng',
          [
            {
              text: 'OK',
            },
          ],
          {cancelable: false},
        );
      } else if (phoneShop.length == 0) {
        Alert.alert(
          'Thông báo',
          'Phải có số điện thoại cửa hàng',
          [
            {
              text: 'OK',
            },
          ],
          {cancelable: false},
        );
      } else{
        CheckData()
      }
    }

  const AddNewShop = async () => {

      try {
        await firebase.firestore().collection('Shop').add({
          idShop: uuid.v4(),
          NameShop: nameShop,
          Logo: imageUri.uri,
          describeShop: describeShop,
          Phone: phoneShop,
          Address: addShop,
          email: user.email,
        });
        alert('tao thanh cong')
        clearText();
      } catch (error) {
        console.log(error);
      }
    
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{color: 'black'}}>Chọn Logo</Text>
          {imageUri ? (
            <Image
              source={{uri: imageUri.uri}}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => Getimage()}
          style={{height: 20, width: 40, backgroundColor: 'blue'}}>
          <Text style={{color: 'white'}}>Chọn</Text>
        </TouchableOpacity>
      </View>

      <Item title={'Tên Shop'} value={nameShop} onChangeText={setNameShop} />
      <Item title={'Mô tả'} value={describeShop} onChangeText={setDescribe} />
      <Item
        title={'Địa chỉ cửa hàng'}
        value={addShop}
        onChangeText={setAddShop}
      />
      <Item
        title={'Điện thoại'}
        value={phoneShop}
        onChangeText={setPhoneShop}
        keyboardType="numeric"
      />

      <View style={{height: 40, width: '100%', alignItems: 'center'}}>
        <Button mode="contained" onPress={() => handelSubmit()}>
          Đăng ký
        </Button>
      </View>
    </View>
  );
};

function Item({title, onChangeText, value, keyboardType}) {
  return (
    <View style={{height: 80, marginHorizontal: 10}}>
      <Text style={{color: 'black'}}>{title}</Text>
      <View style={{height: 40, borderColor: 'black', borderWidth: 1}}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}

export default ResgiterShop;
