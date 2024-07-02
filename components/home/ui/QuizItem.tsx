import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Quiz } from "@/types/Quiz";

type QuizItemProps = {
  quiz: Quiz;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const QuizItem = ({ quiz, onPress, onEdit, onDelete }: QuizItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{quiz.title}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },

  editButton: {
    padding: 8,
    backgroundColor: "#007bff",
    borderRadius: 4,
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
});

export default QuizItem;
