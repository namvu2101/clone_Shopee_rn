import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../style';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {useSelector} from 'react-redux';



const UserLog = ({navigation, route}) => {
  const [data, setdata] = useState();
  const userLogin = auth().currentUser;
  const user = useSelector(state => state.user.user);
  let avatar, background, name;
  useEffect(() => {
    const GetData = async () => {
      try {
        const query = await firebase.firestore()
          .collection('Shop')
          .where('email', '==', userLogin.email)
          .get();
        query.docs.forEach(doc => setdata(doc.data()));
      } catch (error) {
        console.log(error);
      }
    };
    GetData();
  }, []);
  user.map(
    i => ((avatar = i.avatar), (name = i.name), (background = i.background)),
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {/* --------------------- Header --------------------- */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', {Value: name})}
          style={{height: 150, backgroundColor: 'yellow'}}>
          <Image
            source={{
              uri:
                background ||
                'https://th.bing.com/th/id/OIP.ZCz1R88I1MQPPO9whPSfNgHaEK?w=301&h=180&c=7&r=0&o=5&pid=1.7',
            }}
            style={{height: '100%', width: '100%', position: 'absolute'}}
            resizeMode="cover"></Image>

          <Header
            navigation={navigation}
            name={name}
            avatar={avatar}

          />
        </TouchableOpacity>

        {/* --------------------- Body --------------------- */}
        <Item navigation={navigation} data={data} />
      </ScrollView>
    </View>
  );
};
const DATA = [
  {
    id: '1',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Cửa hàng của tôi',
    title2: '',
    onPress: 'ShopProduct',
  },
  {
    id: '2',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Đăng bán',
    title2: '',
    onPress: 'adminProduct',
  },
  {
    id: '3',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Bắt đầu bán',
    title2: '',
    onPress: 'ResgiterShop',
  },
  {
    id: '4',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Bảo hiểm của tôi',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '5',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Đã mua',
    title2: 'Xem thêm sản phẩm',
    onPress: 'Login',
  },
  {
    id: '6',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Bắt đầu bán',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '7',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Khách hàng thân thiết',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '8',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Đã thích',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '9',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Đã cem gần đây',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '10',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Số dư tài khoản',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '11',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Shopee Xu',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '12',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Đánh giá',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '13',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Liên kết',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '14',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Thiết lập tài khoản',
    title2: '',
    onPress: 'Profile',
  },
  {
    id: '15',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Trung tâm trợ giúp',
    title2: '',
    onPress: 'Login',
  },
  {
    id: '16',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Tro chuyen',
    title2: '',
    onPress: 'Login',
  },
];

function Header({navigation, name, avatar}) {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 1,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Image
              source={require('../assets/settings.png')}
              style={styles.icon}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image
              source={require('../assets/shopping-cart.png')}
              style={styles.icon}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('../assets/bubble-chat.png')}
              style={styles.icon}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 2, justifyContent: 'flex-end'}}>
        <View
          style={{
            height: '80%',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 20,
          }}>
          <View style={{height: '80%', width: 65}}>
            <Image
              source={{
                uri:
                  avatar ||
                  'https://i1.wp.com/florrycreativecare.com/wp-content/uploads/2020/08/blank-profile-picture-mystery-man-avatar-973460.jpg?ssl=1',
              }}
              style={{height: '100%', width: '100%', borderRadius: 50}}
              resizeMode="cover"></Image>
          </View>
          <View>
            <Text style={{color: 'black'}}>{name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>Nguoi theo doi</Text>
              <View
                style={{
                  height: 20,
                  width: 1,
                  backgroundColor: 'black',
                  marginHorizontal: 10,
                }}></View>
              <Text style={{color: 'black'}}>Dang theo doi</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function Item({navigation,data}) {
  const user = auth().currentUser
  const handelSingout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Login',{email:user.email});
  };

  const ChageScreen=(stack)=>{
    if(!data){
      navigation.navigate('ResgiterShop')
    }
    else{
      navigation.navigate(`${stack}`)
    }
  }
  
  return (
    <View>
      {DATA.map((item, index) => (
        <View key={item.id}>
          <TouchableOpacity
            onPress={() => {
              ChageScreen(item.onPress)
            }}
            style={{
              height: 50,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={{uri: item.photo}} style={styles.imgs}></Image>
              <Text style={{color: 'black'}}>{item.title}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: 'black'}}>{item.title2}</Text>
              <Image
                source={require('../assets/next.png')}
                style={styles.imgs}></Image>
            </View>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        onPress={handelSingout}
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Text style={{color: 'black'}}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UserLog;
