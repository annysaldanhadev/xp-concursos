import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function UpdatePasswordScreen() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Nova senha</Text>

      <TextInput
        placeholder="Nova senha"
        placeholderTextColor="#999"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirmar senha"
        placeholderTextColor="#999"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Atualizar senha</Text>
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