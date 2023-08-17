import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'


const Notification = ({navigation}) => {

    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'blue'}}>
   
          <Text style={{fontSize:40,color:'white'}}>CHƯA CÓ THÔNG BÁO</Text>
     
          {/* <TouchableOpacity onPress={()=>Getdata()}><Text style={{color:'white'}}>data</Text></TouchableOpacity> */}
         
        </View>
      )
    }

export default Notification