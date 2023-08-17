import { View, Text, FlatList } from 'react-native'
import React from 'react'
import db from '../../db.json'

const User = () => {
  return (
    <View style={{flex:1}}>
      <ListUser />
    </View>
  )
}

function ListUser(){
    const RenderItem = ({item}) =>{
        return(
            <View style={{flex:1,justifyContent:'center',borderColor:'red',borderWidth:1}}>
                <Text>{item.account}</Text>
                <Text>{item.email}</Text>
                <Text>{item.name}</Text>
                <Text>{item.date}</Text>
                <Text>{item.address}</Text>
                <Text>{item.phone}</Text>
                <Text>{item.role}</Text>
                <Text>{item.sex}</Text>
            </View>
        )
    }
    return(
        <FlatList
        data={db.user}
        renderItem={RenderItem}
        keyExtractor={item => item.id} />
    )
}

export default User