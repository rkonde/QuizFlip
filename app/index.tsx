import { Colors } from "@/constants/Colors";
import Navigation from "@/navigation/Navigation";
import { persistor, store } from "@/store/store";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer independent={true}>
          <GestureHandlerRootView style={styles.container}>
            <SafeAreaView style={styles.container}>
              <StatusBar backgroundColor={Colors.light.primary} style="dark" />
              <Navigation />
            </SafeAreaView>
          </GestureHandlerRootView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
