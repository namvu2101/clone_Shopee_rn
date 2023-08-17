import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import styles from '../style';
import auth, {firebase} from '@react-native-firebase/auth';
import {isCheckingEmail, isCheckingPass} from './Validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from '../Redux/userSlice';
import {useDispatch} from 'react-redux';
import {getProduct} from '../Redux/productSlice';

const googledURL = 'http://google.com';

const Login = ({navigation, route}) => {
  const [keybroadisShow, setkeybroadisShow] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setkeybroadisShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setkeybroadisShow(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}

      <Header navigation={navigation} />

      {/* Body */}

      <View style={styles.body}>
        <Textinput navigation={navigation} route={route} />

        <TouchableOpacity>
          <Text style={{color: 'blue', textAlign: 'right', paddingRight: 20}}>
            Đăng nhập bằng SMS
          </Text>
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
        {keybroadisShow == false && <ItemBox url={googledURL} />}
      </View>
      {/* Footer */}
      <Footer navigation={navigation} />
    </View>
  );
};

function Header({navigation}) {
  return (
    <View styles={styles.header}>
      <View style={styles.box_header}>
        <View style={styles.titleHeader}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/back.png')}
              style={styles.imgs}></Image>
          </TouchableOpacity>

          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
            Đăng Nhập
          </Text>
        </View>

        <View style={styles.titleHeader}>
          <Image
            source={require('../assets/store-front.png')}
            style={styles.imgs}></Image>
          <Image
            source={require('../assets/question.png')}
            style={styles.imgs}></Image>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/icshop.png')}
          style={styles.logo}
          resizeMode="stretch"></Image>
      </View>
    </View>
  );
}

function Footer({navigation}) {
  return (
    <View style={styles.footer}>
      <Text style={styles.black}>Bạn chưa có tài khoản ?</Text>
      <TouchableOpacity onPress={() => navigation.push('Regiter')}>
        <Text style={styles.blue}> Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}

function Textinput({navigation, route}) {
  const [sercurePass, setsercurePass] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (!route.params) {
      setEmail('');
    } else {
      setEmail(route.params.email);
    }
  }, [route.params]);
  const handelSubmit = () => {
    if (email == '' || password == '') {
      Alert.alert(
        'Thông báo', // Tiêu đề của alert
        'Không được bỏ trống', // Nội dung của alert
        [
          {text: 'Đóng'},
          // Nút OK với hàm callback onPress
        ],
        {cancelable: true}, // cho phép đóng alert bằng cách bấm ra ngoài
      );
    } else handleLogin();
  };

  useEffect(() => {
    setError(error);
  }, [error]);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        // Xác thực thành công,
        try {
          await AsyncStorage.setItem('email', email);
        } catch (e) {
          console.error('Failed to save login:', e);
        }
        navigation.navigate('Loading');
      })
      .catch(e => {
        // Xác thực thất bại, lỗi được trả về

        switch (e.code) {
          case 'auth/wrong-password':
            setError('Bạn nhập sai mật khẩu');
            setPassword('');
            break;
          case 'auth/too-many-requests':
            setError('Bạn nhập sai mật khẩu');
            setPassword('');
            break;
          case 'auth/invalid-email':
            setError('Email không đúng định dạng');
            break;
          case 'auth/user-not-found':
            setError('Email không tồn tại');
            break;
          case ' auth/network-request-failed':
            setError('Không có kết nối Internet');
            break;

          default:
            setError(e.code)
            break;
        }
      });
  };

  return (
    <View style={styles.body_up}>
      <View style={styles.boxinput}>
        <Image
          source={require('../assets/user.png')}
          style={styles.imgs}></Image>
        <View>
          <TextInput
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            style={styles.input}
            placeholderTextColor={'grey'}
            placeholder="Email/Số điện thoại/Tên tài khoản"></TextInput>
        </View>
      </View>
      <View style={styles.boxinput}>
        <Image
          source={require('../assets/padlock.png')}
          style={styles.imgs}></Image>
        <View style={styles.box_pass}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={[styles.input, styles.setWidth]}
            placeholder="Mật khẩu"
            placeholderTextColor={'grey'}
            secureTextEntry={sercurePass}></TextInput>
          <TouchableOpacity
            onPress={() => {
              setsercurePass(!sercurePass);
              // seteyepass('../assets/close-eye.png');
            }}>
            {sercurePass ? (
              <Image
                source={require('../assets/close-eye.png')}
                style={styles.imgs}></Image>
            ) : (
              <Image
                source={require('../assets/eye.png')}
                style={styles.imgs}></Image>
            )}
          </TouchableOpacity>

          <View
            style={{
              height: 20,
              width: 1,
              backgroundColor: 'black',
              marginHorizontal: 10,
            }}></View>
          <View>
            <TouchableOpacity>
              <Text style={styles.blue}>Quên?</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </View>
      <Text style={{marginHorizontal: 20, color: 'red'}}>{error}</Text>
      <TouchableOpacity
        onPress={() => {
          handelSubmit();
        }}>
        <Submit />
      </TouchableOpacity>
    </View>
  );
}

function Submit() {
  return (
    <View style={styles.btnlog}>
      <Text style={{color: 'white', fontSize: 20}}>Đăng Nhập</Text>
    </View>
  );
}

function ItemBox({url}) {
  return (
    <View style={styles.body_down}>
      <TouchableOpacity style={styles.box}>
        <Image
          source={require('../assets/google.png')}
          style={styles.imgs}></Image>
        <View style={styles.center}>
          <Text style={styles.black}>Đăng nhập với Google</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          console.log('fb');
        }}>
        <Image
          source={require('../assets/facebook.png')}
          style={styles.imgs}></Image>
        <View style={styles.center}>
          <Text style={styles.black}>Đăng nhập với Facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <Image
          source={require('../assets/apple-logo.png')}
          style={styles.imgs}></Image>
        <View style={styles.center}>
          <Text style={styles.black}>Đăng nhập với Apple</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
