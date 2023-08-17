import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../Redux/userSlice';

export default function ChatScreen({navigation, route}) {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [text, settext] = useState([]);
  const userLog = auth().currentUser;
  const abc = route.params.infor;
  const senderId = userLog.email; // ID của người gửi
  const receiverId = abc.email; // ID của người nhận (có thể lấy từ một đối tượng hoặc từ đường dẫn trên URL)
  const [avatar, setavatar] = useState('');

  useEffect(() => {
    const GetInfor=async()=>{
      const querySnapshot = await firestore().collection('user').where('email','==',userLog.email).get();
      const res = querySnapshot.docs.map(doc => doc.data());
      res.map(i=>setavatar(i.avatar))
    }
    GetInfor()
  }, []);


  useEffect(() => {
    settext([abc]);
  }, [route.params.infor]);

  useEffect(() => {
    const reference = database().ref(`/messages`);
    reference.orderByChild('createdAt').on('value', snapshot => {
      const message = snapshot.val();
      const messagesList = [];

      for (let key in message) {
        messagesList.push({
          _id: key,
          text: message[key].text,
          receiverId: message[key].receiverId,
          senderId: message[key].senderId,
          createdAt: new Date(message[key].createdAt),
          user: message[key].user,
          avatar: message[key].user.avatar,
        });
      }

      const data = messagesList.filter(
        i =>
          (i.senderId === senderId && i.receiverId === receiverId) ||
          (i.senderId === receiverId && i.receiverId === senderId),
      );
      const sortedMessages = [...data].sort(
        (a, b) => b.createdAt - a.createdAt,
      );

      setMessages(sortedMessages);
    });

    return () => reference.off('value');
  }, [receiverId]);

  const onSend = useCallback((messages = []) => {
    const message = messages[0];
    const reference = database().ref(`/messages`).push();
    reference.set({
      text: message.text,
      createdAt: database.ServerValue.TIMESTAMP,
      senderId: senderId,
      receiverId: receiverId,
      user: {
        _id: message.user._id,
        name: message.user.name,
        avatar: message.user.avatar,
      },
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      {text.map(i => (
        <View key={i.id} style={{flex: 1}}>
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
              justifyContent: 'space-between',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/back.png')}
                style={{height: 30, width: 30}}
                resizeMode="stretch"
              />
            </TouchableOpacity>

            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
              {i.name}
            </Text>
            <Image
              source={require('../assets/three-dots.png')}
              style={{height: 30, width: 30}}
              resizeMode="stretch"
            />
          </View>

          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: senderId,
              avatar:avatar
            }}
          />
        </View>
      ))}
    </View>
  );
}

