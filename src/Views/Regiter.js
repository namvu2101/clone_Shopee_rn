import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../style';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {isCheckingEmail, isCheckingPass} from './Validation';

const db = firebase.firestore();

const Regiter = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');
  const [repass, setrepass] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState();
  const [error, setError] = useState('');
  const handleAddAuth = () => {
    if (email.length == 0 || password.length == 0 || !phone|| name.length==0) {
      setError('Hãy nhập đủ thông tin');
    } else if (password != repass) {
      setError('Mật khẩu không khớp');
      setrepass('')
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const id = userCredential.user.uid;
          SaveToFireStore(id);
          Alert.alert('Thông báo', 'Đăng ký thành công', [
            {text: 'Ok', onPress: () => navigation.navigate('Login',{email:email})},
          ]);
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              setError('Email đã tồn tại');
              setemail('')
              break;
            case 'auth/invalid-email':
              setError('Email Không hợp lệ');
              break;
            case 'auth/weak-password':
              setError('Mật khẩu phải lớn hơn 6 kí tự ');
              break;
            default:
              setError(error);
              break;
          }
        });
    }
  };
  const SaveToFireStore = async (id) => {
    try {
      await firebase.firestore().collection('user').doc(`${id}`).set({
        email,
        password,
        name,
        phone,
        sex: '',
        birth: '',
        avatar:
          'https://i1.wp.com/florrycreativecare.com/wp-content/uploads/2020/08/blank-profile-picture-mystery-man-avatar-973460.jpg?ssl=1',
        role: 'user',
        background:
          'https://th.bing.com/th/id/OIP.ZCz1R88I1MQPPO9whPSfNgHaEK?w=301&h=180&c=7&r=0&o=5&pid=1.7',
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Header/> */}
      <View style={{width: '100%'}}>
        <Item
          title={'Email'}
          value={email}
          onChangeText={setemail}
          keyType="email-address"
        />
        <Item title={'Họ tên'} value={name} onChangeText={setname} />
        <Item
          title={'Mật Khẩu'}
          value={password}
          onChangeText={setpass}
          secureTextEntry={true}
        />
        <Item
          title={'Nhập lại mật khẩu'}
          value={repass}
          onChangeText={setrepass}
          secureTextEntry={true}
        />
        <Item
          title={'SĐT'}
          value={phone}
          onChangeText={setphone}
          keyType="numeric"
        />
      </View>
      <Text style={{color: 'red',textAlign:'center'}}>{error}</Text>
      <TouchableOpacity style={styles.btnlog} onPress={() => handleAddAuth()}>
        <Text style={{color: 'white', fontSize: 20}}>Đăng ký</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 15,
          flex: 0.3,
        }}>
        <View style={styles.line}></View>
        <Text style={{color: 'black'}}>HOẶC</Text>
        <View style={styles.line}></View>
      </View>
      <Bottom />
      <Footer navigation={navigation} />
    </View>
  );
};

function Bottom() {
  return (
    <View style={styles.body_down}>
      <TouchableOpacity style={styles.box}>
        <Image
          source={require('../assets/google.png')}
          style={styles.imgs}></Image>
        <View style={styles.center}>
          <Text style={styles.black}>Đăng ký bằng google</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <Image
          source={require('../assets/facebook.png')}
          style={styles.imgs}></Image>
        <View style={styles.center}>
          <Text style={styles.black}>Đăng ký bằng Facebook</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
function Footer({navigation}) {
  return (
    <View style={styles.footer}>
      <Text style={styles.black}>Bạn đã có tài khoản?</Text>
      <TouchableOpacity>
        <Text
          style={styles.blue}
          onPress={() => {
            navigation.goBack();
          }}>
          {' '}
          Đăng nhập
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function Item({title, onChangeText, value, keyType, secureTextEntry}) {
  return (
    <View
      style={{
        height: 50,
        marginHorizontal: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 10,
        justifyContent: 'center',
      }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyType}
        secureTextEntry={secureTextEntry}
        placeholder={title}
        placeholderTextColor={'grey'}
        style={{color: 'black'}}
      />
    </View>
  );
}

export default Regiter;
