import { Colors } from "@/constants/Colors";
import { RootStackScreenProps } from "@/navigation/types";
import { addQuiz, editQuiz, selectQuizzes } from "@/store/slices/quizSlice";
import { Card } from "@/types/Card";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FrontBackInput from "./ui/FrontBackInput";

const QuizFormScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RootStackScreenProps<"Creator">["route"]>();

  const quizzes = useSelector(selectQuizzes);

  const [title, setTitle] = useState("");
  const [cards, setCards] = useState<Card[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (params?.quizId) {
      const quiz = quizzes.find((quiz) => quiz.id === params.quizId);

      if (quiz) {
        setTitle(quiz.title);
        setCards(quiz.cards);
      }
    }
  }, []);

  const onAddCard = () => {
    setCards([...cards, { front: "", back: "" }]);
  };

  const onDeleteCard = (cardIndex: number) => {
    setCards(cards.filter((card, index) => index !== cardIndex));
  };

  const onSaveQuiz = () => {
    if (params?.quizId) {
      dispatch(editQuiz({ id: params.quizId, title, cards }));
    } else {
      dispatch(addQuiz({ title, cards }));
    }

    navigation.navigate("Home");
  };

  const onCardChange = (
    cardIndex: number,
    field: "front" | "back",
    value: string
  ) => {
    setCards(
      cards.map((card, index) =>
        index === cardIndex ? { ...card, [field]: value } : card
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {params?.quizId ? "Edit Quiz" : "Create New Quiz"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Quiz Title"
        value={title}
        onChangeText={setTitle}
      />
      <ScrollView style={{ flex: 1 }}>
        {cards.length > 0 ? (
          cards.map((card, index) => {
            return (
              <FrontBackInput
                key={index}
                front={card.front}
                onFrontInputChange={(text) =>
                  onCardChange(index, "front", text)
                }
                back={card.back}
                onBackInputChange={(text) => onCardChange(index, "back", text)}
                onDelete={() => onDeleteCard(index)}
              />
            );
          })
        ) : (
          <Text style={styles.emptyText}>No cards added yet</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={onAddCard}>
        <Text style={styles.addButtonText}>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.saveButton,
          title.length === 0 && { backgroundColor: Colors.light.secondary },
        ]}
        onPress={onSaveQuiz}
        disabled={title.length === 0}
      >
        <Text style={styles.saveButtonText}>
          {params?.quizId ? "Save Changes" : "Create Quiz"}
        </Text>
      </TouchableOpacity>
    </View>
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

export default QuizFormScreen;
