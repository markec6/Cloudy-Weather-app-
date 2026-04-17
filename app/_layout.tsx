import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import "../global.css";
import store from "../Redux/store";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="newspage" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
}
