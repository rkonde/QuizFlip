import React from "react";
import { StyleSheet, Text } from "react-native";

const NoQuizzes = () => {
  return <Text style={styles.text}>No quizzes available</Text>;
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
});

export default NoQuizzes;
