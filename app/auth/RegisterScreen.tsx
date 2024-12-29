import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import API_URL from "../../config/config";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        username,
        password,
        email,
      });
      Alert.alert("Registration Successful", "You can now log in");
      router.replace("/auth/LoginScreen");
    } catch (error) {
      Alert.alert("Registration Failed", (error as any).response?.data?.message || "An error occurred");
    }
  };

  const isDarkMode = colorScheme === "dark";
  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.header}> 
        <Image
          source={require("../../assets/images/omak.jpg")}
          style={styles.image}
        />
        <Text style={[styles.title, themeStyles.text]}>Create an Account</Text>
        <Text style={[styles.subtitle, themeStyles.text]}>Join us and get started</Text>
      </View>

      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Username"
        placeholderTextColor={themeStyles.placeholder.color}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Email"
        placeholderTextColor={themeStyles.placeholder.color}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Password"
        placeholderTextColor={themeStyles.placeholder.color}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.registerButton, themeStyles.button]}
        onPress={handleRegister}
      >
        <Text style={[styles.registerButtonText, themeStyles.text]}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backButton, themeStyles.button]}
        onPress={() => router.replace("/auth/LoginScreen")}
      >
        <Text style={[styles.backButtonText, themeStyles.text]}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    paddingTop: 50,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  registerButton: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
  },
  text: {
    color: "#ffffff",
  },
  input: {
    backgroundColor: "#1e1e1e",
    borderColor: "#ffffff",
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#333333",
    borderColor: "#ffffff",
  },
  placeholder: {
    color: "#aaaaaa",
  },
});

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  text: {
    color: "#000000",
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    color: "#000000",
  },
  button: {
    backgroundColor: "#dddddd",
    borderColor: "#000000",
  },
  placeholder: {
    color: "#666666",
  },
});
