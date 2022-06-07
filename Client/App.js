import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Test from './components/test.js'
import styles from "./util/styles.js"

export default function App() {
  return (
    <View>
      <Test size={100} text="ciao" />
    </View>
  );
}