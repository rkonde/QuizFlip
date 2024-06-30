import Quiz from "@/components/quiz/Quiz";

import Creator from "@/components/creator/Creator";
import Home from "@/components/home/Home";
import Summary from "@/components/summary/Summary";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Summary"
        component={Summary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Creator"
        component={Creator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
