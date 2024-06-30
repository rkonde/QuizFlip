import { Quiz } from "@/types/Quiz";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Creator: Quiz | undefined;
  Quiz: Quiz;
  Summary: { title: string; correctAnswers: number; incorrectAnswers: number };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
