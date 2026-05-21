import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect} from "react";
import { auth } from "../services/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RecoverPasswordScreen from "../screens/RecoverPasswordScreen";
import HomeScreen from "../screens/HomeScreen";

import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function Routes() {
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, setUser);

    return () => subscriber();
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
}
  