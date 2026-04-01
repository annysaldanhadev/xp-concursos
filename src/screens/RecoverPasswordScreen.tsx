import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types/navigation";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "RecoverPassword"
>;

export default function RecoverPasswordScreen() {

  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Recuperar senha</Text>

      <TextInput
        placeholder="Digite seu e-mail"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UpdatePassword")}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#0B0D17"
  },

  title: {
    fontSize: 26,
    color: "white",
    marginBottom: 30,
    textAlign: "center"
  },

  input: {
    backgroundColor: "#1F2430",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "white",
    marginBottom: 15
  },

  button: {
    backgroundColor: "#7C3AED",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    fontWeight: "600"
  }

});