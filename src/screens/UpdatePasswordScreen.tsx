import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updatePassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import LogoXP from "../../assets/logoxp.svg";
import LockIcon from "../../assets/lock.svg";
import EyeIcon from "../../assets/eye.svg";

export default function UpdatePasswordScreen() {

  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    setError("");

    if (!password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setError("Usuário não autenticado. Faça login novamente.");
      return;
    }

    setLoading(true);
    try {
      await updatePassword(user, password);
      navigation.navigate("Login" as never);
    } catch (e: any) {
      if (e.code === "auth/requires-recent-login") {
        setError("Sessão expirada. Faça login novamente para alterar a senha.");
      } else {
        setError("Erro ao atualizar a senha. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <LogoXP width={200} height={80} />
      </View>

      <Text style={styles.title}>Nova senha</Text>

      <View style={styles.card}>

        <Text style={styles.label}>Nova senha</Text>

        <View style={styles.inputWrapper}>
          <LockIcon width={18} height={18} style={styles.inputIcon} />
          <TextInput
            placeholder="Nova senha"
            placeholderTextColor="#8C94A7"
            style={styles.inputWithIcon}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <EyeIcon width={18} height={18} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirmar senha</Text>

        <View style={styles.inputWrapper}>
          <LockIcon width={18} height={18} style={styles.inputIcon} />
          <TextInput
            placeholder="Confirmar senha"
            placeholderTextColor="#8C94A7"
            style={styles.inputWithIcon}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <EyeIcon width={18} height={18} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleUpdatePassword} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Atualizando..." : "Atualizar senha"}</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#070B1A"
  },

  title: {
    fontSize: 28,
    color: "white",
    marginBottom: 25,
    textAlign: "center"
  },

  card: {
    backgroundColor: "#141833",
    borderRadius: 20,
    padding: 20,
  },

  label: {
    color: "#B8C1D1",
    marginBottom: 6,
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
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginBottom: 10,
  }

});
