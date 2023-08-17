import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
  Pressable,
  Alert,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Cart = ({navigation}) => {
  const userCurrent = auth().currentUser
  const IDuser = userCurrent.uid 
  const [selected, setSelected] = useState([]);
  const [ISselected, setIsSelected] = useState(false);
  const [title, settitle] = useState('');
  const [Items, setItems] = useState([]);


  useEffect(() => {
    const Getlist = async () => {
      database()
        .ref(`/cart/${IDuser}`)
        .on('value', snapshot => {
          if (!snapshot.val()) {
            settitle('Chưa có sản phẩm nào trong giỏ');
          } else {
            settitle('Danh sach san pham cua ban');
            setItems(snapshot.val().List);
          }
        });
    };
    Getlist();
  }, []);

  const total = Items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <View style={styles.container}>
      <View style={styles.headers}>
        <Header navigation={navigation} index={Items.length} />
      </View>
      <Text style={{color:'black'}}>{title}</Text>
      <View style={styles.body}>
        <Body
          selected={selected}
          setSelected={setSelected}
          Items={Items}
          setItems={setItems}
          IDuser={IDuser}
        />
      </View>
      <View style={styles.footer}>
        <Footer navigation={navigation} total={total} Items={Items} />
      </View>
    </View>
  );
};

function Header({navigation, index}) {
  return (
    <View style={styles.box_header}>
      <View style={styles.box_back}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/back.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Giỏ hàng ({index})</Text>
      </View>
      <View style={styles.box_chat}>
        <Text>Sửa</Text>
        <TouchableOpacity>
          <Image
            source={require('../assets/chat.png')}
            style={styles.imgs}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Body({selected, setSelected, Items, setItems,IDuser}) {
  const handleRemoveCartItem = item => {
    const updatedCartItems = Items.filter(i => i.id !== item.id);
    Alert.alert(
      'Thông báo',
      'Bạn có muốn xóa sản phẩm này không?',
      [
        {
          text: 'Hủy',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setItems(updatedCartItems);
            SaveToFiredata(updatedCartItems);
          },
        },
      ],
      {cancelable: false},
    );
  };
  const handleUpdateCartItem = item => {
    const updatedCartItems = Items.map(i => (i.id === item.id ? item : i));
    setItems(updatedCartItems);
    SaveToFiredata(updatedCartItems);
  };

  const SaveToFiredata = a => {
    database()
    .ref(`/cart/${IDuser}`)
    .set({
        List: a,
      })
      .then(() => {});
  };

  function CartItem({item}) {
    const handleQuantityChange = value => {
      const updatedItem = {...item, quantity: item.quantity + value};
      handleUpdateCartItem(updatedItem);
    };
    return (
      <View key={item.id} style={{height: 150}}>
        <View
          style={{
            height: 140,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginRight: 20,
          }}>
          {item.photo.map(i => (
            <Image
            key={i.id}
              source={{uri: i.uri}}
              style={{height: 80, width: 80, marginHorizontal: 20}}
            />
          ))}

          <View
            style={{
              width: '60%',
              marginHorizontal: 20,
              height: '100%',
              justifyContent: 'center',
            }}>
            <Text numberOfLines={1} style={{color:'black'}}>{item.name}</Text>
            <Text style={{color:'red'}}>{item.price} vnđ</Text>
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
                onPress={() => handleQuantityChange(-1)}
                disabled={item.quantity < 2 ? true : false}>
                <Text style={{color:'black'}}>-</Text>
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
                <Text style={{color:'black'}}>{item.quantity}</Text>
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
                onPress={() => handleQuantityChange(1)}>
                <Text style={{color:'black'}}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleRemoveCartItem(item)}
            style={{
              height: 30,
              width: 30,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Text style={{color: 'yellow'}}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 10, backgroundColor: 'pink'}}></View>
      </View>
    );
  }
  return (
    <FlatList
      data={Items}
      renderItem={CartItem}
      keyExtractor={item => item.id}
    />
  );
}

function Footer({navigation, total, Items}) {
const [checkData, setcheckData] = useState()
useEffect(()=>{
  if(Items.length===0){
    setcheckData(true)
  }
  else setcheckData(false)
},[Items])
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: 'pink',
        borderTopWidth: 2,
        justifyContent: 'space-between',
      }}>

      <View style={{alignItems: 'center', justifyContent: 'center', flex: 2}}>
        <Text style={{color:'black'}}>Tổng tiền:</Text>
        <Text style={{color: 'red'}}>{total} vnđ</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Pay', {Value: Items, Total: total});
        }}
        disabled={checkData}
        style={{
          width: 100,
          backgroundColor: checkData? 'grey':'red',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  box_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  checked: {
    backgroundColor: 'yellow',
  },
  box_back: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-around',
    width: '50%',
  },
  box_chat: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '20%',
    justifyContent: 'space-around',
  },
  headers: {
    flex: 0.8,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'pink',
    borderBottomWidth: 2,
  },
  footer: {
    flex: 0.8,
    backgroundColor: 'white',
  },
  body: {
    flex: 8.4,
    backgroundColor: 'white',
  },
  imgs: {
    height: 30,
    width: 30,
  },
  titleHeader: {
    fontSize: 20,
    color: 'black',
  },
});
export default Cart;
