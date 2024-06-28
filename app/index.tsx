import FlipCard from "@/components/FlipCard";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [cards, setCards] = useState([
    { textFront: "Front 1", textBack: "Back 1" },
    { textFront: "Front 2", textBack: "Back 2" },
    { textFront: "Front 3", textBack: "Back 3" },
    { textFront: "Front 4", textBack: "Back 1" },
    { textFront: "Front 5", textBack: "Back 2" },
    { textFront: "Front 6", textBack: "Back 3" },
    { textFront: "Front 7", textBack: "Back 1" },
    { textFront: "Front 8", textBack: "Back 2" },
    { textFront: "Front 9", textBack: "Back 3" },
    { textFront: "Front 10", textBack: "Back 1" },
  ]);

  const handleSwipeRight = () => {
    console.log("swiped");
    setCards((prevCards) => prevCards.slice(1));
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.dark.background} />
        {cards
          .slice(0)
          .reverse()
          .map((card, index) => (
            <FlipCard
              key={index}
              frontText={card.textFront}
              backText={card.textBack}
              onComplete={handleSwipeRight}
            />
          ))}
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
