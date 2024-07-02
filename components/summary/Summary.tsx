import { Colors } from "@/constants/Colors";
import { RootStackScreenProps } from "@/navigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Summary = () => {
  const navigation = useNavigation();
  const {
    params: { title, correctAnswers, incorrectAnswers },
  } = useRoute<RootStackScreenProps<"Summary">["route"]>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.summaryText}>Correct Answers: {correctAnswers}</Text>
      <Text style={styles.summaryText}>Wrong Answers: {incorrectAnswers}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.light.primary,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  summaryText: {
    fontSize: 18,
    marginBottom: 8,
  },

  button: {
    padding: 16,
    backgroundColor: Colors.light.edit,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    width: "80%",
  },

  buttonText: {
    color: Colors.light.primary,
    fontSize: 18,
  },
});

export default Summary;
