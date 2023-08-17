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
import React from 'react';
import styles from '../style';

const DATA = [
  {
    id: '1',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Cửa hàng của tôi',
    title2: '',
  },
  {
    id: '2',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Đăng bán',
    title2: '',
  },
  {
    id: '3',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Bắt đầu bán',
    title2: '',
  },
  {
    id: '4',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Bảo hiểm của tôi',
    title2: '',
  },
  {
    id: '5',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Đã mua',
    title2: 'Xem thêm sản phẩm',
  },
  {
    id: '6',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Bắt đầu bán',
    title2: '',
  },
  {
    id: '7',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Khách hàng thân thiết',
    title2: '',
  },
  {
    id: '8',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Đã thích',
    title2: '',
  },
  {
    id: '9',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Đã cem gần đây',
    title2: '',
  },
  {
    id: '10',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Số dư tài khoản',
    title2: '',
  },
  {
    id: '11',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Shopee Xu',
    title2: '',
  },
  {
    id: '12',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Đánh giá',
    title2: '',
  },
  {
    id: '13',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Liên kết',
    title2: '',
  },
  {
    id: '14',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Thiết lập tài khoản',
    title2: '',
  },
  {
    id: '15',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Trung tâm trợ giúp',
    title2: '',
  },
  {
    id: '16',
    photo: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    title: 'Tro chuyen',
    title2: '',
  },
];

const Icon = item => {
  return (
    <View style={styles.box_icon}>
      <View style={styles.boder_icon}>
        <Image source={item.title.photo} style={styles.icon} />
      </View>
      <Text>{item.title.title}</Text>
    </View>
  );
};

const User = ({navigation}) => {
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        {/* --------------------- Header --------------------- */}

        <View style={{height: '15%', backgroundColor: 'red'}}>
          <View style={styles.header}>
            {/* view top_header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <Image
                source={require('../assets/settings.png')}
                style={styles.icon}></Image>
              <Image
                source={require('../assets/shopping-cart.png')}
                style={styles.icon}></Image>
              <Image
                source={require('../assets/bubble-chat.png')}
                style={styles.icon}></Image>
            </View>
            {/* view bot_header */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginHorizontal: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  width: 50,
                  height: 50,
                }}>
                <Image
                  source={require('../assets/user_home.png')}
                  style={styles.imgs}></Image>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  height: '100%',
                  width: '90%',
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setTimeout(() => navigation.navigate('Login'), 500);
                  }}>
                  <View
                    style={{
                      height: '90%',
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                      height: '100%',
                      width: 90,
                      alignItems: 'center',
                      height: '80%',
                    }}>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>
                      Đăng nhập
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => 
                    setTimeout(() => navigation.navigate('Regiter'), 500)
                  }>
                  <View
                    style={{
                      height: '90%',
                      borderColor: 'white',
                      justifyContent: 'center',
                      borderWidth: 2,
                      marginHorizontal: 10,
                      height: '100%',
                      width: 90,
                      alignItems: 'center',
                      height: '80%',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      Đăng ký
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* --------------------- Body --------------------- */}
        <View>
          {DATA.map((item, index) => (
            <View key={item.id}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Thông báo',
                    'Bạn phải đăng nhập để sử dụng chức năng này',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          setTimeout(() => navigation.navigate('Login'), 500);
                        },
                      },
                    ],
                  );
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
        </View>
      </View>
    </ScrollView>
  );
};

export default User;
