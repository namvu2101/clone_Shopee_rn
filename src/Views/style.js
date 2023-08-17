import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  photo: {
    height: 180,
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
  itemList: {
    height: 280,
    width: '45%',
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'flex-start',
  },
  header: {
    height: 200,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  below_header: {
    backgroundColor: 'yellow',
    height: 60,
    alignItems: 'center',
  },
  scaner_box: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 50,
  },
  body_top: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 80,
    marginBottom: 20,
  },
  body_center: {
    backgroundColor: '#F7FFA9',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  box_icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70, 
    width: 70,
    marginHorizontal: 5,
  },
  boder_icon: {
    borderColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center_top: {
    marginVertical: 10,
    backgroundColor: '#F3ED84',
    width: '95%',
    height: 120,
    justifyContent: 'flex-end',
  },
  center_bot: {
    backgroundColor: '#F3ED84',
    height: 130,
    width: '95%',
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  box_center_top: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    marginTop: 5,
  },
  item_center_top: {height: '80%', width: '96%', flexDirection: 'row'},
  view_voucher: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '25%',
  },
  box_voucher: {
    borderColor: '#2311',
    borderWidth: 2,
    height: '100%',
    width: '75%',
  },
  view_item_center_bot: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    marginTop: 5,
  },
  box_item_center_bot: {
    borderRightColor: 'red',
    borderRightWidth: 0.5,
    height: '100%',
    width: '20%',
    marginVertical: 5,
  },
  item: {
    height: 70,
    width: 70,
  },
  logo: {
    height: 40,
    width: 40,
  },
  icon: {
    height:30,
    width:30
  },
  top_header: {
    flex: 1,
    position: 'absolute',
  },
  viewsearch: {
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxsearch: {
    height: '90%',
    width: '75%',
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    borderRadius: 4,
  },
  title: {
    fontSize: 32,
  },
  viewbanner: {},

  imgs: {
    height: 20,
    width: 20,
  },
  body: {
    backgroundColor: '#2311',
  },

  voucher: {
    flex: 2,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  invoucher: {
    height: '80%',
    borderColor: '#0023',
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  body_bot: {
    flex: 2,
    backgroundColor: 'pink',
  },
  listview: {
    backgroundColor: 'white',
    marginTop: 10,
  },

  input: {
    width: '80%',
  },
  anh: {
    height: 50,
    width: 50,
    marginHorizontal: 2,
  },
  view_product: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 250,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  img_product: {},
});
export default styles;
