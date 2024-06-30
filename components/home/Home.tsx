import { Quiz } from "@/types/Quiz";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const quizzes = [
  {
    id: 1,
    title: "Math Quiz",
    cards: [
      { id: 1, front: "What is 2 + 2?", back: "4" },
      { id: 2, front: "What is 3 * 3?", back: "9" },
    ],
  },
  {
    id: 2,
    title: "Science Quiz",
    cards: [
      { id: 1, front: "What planet is known as the Red Planet?", back: "Mars" },
      { id: 2, front: "What is the chemical symbol for water?", back: "H2O" },
    ],
  },
  {
    id: 3,
    title: "History Quiz",
    cards: [
      {
        id: 1,
        front: "Who was the first President of the United States?",
        back: "George Washington",
      },
      { id: 2, front: "In which year did World War II end?", back: "1945" },
    ],
  },
  {
    id: 4,
    title: "Geography Quiz",
    cards: [
      { id: 1, front: "What is the capital of France?", back: "Paris" },
      {
        id: 2,
        front: "Which continent is the Sahara Desert located on?",
        back: "Africa",
      },
    ],
  },
  {
    id: 5,
    title: "Literature Quiz",
    cards: [
      {
        id: 1,
        front: 'Who wrote "Romeo and Juliet"?',
        back: "William Shakespeare",
      },
      {
        id: 2,
        front: "What is the title of the first Harry Potter book?",
        back: "Harry Potter and the Philosopher's Stone",
      },
    ],
  },
];

const Home = () => {
  const navigation = useNavigation();

  const renderQuizItem = ({ item }: { item: Quiz }) => (
    <TouchableOpacity
      style={styles.quizItem}
      onPress={() => navigation.navigate("Quiz", item)}
    >
      <View style={styles.quizHeader}>
        <Text style={styles.quizTitle}>{item.title}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("Creator")}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => console.log(item.title)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizzes</Text>
      <FlatList
        data={quizzes}
        renderItem={renderQuizItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No quizzes available</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Creator")}
      >
        <Text style={styles.addButtonText}>Create New Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  quizItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  editButton: {
    padding: 8,
    backgroundColor: "#007bff",
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "#ff4757",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  addButton: {
    padding: 16,
    backgroundColor: "#28a745",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
});

export default Home;
