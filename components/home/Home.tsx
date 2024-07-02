import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CreateQuizButton from "@/components/home/ui/CreateQuizButton";
import QuizItem from "@/components/home/ui/QuizItem";
import { Colors } from "@/constants/Colors";
import { removeQuiz, selectQuizzes } from "@/store/slices/quizSlice";

const Home = () => {
  const navigation = useNavigation();

  const quizzes = useSelector(selectQuizzes);

  const dispatch = useDispatch();

  const onQuizPress = (quizId: string) => {
    navigation.navigate("Quiz", { quizId });
  };

  const onQuizEdit = (quizId: string) => {
    navigation.navigate("Creator", { quizId });
  };

  const onQuizDelete = (quizId: string) => {
    dispatch(removeQuiz(quizId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizzes</Text>
      <FlatList
        data={quizzes}
        renderItem={({ item }) => (
          <QuizItem
            quiz={item}
            onPress={() => onQuizPress(item.id)}
            onEdit={() => onQuizEdit(item.id)}
            onDelete={() => onQuizDelete(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.text}>No quizzes available</Text>
        }
      />
      <CreateQuizButton onPress={() => navigation.navigate("Creator")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.light.primary,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  text: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: Colors.light.secondary,
  },
});

export default Home;
