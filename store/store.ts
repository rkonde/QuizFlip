// store.ts
import { Quiz } from "@/types/Quiz";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createTransform,
  persistReducer,
  persistStore,
} from "redux-persist";
import quizReducer from "./slices/quizSlice";

const rootPersistConfig = {
  key: "@quizFlip",
  storage: AsyncStorage,
};

const arrayTransformer = createTransform(
  (array: Quiz[]) => JSON.stringify(array),
  (arrayString) => JSON.parse(arrayString),
  { whitelist: ["quizzes"] }
);

const quizzesPersistConfig = {
  key: "quizzes",
  storage: AsyncStorage,
  transforms: [arrayTransformer],
};

const rootReducer = combineReducers({
  quizzes: persistReducer(quizzesPersistConfig, quizReducer),
});

export const persistedQuizzesReducer = persistReducer(
  rootPersistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedQuizzesReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
