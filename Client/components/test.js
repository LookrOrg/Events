import React from 'react'
import {View, Text} from 'react-native'


export default function test(props) {
    console.log(props);
  return (
    <View style={{
        width: props.size,
        height: props.size,
        backgroundColor: "blue"
    }}>
        <Text>{props.text}</Text>
    </View>
  )
}
