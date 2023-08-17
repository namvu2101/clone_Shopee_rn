import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './style';
import Swiper from 'react-native-swiper';
import db from '../../db.json';
import auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const [scrollY, setScrollY] = useState(0);
  const data = useSelector(state => state.product.data);
  const [dataGift, setdataGift] = useState(data);

  useEffect(() => {
    if (data.length > 0) {
      const coppydata = [...data];
      const random = coppydata.sort(() => 0.5 - Math.random());
      setdataGift(random);
    }
  }, [data]);

  const handleScroll = event => {
    const {y} = event.nativeEvent.contentOffset;
    setScrollY(y);
  };
  return (
    <View style={styles.container}>
      <ScrollView onScroll={handleScroll}>
        <Banner />
        <View style={styles.below_header}>
          <View style={styles.scaner_box}>
            <View style={{width: '16%', alignItems: 'center'}}>
              <Image
                source={require('../assets/scanner.png')}
                style={styles.imgs}></Image>
            </View>
            <View
              style={{
                width: '42%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderLeftColor: 'red',
                borderRightColor: 'red',
                borderRightWidth: 1,
                borderLeftWidth: 1,
                height: 40,
              }}>
              <Image
                source={require('../assets/scanner.png')}
                style={styles.imgs}></Image>
              <Text style={{color: 'black'}}>ShopPay</Text>
            </View>
            <View
              style={{
                width: '42%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
              }}>
              <Image
                source={require('../assets/scanner.png')}
                style={styles.imgs}></Image>
              <Text style={{color: 'black'}}>Shop Pay</Text>
            </View>
          </View>
        </View>

        {/* {List Icon} */}
        <>
          {/* <View
          style={{
            height: 150,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ScrollView horizontal>
            <ListIcon />
          </ScrollView>
        </View> */}

          {/* {----} */}
          {/* <View
          style={{
            borderColor: 'red',
            borderWidth: 2,
            height: 100,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Image</Text>
        </View> */}

          {/* {Flash Sale} */}

          {/* <View
          style={{
            width: '100%',
            height: 200,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
            }}>
            <Text>Flash Sale</Text>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Text>Xem tat ca</Text>
              <Image
                source={require('../assets/next.png')}
                style={styles.imgs}></Image>
            </TouchableOpacity>
          </View>
          <ListFlashSale />
        </View> */}

          <View style={{height: 10, backgroundColor: 'pink'}}></View>
          {/* {Search First} */}

          {/* <View style={{height: 200, backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
            }}>
            <Text>Tim kiem hang dau</Text>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Text>Xem tat ca</Text>
              <Image
                source={require('../assets/next.png')}
                style={styles.imgs}></Image>
            </TouchableOpacity>
          </View>
          <ListSF />
        </View> */}
        </>
        <View style={{height: 10, backgroundColor: 'pink'}}></View>

        {/* {Danh muc} */}

        <View style={{height: 250, width: '100%', backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
            }}>
            <Text style={{color: 'black'}}>Danh Mục</Text>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => navigation.navigate('Mall')}>
              <Text style={{color: 'black'}}>Xem Tất Cả</Text>
              <Image
                source={require('../assets/next.png')}
                style={styles.imgs}></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{height: '90%', width: '100%', backgroundColor: 'white'}}>
            <ScrollView horizontal>
              <View>
                <View style={{flexDirection: 'row'}}>
                  {db.Danhmuc.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() =>
                        navigation.navigate('Mall', {IDselected: item.name})
                      }>
                      <View
                        style={{
                          height: 80,
                          width: 80,
                          alignItems: 'center',
                          backgroundColor: 'white',
                          marginBottom: 10,
                        }}>
                        <Image
                          source={{uri: item.photo}}
                          style={styles.banner}
                          resizeMode="stretch"></Image>
                        <Text
                          numberOfLines={1}
                          style={{fontSize: 10, color: 'black'}}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={{flexDirection: 'row'}}>
                  {db.Danhmuc2.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() =>
                        navigation.navigate('Mall', {IDselected: item.name})
                      }>
                      <View
                        style={{
                          height: 80,
                          width: 80,
                          alignItems: 'center',
                          backgroundColor: 'white',
                          marginVertical: 5,
                        }}>
                        <Image
                          source={{uri: item.photo}}
                          style={styles.banner}
                          resizeMode="stretch"></Image>
                        <Text
                          numberOfLines={1}
                          style={{fontSize: 10, color: 'black'}}>
                          {' '}
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        <View style={{height: 10, backgroundColor: 'pink'}}></View>

        {/* {Goi y} */}

        <View>
          <View
            style={{
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
              Sản Phẩm Hôm Nay
            </Text>
          </View>
        </View>
        <GiftView data={dataGift} navigation={navigation} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Mall')}
          style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'red'}}>Xem Thêm</Text>
        </TouchableOpacity>
      </ScrollView>
      <View
        style={[
          styles.top_header,
          scrollY >= 200 ? {backgroundColor: 'white'} : null,
        ]}>
        <Search navigation={navigation} scrollY={scrollY} data={data} />
      </View>
    </View>
  );
};

