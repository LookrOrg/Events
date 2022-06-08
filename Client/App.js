import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Test from "./components/test.js";
import LoginForm from "./components/LoginForm.js";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import * as SecureStore from "expo-secure-store";

SecureStore.getItemAsync("lookertoken").then((token) => {
  if (!token) return;
  console.log("test");
  //IMPLEMENTARE LOGIN
});

export default function App() {
  return (
    <Provider store={store}>
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoginForm />
      </View>
    </Provider>
  );
}
