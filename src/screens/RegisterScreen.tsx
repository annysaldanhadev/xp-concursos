import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScreen() {

  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await createUserWithEmailAndPassword(auth, email, password);

      console.log("Usuário criado!");

      navigation.navigate("Login" as never);

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Criar conta</Text>

      <Text style={styles.subtitle}>
        Preencha os campos abaixo para começar seus estudos
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>Nome Completo</Text>

        <TextInput
          placeholder="Digite seu nome"
          placeholderTextColor="#7A8597"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>E-mail</Text>

        <TextInput
          placeholder="seu@email.com"
          placeholderTextColor="#7A8597"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>

        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#7A8597"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

       <TouchableOpacity 
        style={styles.button}
        onPress={handleRegister}>
        <Text style={styles.buttonText}>Criar conta</Text>
      </TouchableOpacity>

      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login" as never)}
      >
        <Text style={styles.login}>
          Já possui uma conta? <Text style={styles.link}>Entre</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#070B1A",
    padding: 25,
    justifyContent: "center"
  },

  title: {
    color: "white",
    fontSize: 28,
    marginBottom: 5
  },

  subtitle: {
    color: "#9BA4B5",
    marginBottom: 25
  },

  card: {
    backgroundColor: "#141833",
    padding: 20,
    borderRadius: 20
  },

  label: {
    color: "#B8C1D1",
    marginBottom: 6
  },

  input: {
    backgroundColor: "#2A3142",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "white",
    marginBottom: 15
  },

  button: {
    backgroundColor: "#7C3AED",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },

  login: {
    color: "#B8C1D1",
    textAlign: "center",
    marginTop: 20
  },

  link: {
    color: "#8B5CF6"
  }

});