function Banner() {
  return (
    <View style={{height: 200, width: '100%'}}>
      <Swiper
        dotStyle={{height: 5, width: 5, borderRadius: 10}}
        activeDotColor="red"
        dotColor="white"
        autoplay={true}
        autoplayTimeout={4}
        showsButtons={false}>
        {db.banner.map(item => (
          <View key={item.id}>
            <Image
              source={{uri: item.photo}}
              resizeMode="stretch"
              style={{height: '100%', width: '100%'}}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
}

function Search({navigation, data}) {
  const user = auth().currentUser;
  const [textSearch, settextSearch] = useState('');
  const item = data.filter(item =>
    item.name.toLowerCase().includes(textSearch.toLowerCase()),
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={styles.boxsearch}>
        <TouchableOpacity
          disabled={false}
          onPress={() => {
            settextSearch('');
            navigation.navigate('Mall', {data: item});
          }}>
          <Image
            source={require('../assets/search.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>

        <TextInput
          value={textSearch}
          onChangeText={settextSearch}
          style={{
            width: '80%',
          }}
          placeholderTextColor={'black'}
          placeholder="Search"></TextInput>
        <View>
          <TouchableOpacity>
            <Image
              source={require('../assets/camera.png')}
              style={styles.imgs}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '20%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (!user) {
              Alert.alert('Thông báo!', 'Bạn cần đăng nhập trước', [
                {text: 'OK'},
              ]);
            } else {
              navigation.navigate('Cart');
            }
          }}>
          <Image
            source={require('../assets/shopping-cart.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!user) {
              Alert.alert('Thông báo!', 'Bạn cần đăng nhập trước', [
                {text: 'OK'},
              ]);
            } else {
              navigation.navigate('ChatItem');
            }
          }}>
          <Image
            source={require('../assets/bubble-chat.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// function ListIcon() {
//   return (
//     <View
//       style={{
//         justifyContent: 'center',
//         backgroundColor: 'white',
//         height: '100%',
//       }}>
//       <View style={{flexDirection: 'row'}}>
//         {db.Icon.map((item, index) => (
//           <TouchableOpacity key={item.id}>
//             <View style={styles.box_icon}>
//               <Image source={item.photo} style={styles.logo} />
//               <Text style={{fontSize: 10}} numberOfLines={1}> {item.name}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={{flexDirection: 'row'}}>
//         {db.Icon2.map(item => (
//           <TouchableOpacity key={item.id}>
//             <View style={styles.box_icon}>
//               <Image source={item.photo} style={styles.logo} />
//               <Text style={{fontSize: 10}}>{item.name}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

// function ListFlashSale() {
//   return (
//     <FlatList
//       horizontal={true}
//       data={dataFlashSale}
//       renderItem={({item}) => (
//         <View
//           style={{
//             height: 150,
//             width: 100,
//             backgroundColor: 'white',
//             marginHorizontal: 5,
//             alignItems: 'center',
//           }}>
//           <Image
//             source={item.photo}
//             style={{height: 100, width: 100}}
//             resizeMode="stretch"></Image>
//           <Text>{item.price}</Text>
//         </View>
//       )}
//       keyExtractor={item => item.id}></FlatList>
//   );
// }

// function ListSF() {
//   return (
//     <FlatList
//       horizontal={true}
//       data={dataSF}
//       renderItem={({item}) => (
//         <View
//           style={{
//             height: 150,
//             width: 100,
//             backgroundColor: 'white',
//             marginHorizontal: 5,
//             alignItems: 'center',
//           }}>
//           <Image
//             source={item.photo}
//             style={{height: 100, width: 100}}
//             resizeMode="stretch"></Image>
//           <Text>{item.name}</Text>
//         </View>
//       )}
//       keyExtractor={item => item.id}></FlatList>
//   );
// }

const GiftView = ({data, navigation}) => {
  const firstRow = data.slice(0, 8).map((item, index) => (
    <View key={index} style={{flex: 1}}>
      <TouchableOpacity
        style={styles.view_product}
        onPress={() => {
          navigation.navigate('Product', {IDProduct: item.id});
        }}>
        <View style={{height: 180, width: '100%'}}>
          <Image
            source={{uri: item.photo.find(i => i.id === 1)?.uri}}
            style={{height: '100%', width: '100%'}}
            resizeMode="stretch"></Image>
        </View>
        <View style={{}}>
          <Text numberOfLines={1} style={{color: 'black'}}>
            {item.name}
          </Text>
          <Text style={{color: 'red'}}>{item.price} vnđ</Text>
        </View>
      </TouchableOpacity>
    </View>
  ));

  const secondRow = data.slice(8, 16).map((item, index) => (
    <View key={index} style={{flex: 1}}>
      <TouchableOpacity
        style={styles.view_product}
        onPress={() => {
          navigation.navigate('Product', {IDProduct: item.id});
        }}>
        <View style={{height: 180, width: '100%'}}>
          <Image
            source={{uri: item.photo.find(i => i.id === 1)?.uri}}
            style={{height: '100%', width: '100%'}}
            resizeMode="stretch"></Image>
        </View>
        <View style={{}}>
          <Text numberOfLines={1} style={{color: 'black'}}>
            {item.name}
          </Text>
          <Text style={{color: 'red'}}>{item.price} vnđ</Text>
        </View>
      </TouchableOpacity>
    </View>
  ));

  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>{firstRow}</View>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        {secondRow}
      </View>
    </View>
  );
};

export default Home;
