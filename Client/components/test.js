import React, {useState} from 'react'
import {View, Text, Button, TextInput } from 'react-native'


export default function test(props) {
  const [state, setState] = useState({
    count: 0,
    username: "",
    password: ""
  });
  return (
    <View style={{
        width: props.size,
        height: props.size,
    }}>
        <Button title="Increment" onPress={() => setState({
          ...state,
          count: state.count + 1})}/>
        <Button title="Decrement" onPress={() => setState({...state,
          count: state.count - 1})}/>
        <TextInput placeholder='example@test.sus' onChangeText={(text) => setState({
          ...state,
          username: text})}/>
        <Text>{state.count}</Text>
        <Text>{state.username}</Text>
    </View>
  )
}
