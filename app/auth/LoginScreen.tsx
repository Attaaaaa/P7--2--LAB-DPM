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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import API_URL from "../../config/config";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });
      const { token } = response.data.data;
      await AsyncStorage.setItem("token", token);
      router.replace("/(tabs)"); // Prevent back navigation to login
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message || "An error occurred";
      Alert.alert("Login Failed", errorMessage);
    }
  };

  const isDarkMode = colorScheme === "dark";
  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemedView style={[styles.container, themeStyles.container]}>
      <Image
        source={require("../../assets/images/omak.jpg")}
        style={styles.logo}
      />
      <Text style={[styles.title, themeStyles.text]}>Welcome Back!</Text>
      <Text style={[styles.subtitle, themeStyles.text]}>Log in to continue</Text>
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
        placeholder="Password"
        placeholderTextColor={themeStyles.placeholder.color}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.loginButton, themeStyles.button]}
        onPress={handleLogin}
      >
        <Text style={[styles.loginButtonText, themeStyles.text]}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.registerButton, themeStyles.button]}
        onPress={() => router.push("/auth/RegisterScreen")}
      >
        <Text style={[styles.registerButtonText, themeStyles.text]}>Register</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  registerButton: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  loginButton: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
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
