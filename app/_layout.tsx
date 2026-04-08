import { Stack } from "expo-router";
import { Provider } from "react-redux";
import "../global.css";
import store from "../Redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
