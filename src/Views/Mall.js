import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert 
} from 'react-native';
import React, {useState, useEffect} from 'react';
import db from '../../db.json';
import {useSelector, useDispatch} from 'react-redux';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const Mall = ({route, navigation}) => {
  const user = auth().currentUser;
  const data = useSelector(state => state.product.data);
  const [textSearch, settextSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả'); // State để lưu trữ category được chọn
  // Lọc danh sách sản phẩm dựa trên category được chọn
  const [filteredProduct, setfilteredProduct] = useState([]);
  useEffect(() => {
    if (!route.params) {
      setSelectedCategory('Tất Cả');
    } else {
      setSelectedCategory(route.params.IDselected || 'Tất Cả');
      setfilteredProduct(route.params.data);
    }
  }, [route.params]);

  useEffect(() => {
    if (selectedCategory === 'Tất Cả') {
      setfilteredProduct(data);
    } else {
      setfilteredProduct(
        data.filter(item => item.category === selectedCategory),
      );
    }
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.search}>
          <View style={styles.boxsearch}>
            <TouchableOpacity
              onPress={() => {
                setSelectedCategory('Tất Cả');
                settextSearch('');
                setfilteredProduct(
                  data.filter(item =>
                    item.name.toLowerCase().includes(textSearch.toLowerCase()),
                  ),
                );
              }}>
              <Image
                source={require('../assets/search.png')}
                style={styles.imgs}></Image>
            </TouchableOpacity>

            <TextInput
              style={styles.txtInput}
              placeholder="Search"
              placeholderTextColor={'black'}
              value={textSearch}
              onChangeText={settextSearch}></TextInput>
          </View>
          <View style={styles.iconHeader}>
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
      </View>

      {/* LIST_CATERY */}
      {/* Hiển thị danh sách các category */}
      <View style={styles.caterys}>
        <Categories
          isSelected={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>

      {/* TITLE */}

      <View
        style={{
          alignItems: 'center',
          marginBottom: 5,
          justifyContent: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 15}}>{selectedCategory}</Text>
      </View>

      {/* LIST_VIEW */}

      <View style={styles.listView}>
        {/* Hiển thị danh sách sản phẩm */}
        <ListView data={filteredProduct} navigation={navigation} />
      </View>
    </View>
  );
};

// function Search({navigation, setSelectedCategory,data,filteredProduct}) {
//   const [textSearch, settextSearch] = useState('')
//   return (
//     <View style={styles.search}>
//       <View style={styles.boxsearch}>
//         <TouchableOpacity
//           onPress={() => {
//             setSelectedCategory('Tất Cả');
//             filteredProduct = (data.filter(
//             item => item.name.toLowerCase().includes(textSearch.toLowerCase())
//           ))
//           }}>
//           <Image
//             source={require('../assets/search.png')}
//             style={styles.imgs}></Image>
//         </TouchableOpacity>

//         <TextInput
//         style={styles.txtInput}
//         placeholder="Search"
//         value={textSearch}
//         onChangeText={settextSearch}></TextInput>
//       </View>
//       <View style={styles.iconHeader}>
//         <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
//           <Image
//             source={require('../assets/shopping-cart.png')}
//             style={styles.imgs}></Image>
//         </TouchableOpacity>
//         <Image
//           source={require('../assets/bubble-chat.png')}
//           style={styles.imgs}></Image>
//       </View>
//     </View>
//   );
// }

function Categories({isSelected, setSelectedCategory}) {
  const handleCategoryPress = category => {
    setSelectedCategory(category);
    // Cập nhật category được chọn trong state
  };
  const Render = item => {
    const bodercl =
      item.item.titie === isSelected
        ? {borderColor: 'red'}
        : {borderColor: 'white'};
    return (
      <TouchableOpacity
        style={[styles.item, bodercl]}
        onPress={() => {
          handleCategoryPress(item.item.titie);
        }}
        disabled={isSelected == item.item.titie ? true : false}>
        <Image
          source={item.item.photo}
          style={styles.image}
          resizeMode="stretch"></Image>
        <Text style={{fontSize: 10, textAlign: 'center', color: 'black'}}>
          {item.item.titie}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      horizontal
      data={db.TitleCategory}
      renderItem={Render}
      keyExtractor={item => item.titie}></FlatList>
  );
}

function ListView({data, navigation}) {
  const handelProduct = id => {
    navigation.navigate('Product', {IDProduct: id});
  };

  function renderItem(item) {
    const img = item.item.photo.filter(i => i.id === 1);
    return (
      <TouchableOpacity
        style={styles.itemList}
        onPress={() => handelProduct(item.item.id)}>
        {img.map(i => (
          <Image
            key={i.id}
            source={{uri: i.uri}}
            style={styles.photo}
            resizeMode="stretch"
          />
        ))}

        <View style={styles.listTitle}>
          <Text numberOfLines={2} style={styles.txtName}>
            {item.item.name}
          </Text>
          <Text style={styles.txtPrice}>{item.item.price} vnđ</Text>
          <Text style={styles.txtAdd}>{item.item.add}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 7,
      }}>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  caterys: {
    flex: 2,
    marginVertical: 10,
    backgroundColor: 'pink',
  },
  iconHeader: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photo: {
    height: 180,
    width: '100%',
  },
  listTitle: {marginHorizontal: 5, justifyContent: 'center'},
  txtPrice: {
    color: 'red',
    fontSize: 18,
  },
  txtName: {
    color: 'black',
  },
  txtAdd: {
    fontSize: 14,
  },
  listView: {
    flex: 9,
    backgroundColor: '#2144',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemList: {
    height: 280,
    width: '45%',
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'flex-start',
  },
  boxsearch: {
    height: '90%',
    width: '75%',
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  txtInput: {
    marginHorizontal: 5,
    color: 'black',
  },
  imgs: {
    height: 25,
    width: 25,
    marginHorizontal: 5,
  },
  item: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 2,
    marginVertical: 2,
    justifyContent: 'center',
    height: '95%',
    width: 80,
    borderWidth: 2,
  },
  image: {
    height: 70,
    width: 70,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '95%',
  },
});

export default Mall;
