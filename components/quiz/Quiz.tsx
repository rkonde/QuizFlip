import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import FlipCard from "@/components/quiz/ui/FlipCard";
import { RootStackScreenProps } from "@/navigation/types";
import { selectQuiz } from "@/store/slices/quizSlice";
import { Card } from "@/types/Card";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
export default function Quiz() {
  const navigation = useNavigation();
  const {
    params: { quizId },
  } = useRoute<RootStackScreenProps<"Quiz">["route"]>();

  const quiz = useSelector(selectQuiz(quizId));

  const [correctAmount, setCorrectAmount] = useState(0);
  const [wrongAmount, setWrongAmount] = useState(0);

  const [quizCards, setQuizCards] = useState<Card[]>(quiz.cards);

  const correctTranslationY = useSharedValue(0);
  const wrongTranslationY = useSharedValue(0);

  const correctTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: correctTranslationY.value,
        },
      ],
    };
  });

  const wrongTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: wrongTranslationY.value,
        },
      ],
    };
  });

  useEffect(() => {
    correctTranslationY.value = withSequence(withTiming(-10), withSpring(0));
  }, [correctAmount]);

  useEffect(() => {
    wrongTranslationY.value = withSequence(withTiming(-10), withSpring(0));
  }, [wrongAmount]);

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
      correctAmount + wrongAmount === quiz.cards.length
    ) {
      setTimeout(() => {
        navigation.navigate("Summary", {
          title: quiz.title,
          correctAnswers: correctAmount,
          incorrectAnswers: wrongAmount,
        });
      }, 750);
    }
  }, [quizCards, correctAmount, wrongAmount]);

  return (
    <View style={styles.container}>
      <Text>{quiz.title}</Text>
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
      <View style={{ padding: 8, flexDirection: "row", gap: 16 }}>
        <Animated.Text style={correctTextAnimatedStyle}>
          Corret: {correctAmount}
        </Animated.Text>
        <Animated.Text style={wrongTextAnimatedStyle}>
          Wrong: {wrongAmount}
        </Animated.Text>
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
