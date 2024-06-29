import FlipCard from "@/components/FlipCard";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [correctAmount, setCorrectAmount] = useState(0);
  const [wrongAmount, setWrongAmount] = useState(0);

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
    handleSwipe();
    setCorrectAmount((correctAmount) => ++correctAmount);
  };

  const handleSwipeLeft = () => {
    handleSwipe();

    setWrongAmount((wrongAmount) => ++wrongAmount);
  };

  const handleSwipe = () => {
    setCards((prevCards) => prevCards.slice(1));
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.dark.background} />
        <View style={styles.container}>
          <View style={styles.container}>
            {cards
              .slice(0)
              .reverse()
              .map((card, index) => (
                <FlipCard
                  key={index}
                  frontText={card.textFront}
                  backText={card.textBack}
                  onComplete={handleSwipeRight}
                  onWrong={handleSwipeLeft}
                  index={cards.length - 1 - index}
                />
              ))}
          </View>
          <View style={{ padding: 8 }}>
            <Text>Corret: {correctAmount}</Text>
            <Text>Wrong: {wrongAmount}</Text>
          </View>
        </View>
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
