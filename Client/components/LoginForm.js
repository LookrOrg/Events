import React, { useState } from "react";
import { View, Text, Button, TextInput, Image, StyleSheet } from "react-native";

export default function LoginForm() {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image alt="Lookr Text Logo" />
      <View>
        <Text>Log in</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    witdh: "80%",
    backgroundColor: "gray"
  }
})
