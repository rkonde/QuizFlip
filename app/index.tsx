import FlipCard from "@/components/FlipCard";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.dark.background} />
        <FlipCard />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
