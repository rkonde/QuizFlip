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

  const handleAddCard = () => {
    setCards([...cards, { front: "", back: "" }]);
  };

  const handleRemoveCard = (cardIndex: number) => {
    setCards(cards.filter((card, index) => index !== cardIndex));
  };

  const handleSaveQuiz = () => {
    if (params?.quizId) {
      dispatch(editQuiz({ id: params.quizId, title, cards }));
    } else {
      dispatch(addQuiz({ title, cards }));
    }

    navigation.navigate("Home");
  };

  const handleCardChange = (
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

  const renderCardItem = (card: Card, cardIndex: number) => (
    <View style={styles.cardItem} key={cardIndex}>
      <TextInput
        style={styles.cardInput}
        placeholder="Card Front"
        value={card.front}
        onChangeText={(text) => handleCardChange(cardIndex, "front", text)}
      />
      <TextInput
        style={styles.cardInput}
        placeholder="Card Back"
        value={card.back}
        onChangeText={(text) => handleCardChange(cardIndex, "back", text)}
      />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveCard(cardIndex)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

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
            return renderCardItem(card, index);
          })
        ) : (
          <Text style={styles.emptyText}>No cards added yet</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.addButtonText}>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.saveButton,
          title.length === 0 && { backgroundColor: "#5e5e5e" },
        ]}
        onPress={handleSaveQuiz}
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
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
  },
  cardInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginBottom: 8,
  },
  addButton: {
    padding: 16,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  saveButton: {
    padding: 16,
    backgroundColor: "#28a745",
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default QuizFormScreen;
