import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LogoXP from "../../assets/logoxp.svg";
import EmailIcon from "../../assets/email.svg";

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

      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <LogoXP width={200} height={80} />
      </View>

      <Text style={styles.title}>Recuperar senha</Text>

      <View style={styles.card}>

        <Text style={styles.label}>E-mail</Text>

        <View style={styles.inputWrapper}>
          <EmailIcon width={18} height={18} style={styles.inputIcon} />
          <TextInput
            placeholder="Digite seu e-mail"
            placeholderTextColor="#8C94A7"
            style={styles.inputWithIcon}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("UpdatePassword")}
        >
          <Text style={styles.buttonText}>Continuar</Text>
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
  }

});
