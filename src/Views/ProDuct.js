import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import Swiper from 'react-native-swiper';

const ProDuct = ({navigation, route}) => {
  const userCurrent = auth().currentUser;
  let IDuser;
  if (userCurrent) {
    IDuser = userCurrent.uid;
  }
  const data = useSelector(state => state.product.data);
  const IDProduct = route.params.IDProduct;
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setisSelected] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [images, setImages] = useState([]);

  const filteredProduct = data.filter(item => item.id === IDProduct);
  const imgs = filteredProduct.map(i => i.photo);

  useEffect(() => {
    imgs.map(i => setImages(i));
  }, [imgs]);

  useEffect(() => {
    //lay gia tri tren realtime database va luu vao cartItem

    const Getlist = async () => {
      database()
        .ref(`/cart/${IDuser}`)
        .on('value', snapshot => {
          if (!snapshot.val()) {
            console.log('chua co gia tri');
          } else {
            setCartItems(snapshot.val().List);
          }
        });
    };
    if (IDuser) {
      Getlist();
    }
  }, []);
  const SaveToFiredata = a => {
    database()
      .ref(`/cart/${IDuser}`)
      .set({
        List: a,
      })
      .then(() => {});
  };

  const onCloseAndChangeScreen = () => {
    return;
    setModalVisible(false);
    navigation.navigate('Cart');
  };

  const addToCart = item => {
    if (IDuser) {
      const name = item.name;
      const price = item.price;
      const id = item.id;
      const photo = item.photo.filter(i => i.id === 1);
      const itemIndex = cartItems.findIndex(i => i.id === item.id);

      if (itemIndex !== -1) {
        const updatedItem = {
          ...cartItems[itemIndex],
          quantity: cartItems[itemIndex].quantity + 1,
          tong:
            (cartItems[itemIndex].quantity + 1) * cartItems[itemIndex].price,
        };
        handleUpdateCartItem(updatedItem);
      } else {
        const newProduct = {id, name, price, photo, quantity: 1};
        setCartItems([...cartItems, newProduct]);
        const a = [...cartItems, newProduct];
        SaveToFiredata(a);
      }
      navigation.navigate('Cart');
    } else {
      Alert.alert('Thông báo!', 'Hãy đăng nhập trước', [{text: 'OK'}]);
      navigation.navigate('Login');
    }
  };

  const handleUpdateCartItem = item => {
    const updatedCartItems = cartItems.map(i => (i.id === item.id ? item : i));
    setCartItems(updatedCartItems);
    SaveToFiredata(updatedCartItems);
  };

  const title = isSelected ? 'Thu gọn' : 'Xem thêm';
  return (
    <View
      style={{
        flex: 1,
      }}>
      {filteredProduct.map(item => (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}
          key={item.id}>
          <ScrollView>
            <View style={{flex: 1}}>
              <View style={{height: 400, width: '100%'}}>
                <ImageProduct images={images} />
              </View>

              <View
                style={{
                  height: 150,
                  width: '100%',
                  backgroundColor: 'white',
                  justifyContent: 'space-around',
                  marginHorizontal: 10,
                }}>
                <Text style={{color: 'black', fontSize: 18}}>{item.name}</Text>
                <Text style={{color: 'red', fontSize: 20}}>
                  Giá: {item.price} ₫
                </Text>
              </View>

              <View style={{height: 10, backgroundColor: 'pink'}} />

              <View
                style={{
                  height: 200,
                  backgroundColor: 'white',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: 200,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={{
                        uri:
                          item.avatar ||
                          'https://i1.wp.com/florrycreativecare.com/wp-content/uploads/2020/08/blank-profile-picture-mystery-man-avatar-973460.jpg?ssl=1',
                      }}
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 50,
                        marginHorizontal: 10,
                      }}></Image>
                    <View>
                      <Text style={{color: 'black'}}>
                        {item.add || item.nameShop}
                      </Text>
                      <Text style={{color: 'black'}}></Text>
                    </View>
                  </View>

                  <View
                    style={{
                      borderColor: 'red',
                      borderWidth: 2,
                      height: 40,
                      width: 80,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 10,
                    }}>
                    <Text style={{color: 'black'}}>Xem shop</Text>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                  }}></View>
              </View>

              <View style={{height: 10, backgroundColor: 'pink'}}></View>

              <View
                style={{
                  height: 180,
                  width: '100%',
                  backgroundColor: 'white',
                  justifyContent: 'flex-end',
                }}>
                <Text>Cac san pham khac</Text>
                <View style={{height: 140, marginBottom: 10}}>
                  <ScrollView horizontal>
                    <ListPdShop item={item} />
                  </ScrollView>
                </View>
              </View>

              <View style={{height: 10, backgroundColor: 'pink'}}></View>

              {/* CHI TIẾT MÔ TẢ SẢN PHẨM */}
              <View
                style={{
                  marginHorizontal: 10,
                }}>
                <View style={isSelected ? {height: 300} : null}>
                  <Text
                    style={{
                      marginVertical: 5,
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    Mô tả sản phẩm
                  </Text>
                  <Text style={{color: 'black'}}>{item.detail}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => setisSelected(!isSelected)}
                  style={{
                    height: 50,
                    borderTopColor: 'grey',
                    borderTopWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  }}>
                  <Text style={{fontSize: 15, color: 'red'}}>{title}</Text>
                </TouchableOpacity>
              </View>

              <View style={{height: 10, backgroundColor: 'pink'}}></View>

              {/* ĐÁNH GIÁ SẢN PHẨM */}
              <View style={{marginHorizontal: 10, height: 400}}>
                <Text
                  style={{
                    marginVertical: 5,
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Đánh giá sản phẩm
                </Text>
                <TouchableOpacity
                  onPress={() => setisSelected(!isSelected)}
                  style={{
                    height: 50,
                    borderTopColor: 'grey',
                    borderTopWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  }}>
                  <Text style={{fontSize: 15, color: 'red'}}>{title}</Text>
                </TouchableOpacity>
              </View>

              <View style={{backgroundColor: '#2122', height: 1000}}>
                <View
                  style={{
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      height: 0.5,
                      width: 40,
                      backgroundColor: 'black',
                      marginHorizontal: 10,
                    }}
                  />
                  <Text style={{color: 'black'}}>Có thể bạn cũng thích</Text>
                  <View
                    style={{
                      height: 0.5,
                      width: 40,
                      backgroundColor: 'black',
                      marginHorizontal: 10,
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <Header navigation={navigation} IDuser={IDuser} />

          <Footer
            onPress={() => {
              // setModalVisible(!modalVisible)
              addToCart(item);
            }}
            Items={item}
            navigation={navigation}
            IDuser={IDuser}
          />
        </View>
      ))}
      <ModalView
        onClose={onCloseAndChangeScreen}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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
};

function ModalView({modalVisible, setModalVisible, onClose}) {
  const luachon = [
    {
      id: 1,
      title: 'luachon1',
    },
    {id: 2, title: 'luachon2'},
    {id: 3, title: 'luachon3'},
  ];
  const [number, setnumber] = useState(1);
  const [IsSelected, setIsSelected] = useState();

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{flex: 1, width: '100%'}}
          onPress={() => {
            setModalVisible(false);
            setIsSelected();
          }}></TouchableOpacity>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            flex: 1,
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <View style={{flex: 1}}>
            <View style={{alignItems: 'flex-end', marginHorizontal: 20}}>
              <Text
                style={{fontSize: 25}}
                onPress={() => {
                  setModalVisible(false);
                  setIsSelected();
                }}>
                X
              </Text>
            </View>
            <View
              style={{
                flex: 4,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Image
                source={require('../assets/avatar.jpg')}
                style={{height: 60, width: 60}}
              />
              <View>
                <Text>4000210</Text>
                <Text>Kho:12</Text>
              </View>
            </View>

            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Text>Size</Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                }}>
                {luachon.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      item.id === IsSelected
                        ? {borderColor: 'red', borderWidth: 1}
                        : null,
                      {backgroundColor: 'pink', flexDirection: 'row'},
                    ]}
                    onPress={() => {
                      IsSelected == item.id
                        ? setIsSelected()
                        : setIsSelected(item.id);
                    }}>
                    <Image
                      source={require('../assets/user.png')}
                      style={{height: 30, width: 20}}
                    />
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View
              style={{
                flex: 2,
                justifyContent: 'space-between',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text> SO luong</Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setnumber(number - 1);
                  }}
                  disabled={number < 2 ? true : false}>
                  <Text>-</Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>{number}</Text>
                </View>

                <TouchableOpacity
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setnumber(number + 1);
                  }}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flex: 2, justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={onClose}
                disabled={!IsSelected ? true : false}
                style={[
                  {
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  IsSelected
                    ? {backgroundColor: 'red'}
                    : {backgroundColor: 'grey'},
                ]}>
                <Text>Mua Ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Header({navigation, IDuser}) {
  const handelCart = () => {
    if (IDuser) {
      navigation.navigate('Cart');
    } else {
      alert('vui long dang nhap');
    }
  };
  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue',
        width: '100%',
        paddingLeft: 20,
        position: 'absolute',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: 30,
          width: 30,
          backgroundColor: 'pink',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/back.png')}
          style={styles.imgs}></Image>
      </TouchableOpacity>

      <View
        style={{
          height: '80%',
          width: '50%',
          flexDirection: 'row',
          marginHorizontal: 10,
          alignItems: 'center',
          backgroundColor: 'white',
          justifyContent: 'space-around',
          borderRadius: 8,
        }}>
        <Image
          source={require('../assets/search.png')}
          style={styles.imgs}></Image>
        <TextInput
          style={{
            width: '80%',
          }}
          placeholderTextColor={'black'}
          placeholder="Search"></TextInput>
      </View>

      <View
        style={{
          width: '30%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            backgroundColor: 'pink',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/share.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handelCart}
          style={{
            height: 30,
            width: 30,
            backgroundColor: 'pink',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/shopping-cart.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            backgroundColor: 'pink',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/three-dots.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ImageProduct({images}) {
  const windowWidth = Dimensions.get('window').width;
  return (
    <Swiper
      dotStyle={{height: 5, width: 5, borderRadius: 10}}
      activeDotColor="red"
      dotColor="white"
      autoplay={false}
      showsButtons={true}>
      {images.map(item => (
        <View
          key={item.id}
          style={{borderColor: 'black', borderWidth: 1, flex: 1}}>
          <Image
            source={{uri: item.uri}}
            resizeMode="stretch"
            style={{height: '100%', width: windowWidth}}
          />
        </View>
      ))}
    </Swiper>
  );
}
function Footer({onPress, Items, navigation, IDuser}) {
  const item = [{...Items, quantity: 1}];

  return (
    <View style={{height: 50, flexDirection: 'row'}}>
      <View
        style={{
          backgroundColor: 'grey',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <Image
            source={require('../assets/bubble-chat.png')}
            style={{height: 40, width: 40}}></Image>
        </TouchableOpacity>
        <View
          style={{height: '80%', width: 1.5, backgroundColor: 'black'}}></View>

        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../assets/shopping-cart.png')}
            style={{height: 40, width: 40}}></Image>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          if (!IDuser) {
            Alert.alert('Thông báo!', 'Hãy đăng nhập trước', [{text: 'OK'}]);
            navigation.navigate('Login');
          } else {
            navigation.navigate('Pay', {Value: item, Total: Items.price});
          }
        }}
        style={{
          backgroundColor: 'red',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Mua với Voucher</Text>
      </TouchableOpacity>
    </View>
  );
}

function ListPdShop({item}) {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text>Danh sách sản phẩm</Text>
    </View>
  );
}
export default ProDuct;
