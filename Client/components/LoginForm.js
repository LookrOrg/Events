import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../util/styles.js"

export default function LoginForm() {
  return (
    <View>
      <Text
        style={{
          fontSize: "32",
        }}
      >
        Log in
      </Text>
      <TextInput style = {styles.input}
      placeholder="example@gmail.com"></TextInput>
    </View>
  );
}


