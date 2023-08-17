import {launchImageLibrary} from 'react-native-image-picker';
import React ,{useState}from 'react';
import { TouchableOpacity, } from 'react-native';
import {Avatar, TextInput, Button} from 'react-native-paper';


function ImagePickerButton ({imageUri,setImageUri}) {

  const handlePickImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 400,
      maxWidth: 400,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const res = response.assets[0].uri;
        setImageUri(res);
      }
    });
  };

  return (
    <TouchableOpacity style={{ backgroundColor: 'white' ,marginVertical:5,borderRadius:50}} onPress={handlePickImage}>
      <Avatar.Image size={80} source={{ uri: imageUri }}/>
    </TouchableOpacity>
  );
};

export default ImagePickerButton;