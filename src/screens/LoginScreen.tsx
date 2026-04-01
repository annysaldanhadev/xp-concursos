import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet
} from "react-native";
import LogoXP from "../../assets/logoxp.svg";
import EmailIcon from "../../assets/email.svg";
import LockIcon from "../../assets/lock.svg";
import EyeIcon from "../../assets/eye.svg";
import GoogleIcon from "../../assets/google.svg";
import AppleIcon from "../../assets/apple.svg";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProps = NativeStackNavigationProp<
  {
    Login: undefined;
    Register: undefined;
    RecoverPassword: undefined;
    UpdatePassword: undefined;
  },
  "Login"
>;
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export default function LoginScreen() {

  const navigation = useNavigation<NavigationProps>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Login");
    } catch (e: any) {
      if (e.code === "auth/invalid-credential" || e.code === "auth/wrong-password") {
        setError("E-mail ou senha incorretos.");
      } else if (e.code === "auth/user-not-found") {
        setError("Nenhuma conta encontrada com esse e-mail.");
      } else if (e.code === "auth/too-many-requests") {
        setError("Muitas tentativas. Tente novamente mais tarde.");
      } else {
        setError("Erro ao entrar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* LOGO */}

      <View style={{ alignItems: "center", marginBottom: 30 }}>
      <LogoXP width={200} height={80} />
      </View>

      <Text style={styles.title}>Login</Text>

      {/* CARD */}
      <View style={styles.card}>

        <Text style={styles.label}>E-mail</Text>

        <View style={styles.inputWrapper}>
          <EmailIcon width={18} height={18} style={styles.inputIcon} />
          <TextInput
            placeholder="seu@email.com"
            placeholderTextColor="#8C94A7"
            style={styles.inputWithIcon}
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />
        </View>

        <View style={styles.passwordHeader}>
          <Text style={styles.label}>Senha</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("RecoverPassword")}
          >
            <Text style={styles.link}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <LockIcon width={18} height={18} style={styles.inputIcon} />
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#8C94A7"
            secureTextEntry={!showPassword}
            style={styles.inputWithIcon}
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <EyeIcon width={18} height={18} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* BOTÃO LOGIN */}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Entrando..." : "Entrar"}</Text>
        </TouchableOpacity>

        {/* DIVISOR */}

        <Text style={styles.divider}>OU CONTINUE COM</Text>

        {/* GOOGLE */}

        <TouchableOpacity style={styles.socialButton} disabled={loading}>
          <GoogleIcon width={20} height={20} />
          <Text style={styles.socialText}>Continue com Google</Text>
        </TouchableOpacity>

        {/* APPLE */}

        <TouchableOpacity style={styles.socialButton} disabled={loading}>
          <AppleIcon width={20} height={20} />
          <Text style={styles.socialText}>Continue com Apple</Text>
        </TouchableOpacity>

      </View>

      {/* CADASTRO */}

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        disabled={loading}
      >

        <Text style={styles.register}>
          Não tem conta? <Text style={styles.registerLink}>Cadastre-se</Text>
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#070B1A",
    justifyContent: "center",
    padding: 25
  },

  logo: {
    color: "white",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold"
  },

  title: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 25
  },

  card: {
    backgroundColor: "#141833",
    borderRadius: 20,
    padding: 20
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

  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  link: {
    color: "#8B5CF6"
  },

  button: {
    backgroundColor: "#7C3AED",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },

  buttonDisabled: {
    opacity: 0.6
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },

  divider: {
    textAlign: "center",
    color: "#8C94A7",
    marginVertical: 18,
    fontSize: 12
  },

  socialButton: {
    backgroundColor: "#2A3142",
    height: 45,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },

  socialText: {
    color: "white"
  },

  register: {
    color: "#B8C1D1",
    textAlign: "center",
    marginTop: 25
  },

  registerLink: {
    color: "#8B5CF6"
  },

  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginBottom: 10,
  }

});