import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

type FrontBackInputProps = {
  front: string;
  onFrontInputChange: (text: string) => void;
  back: string;
  onBackInputChange: (text: string) => void;
  onDelete: () => void;
};

const FrontBackInput = ({
  front,
  onFrontInputChange,
  back,
  onBackInputChange,
  onDelete,
}: FrontBackInputProps) => {
  return (
    <Animated.View
      style={styles.cardItem}
      entering={FadeInDown}
      exiting={FadeInUp}
    >
      <TextInput
        style={styles.cardInput}
        placeholder="Card Front"
        value={front}
        onChangeText={onFrontInputChange}
      />
      <TextInput
        style={styles.cardInput}
        placeholder="Card Back"
        value={back}
        onChangeText={onBackInputChange}
      />
      <TouchableOpacity style={styles.removeButton} onPress={onDelete}>
        <Text style={styles.removeButtonText}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: Colors.light.primary,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  input: {
    height: 40,
    borderColor: Colors.light.secondary,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },

  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },

  cardInput: {
    flex: 1,
    height: 40,
    borderColor: Colors.light.secondary,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },

  removeButton: {
    backgroundColor: Colors.light.delete,
    padding: 8,
    borderRadius: 4,
  },

  removeButtonText: {
    color: Colors.light.primary,
    fontSize: 14,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 8,
  },

  addButton: {
    padding: 16,
    backgroundColor: Colors.light.edit,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },

  addButtonText: {
    color: Colors.light.primary,
    fontSize: 18,
  },

  saveButton: {
    padding: 16,
    backgroundColor: Colors.light.confirm,
    borderRadius: 8,
    alignItems: "center",
  },

  saveButtonText: {
    color: Colors.light.primary,
    fontSize: 18,
  },
});

export default FrontBackInput;
