import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import LogoXP from "../../assets/logoxp.svg";
import EmailIcon from "../../assets/email.svg";
import LockIcon from "../../assets/lock.svg";
import EyeIcon from "../../assets/eye.svg";

export default function RegisterScreen() {

  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("Preencha todos os campos para se cadastrar.");
      return;
    }

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

      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <LogoXP width={200} height={80} />
      </View>

      <Text style={styles.title}>Criar conta</Text>

      <Text style={styles.subtitle}>
        Preencha os campos abaixo para começar seus estudos
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>Nome Completo</Text>

        <View style={styles.inputWrapper}>
          <EmailIcon width={18} height={18} style={styles.inputIcon} />
          <TextInput
            placeholder="Digite seu nome"
            placeholderTextColor="#7A8597"
            style={styles.inputWithIcon}
            value={name}
            onChangeText={setName}
          />
        </View>

        <Text style={styles.label}>E-mail</Text>

        <View style={styles.inputWrapper}>
          <EmailIcon width={18} height={18} style={styles.inputIcon} />
          <TextInput
            placeholder="seu@email.com"
            placeholderTextColor="#7A8597"
            style={styles.inputWithIcon}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text style={styles.label}>Senha</Text>

        <View style={styles.inputWrapper}>
          <LockIcon width={18} height={18} style={styles.inputIcon} />
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#7A8597"
            secureTextEntry={!showPassword}
            style={styles.inputWithIcon}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <EyeIcon width={18} height={18} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

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

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A3142",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },

  inputIcon: {
    marginRight: 10,
  },

  inputWithIcon: {
    flex: 1,
    color: "white",
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
  },

  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginBottom: 10,
  }

});
