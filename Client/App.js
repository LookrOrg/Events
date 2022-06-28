import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Test from "./components/test.js";
import LoginForm from "./components/LoginForm.js";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "react-query";

import { getTodos, postTodo } from "../my-api";

SecureStore.getItemAsync("lookertoken").then((token) => {
  if (!token) return;
  console.log("test");
  //IMPLEMENTARE LOGIN
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
