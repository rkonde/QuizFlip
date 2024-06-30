import { RootStackScreenProps } from "@/navigation/types";
import { Card } from "@/types/Card";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const QuizFormScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RootStackScreenProps<"Creator">["route"]>();

  const [quizTitle, setQuizTitle] = useState("");
  const [cards, setCards] = useState<Card[]>([]);

  //   useEffect(() => {
  //     if (quizId) {
  //       const quiz = quizzes.find(q => q.id === quizId);
  //       if (quiz) {
  //         setQuizTitle(quiz.title);
  //         setCards(quiz.cards);
  //       }
  //     }
  //   }, [quizId]);

  const handleAddCard = () => {
    setCards([...cards, { id: Date.now(), front: "", back: "" }]);
  };

  const handleRemoveCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleSaveQuiz = () => {
    // if (quizTitle && cards.length > 0) {
    //   if (quizId) {
    //     setQuizzes(quizzes.map(quiz => (quiz.id === quizId ? { ...quiz, title: quizTitle, cards } : quiz)));
    //   } else {
    //     setQuizzes([...quizzes, { id: Date.now(), title: quizTitle, cards }]);
    //   }
    //   navigation.goBack();
    // }
  };

  const handleCardChange = (
    id: number,
    field: "front" | "back",
    value: string
  ) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const renderCardItem = (card: Card) => (
    <View style={styles.cardItem} key={card.id}>
      <TextInput
        style={styles.cardInput}
        placeholder="Card Front"
        value={card.front}
        onChangeText={(text) => handleCardChange(card.id, "front", text)}
      />
      <TextInput
        style={styles.cardInput}
        placeholder="Card Back"
        value={card.back}
        onChangeText={(text) => handleCardChange(card.id, "back", text)}
      />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveCard(card.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {params?.id ? "Edit Quiz" : "Create New Quiz"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Quiz Title"
        value={quizTitle}
        onChangeText={setQuizTitle}
      />
      <ScrollView style={{ flex: 1 }}>
        {cards.length > 0 ? (
          cards.map((card) => {
            return renderCardItem(card);
          })
        ) : (
          <Text style={styles.emptyText}>No cards added yet</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.addButtonText}>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveQuiz}>
        <Text style={styles.saveButtonText}>
          {params?.id ? "Save Changes" : "Create Quiz"}
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
