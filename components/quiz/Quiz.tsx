import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import FlipCard from "@/components/quiz/ui/FlipCard";
import { RootStackScreenProps } from "@/navigation/types";
import { Card } from "@/types/Card";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function Quiz() {
  const navigation = useNavigation();
  const {
    params: { title, cards },
  } = useRoute<RootStackScreenProps<"Quiz">["route"]>();

  const [correctAmount, setCorrectAmount] = useState(0);
  const [wrongAmount, setWrongAmount] = useState(0);

  const [quizCards, setQuizCards] = useState<Card[]>(cards);

  const handleSwipeRight = () => {
    handleSwipe();
    setCorrectAmount((correctAmount) => correctAmount + 1);
  };

  const handleSwipeLeft = () => {
    handleSwipe();

    setWrongAmount((wrongAmount) => wrongAmount + 1);
  };

  const handleSwipe = () => {
    setQuizCards((quizCards) => quizCards.slice(1));
  };

  useEffect(() => {
    if (
      quizCards.length === 0 &&
      correctAmount + wrongAmount === cards.length
    ) {
      navigation.navigate("Summary", {
        title: title,
        correctAnswers: correctAmount,
        incorrectAnswers: wrongAmount,
      });
    }
  }, [quizCards, correctAmount, wrongAmount]);

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.container}>
        {quizCards
          .slice(0)
          .reverse()
          .map((card, index) => (
            <FlipCard
              key={index}
              frontText={card.front}
              backText={card.back}
              onComplete={handleSwipeRight}
              onWrong={handleSwipeLeft}
              index={quizCards.length - 1 - index}
            />
          ))}
      </View>
      <View style={{ padding: 8 }}>
        <Text>Corret: {correctAmount}</Text>
        <Text>Wrong: {wrongAmount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
