import { sampleQuizzes } from "@/constants/Quizzes";
import { Card } from "@/types/Card";
import { Quiz } from "@/types/Quiz";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store";

type QuizState = {
  quizzes: Quiz[];
};

const initialState: QuizState = {
  quizzes: sampleQuizzes,
};

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (
      state,
      action: PayloadAction<{ title: string; cards: Card[] }>
    ) => {
      state.quizzes.push({ id: uuidv4(), ...action.payload });
    },

    removeQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload
      );
    },

    editQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz.id === action.payload.id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
  },
});

export const { addQuiz, removeQuiz, editQuiz } = quizSlice.actions;

export const selectQuizzes = (state: RootState) => {
  return state.quizzes.quizzes;
};
export const selectQuiz = (quizId: string) => (state: RootState) => {
  return state.quizzes.quizzes.find((quiz) => quiz.id === quizId)!;
};

export default quizSlice.reducer;
