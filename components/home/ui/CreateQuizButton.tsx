import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type CreateQuizButtonProps = {
  onPress: () => void;
};

const CreateQuizButton = ({ onPress }: CreateQuizButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>Create New Quiz</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#28a745",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },

  text: {
    color: "#fff",
    fontSize: 18,
  },
});

export default CreateQuizButton;
