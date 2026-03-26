import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

// SVG icons
import EmailIcon from "../../assets/email.svg";
import LockIcon from "../../assets/lock.svg";
import EyeIcon from "../../assets/eye.svg";
import GoogleIcon from "../../assets/google.svg";
import AppleIcon from "../../assets/apple.svg";
import LogoXp from "../../assets/logoxp.svg";

export default function LoginScreen() {
  return (
    <View style={styles.container}>

      {/* LOGO */}
      <LogoXp 
      width={170} 
      height={80} 
      style={styles.logo}
      />

      <View style={styles.card}>

        {/* EMAIL */}
        <Text style={styles.label}>E-mail</Text>

        <View style={styles.inputContainer}>
          <EmailIcon width={20} height={20} />

          <TextInput
            placeholder="seu@email.com"
            placeholderTextColor="#8A8F9A"
            style={styles.input}
          />
        </View>

        {/* SENHA */}
        <View style={styles.passwordRow}>
          <Text style={styles.label}>Senha</Text>
          <Text style={styles.forgot}>Esqueceu a senha?</Text>
        </View>

        <View style={styles.inputContainer}>
          <LockIcon width={20} height={20} />

          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#8A8F9A"
            secureTextEntry
            style={styles.input}
          />

          <EyeIcon width={20} height={20} />
        </View>

        {/* BOTÃO LOGIN */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>

        {/* DIVISOR */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>OU CONTINUE COM</Text>
          <View style={styles.line} />
        </View>

        {/* GOOGLE */}
        <TouchableOpacity style={styles.socialButton}>
          <GoogleIcon width={18} height={18} />
          <Text style={styles.socialText}> Continue com Google</Text>
        </TouchableOpacity>

        {/* APPLE */}
        <TouchableOpacity style={styles.socialButton}>
          <AppleIcon width={18} height={18} />
          <Text style={styles.socialText}> Continue com Apple</Text>
        </TouchableOpacity>

      </View>

      {/* CADASTRO */}
      <View style={styles.registerRow}>
        <Text style={styles.registerText}>Não tem conta?</Text>
        <Text style={styles.registerLink}> Cadastre-se</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0B0D17",
    alignItems: "center",
    paddingTop: 120,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },

  card: {
    width: "85%",
    backgroundColor: "#15182B",
    borderRadius: 20,
    padding: 20,
  },

  label: {
    color: "#BFC5D2",
    marginBottom: 6,
    fontSize: 13,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2F3C",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 15,
    gap: 8,
  },

  input: {
    flex: 1,
    color: "white",
  },

  passwordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  forgot: {
    color: "#8B5CF6",
    fontSize: 12,
  },

  loginButton: {
    marginTop: 10,
    backgroundColor: "#7C3AED",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  dividerText: {
    color: "#6B7280",
    fontSize: 12,
    marginHorizontal: 10,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#2F3445",
  },

  socialButton: {
    height: 44,
    backgroundColor: "#2A2F3C",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },

  socialText: {
    color: "white",
  },

  registerRow: {
    flexDirection: "row",
    marginTop: 20,
  },

  registerText: {
    color: "#BFC5D2",
  },

  registerLink: {
    color: "#8B5CF6",
    fontWeight: "600",
  },

  logo: {
    marginBottom: 30,
  },

});