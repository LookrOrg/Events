import React, { useState } from "react";
import { flushSync } from "react-dom";
import { View, Text, Button, TextInput, Image, StyleSheet } from "react-native";
import styles from "../App.module.css";

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
        borderWidth: 1,
        borderColor: "red",
      }}
    >
      <Image alt="Lookr Text Logo" />
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "lime",
        }}
      >
        <Text>Log in</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
        ></TextInput>
      </View>
      <View>
        <Text
          style={{
            fontSize: 44,
          }}
        >
          or
        </Text>
        <View>
          <Text>Register</Text>
          <Text>a new account</Text>
        </View>
      </View>
    </View>
  );
}
