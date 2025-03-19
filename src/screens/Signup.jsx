import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Pressable,
  ScrollView,
  Alert
} from "react-native";
import React, { useState } from "react";
import Colors from "../utils/Colors";

const Signup = ({ navigation }) => {
  const API_URL = "https://rntodobackend.onrender.com"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please enter all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, { // Replace with your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful
        console.log("Signup successful:", data);
        Alert.alert("Success", "Signup Successful! You can now login")
        navigation.navigate("Login"); // Navigate to Login screen
      } else {
        // Signup failed
        console.error("Signup failed:", data);
        Alert.alert("Error", data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Alert.alert("Error", "An error occurred during signup. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ width: "100%", backgroundColor: Colors.background }}
      contentContainerStyle={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.viewContainer,
            { alignItems: "flex-start", padding: 30 },
          ]}
        >
          <Text
            style={{ color: Colors.primary, fontSize: 50, fontWeight: "bold" }}
          >
            Hello,
          </Text>
          <Text style={{ color: Colors.font, fontSize: 50, fontWeight: "bold" }}>
            there!
          </Text>
          <Text
            style={{
              color: "#909090",
              fontSize: 12,
              fontWeight: "500",
              marginTop: 20,
            }}
          >
            Create an account to access your to-dos and get start with your work
            today!
          </Text>
        </View>

        <View
          style={[
            styles.viewContainer,
            { flex: 2, justifyContent: "flex-start" },
          ]}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="John Doe"
              placeholderTextColor="#909090"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              placeholder="john.doe@gmail.com"
              placeholderTextColor="#909090"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="••••••••••••••••"
              placeholderTextColor="#909090"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={[styles.inputContainer, { marginTop: 50 }]}>
            <Pressable
              style={({ pressed }) => [
                styles.pressable,
                { backgroundColor: pressed ? Colors.mainButtonColor : Colors.mainButtonColor },
              ]}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Signing Up..." : "Signup"}
              </Text>
            </Pressable>

            <Text
              style={{ color: Colors.font, fontWeight: "600", marginTop: 30 }}
            >
              Already have an account?{" "}
              <Pressable onPress={() => navigation.goBack()}>
                <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
                  Login
                </Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  text: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
    color: Colors.font
  },
  textInput: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    padding: 15,
    borderColor: Colors.borderStroke,
    color: Colors.font
  },
  pressable: {
    alignItems: "center",
    padding: 20,
    width: "100%",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});