import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Test from './components/test.js'
import LoginForm from './components/LoginForm.js'
import styles from "./util/styles.js"

export default function App() {
  return (
    <View style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <LoginForm/>
    </View>
  );
}