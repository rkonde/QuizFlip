import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/Colors";
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
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={onEdit}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={onDelete}
          >
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
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.secondary,
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

  button: {
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },

  editButton: {
    backgroundColor: Colors.light.edit,
  },

  deleteButton: {
    backgroundColor: Colors.light.delete,
  },

  buttonText: {
    color: Colors.light.primary,
    fontSize: 14,
  },
});

export default QuizItem;
