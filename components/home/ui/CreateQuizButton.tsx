import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type CreateQuizButtonProps = {
  onPress: () => void;
};

const CreateQuizButton = ({ onPress }: CreateQuizButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>Create Quiz</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.light.confirm,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },

  text: {
    color: Colors.light.primary,
    fontSize: 18,
  },
});

export default CreateQuizButton;
