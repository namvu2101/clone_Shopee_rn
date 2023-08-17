import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import ImagePickerButton from '../components/PickImage';

const db = firebase.firestore();
function Profile({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.user.user);
  const [imageUri, setImageUri] = useState(
    'https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?w=234&h=204&c=7&r=0&o=5&pid=1.7'
  );
  const [titledate, settitleDate] = useState('');
  let username = '',
    birth = '';
  const DatePick = [
    date.getDate(),
    '/',
    date.getMonth() + 1,
    '/',
    date.getFullYear(),
  ];

  user.map(i => ((username = i.name), (birth = i.birth)));
  useEffect(() => {
    user.map(i => setImageUri(i.avatar));
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.3, backgroundColor: 'red'}}>
        <Header navigation={navigation} date={DatePick} imageUri={imageUri}/>

        <Avatar imageUri={imageUri} setImageUri={setImageUri} />
      </View>
      <View style={{flex: 0.7}}>
        <Item
          name={'Tên'}
          title={username}
          onPress={() => navigation.navigate('Update', {name: username})}
        />
        <Item
          name={'Giới Tính'}
          title={''}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
        <View style={{height: 10, backgroundColor: 'pink'}}></View>
        <Item
          name={'Bio'}
          title={''}
          onPress={() => {
            Alert.alert('onpress');
          }}
        />
        <Item
          name={'Ngày sinh'}
          title={titledate == '' ? birth : titledate}
          onPress={() => {
            setOpen(true);
          }}
        />
        <View style={{height: 10, backgroundColor: 'pink'}}></View>
        <Item
          name={'Liên kết ngân hàng'}
          title={''}
          onPress={() => {
            Alert.alert('onpress');
          }}
        />
      </View>
      <ViewModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <DatePicker
        locale="en_ZA"
        modal
        open={open}
        date={date}
        mode="date"
        title={'Chọn Ngày'}
        confirmText="Hoàn Thành"
        cancelText="Hủy"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          settitleDate(DatePick.join(''));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      {modalVisible ? (
        <View
          style={{
            backgroundColor: 'black',
            height: '100%',
            width: '100%',
            position: 'absolute',
            opacity: 0.4,
          }}></View>
      ) : null}
    </View>
  );
}

function Avatar({setImageUri, imageUri}) {

  return (
    <TouchableOpacity style={{height: '75%', justifyContent: 'flex-end'}}>
      <Image
        source={require('../assets/background.jpg')}
        style={{height: '100%', width: '100%'}}
        resizeMode="stretch"></Image>

      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}>
        <ImagePickerButton imageUri={imageUri} setImageUri={setImageUri} />

        <Text style={{color: 'black'}}>Sửa</Text>
      </View>

      <View
        style={{
          height: 20,
          backgroundColor: 'pink',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'absolute',
        }}>
        <Text style={{color: 'black'}}>Chạm để thay đổi</Text>
      </View>
    </TouchableOpacity>
  );
}

const Header =({navigation, date,imageUri})=> {
  const userLogin = auth().currentUser;

  const Update = async () => {
    try {
      const userRef = await db
        .collection('user')
        .where('email', '==', userLogin.email)
        .get();
      userRef.forEach(doc => {
        doc.ref.update({birth: date.join(''),avatar: imageUri});
      });
      Alert.alert('Thông báo', 'Cập nhật thành công', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.navigate('Loading');
          },
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View
      style={{
        height: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          justifyContent: 'space-around',
          width: '40%',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/back.png')}
            style={{height: 30, width: 30}}></Image>
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'black'}}>Sửa hồ sơ</Text>
      </View>
      <TouchableOpacity onPress={Update}>
        <Image
          source={require('../assets/check.png')}
          style={{height: 30, width: 30}}></Image>
      </TouchableOpacity>
    </View>
  );
}

export function UpdateName({navigation, route}) {
  const [updateName, setupdateName] = useState(route.params.name);
  const user = auth().currentUser;
  const handelSubmit = async () => {
    try {
      const userRef = await db
        .collection('user')
        .where('email', '==', user.email)
        .get();
      userRef.forEach(doc => {
        doc.ref.update({name: updateName});
      });
      Alert.alert('Thông báo', 'Cập nhật thành công', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.navigate('Loading');
          },
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: 'white',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            justifyContent: 'space-around',
            width: '40%',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/back.png')}
              style={{height: 30, width: 30}}></Image>
          </TouchableOpacity>

          <Text style={{fontSize: 20, color: 'black'}}>Sửa tên</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handelSubmit();
          }}>
          <Image
            source={require('../assets/check.png')}
            style={{height: 30, width: 30}}></Image>
        </TouchableOpacity>
      </View>
      <View style={{height: 5, backgroundColor: 'pink'}}></View>
      <View style={{height: 50, borderColor: 'black', borderWidth: 0.5}}>
        <TextInput
          value={updateName}
          onChangeText={text => setupdateName(text)}></TextInput>
      </View>
    </View>
  );
}

function Item({title, name, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: 'white',
      }}>
      <Text style={{color: 'black'}}>{name}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: 'black'}}>{title}</Text>
        <Image
          source={require('../assets/next.png')}
          style={{height: 20, width: 20}}></Image>
      </View>
    </TouchableOpacity>
  );
}

function ViewModal({modalVisible, setModalVisible}) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.box_modal}>
        <View style={styles.modal}>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.closeText}>Giới Tính</Text>
            </View>
            <TouchableOpacity
              style={styles.sex}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sex}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Nữ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sex}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Khác</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    height: 200,
    width: 300,
  },
  closeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  box_modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sex: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
});

export default Profile;
