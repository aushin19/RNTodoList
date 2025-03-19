import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import Colors from "../utils/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://192.168.128.84:5000/auth/login", { // Replace with your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log("Login successful:", data);
        // Store token securely in AsyncStorage
        await AsyncStorage.setItem('token', data.token);
        navigation.navigate("Home"); // Navigate to Home screen

      } else {
        // Login failed
        console.error("Login failed:", data);
        Alert.alert("Error", data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error", "An error occurred during login. Please check your internet connection and try again.");
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
            Welcome,
          </Text>
          <Text style={{ color: Colors.font, fontSize: 50, fontWeight: "bold" }}>
            back!
          </Text>
          <Text
            style={{
              color: "#909090",
              fontSize: 12,
              fontWeight: "500",
              marginTop: 20,
            }}
          >
            Login in to access your to-dos and get start with your work today!
          </Text>
        </View>

        <View
          style={[
            styles.viewContainer,
            { flex: 2, justifyContent: "flex-start" },
          ]}
        >
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
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
              {loading ? "Logging In..." : "Login"}
              </Text>
            </Pressable>

            <Text
              style={{ color: Colors.font, fontWeight: "600", marginTop: 30 }}
            >
              Dont't have an account?{" "}
              <Pressable onPress={() => navigation.navigate("Signup")}>
                <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
                  Create an account
                </Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;

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
    color: Colors.font
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
    color: Colors.font,
    borderColor: Colors.borderStroke,
  },
  pressable: {
    alignItems: "center",
    padding: 20,
    width: "100%",
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.font,
    fontWeight: "bold",
    fontSize: 16,
  },

  centeredView: {
    backgroundColor: 'rgba(33, 33, 33, 0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: Colors.mainButtonColor,
  },
  buttonClose: {
    backgroundColor: Colors.mainButtonColor,
  },
  textStyle: {
    color: Colors.font,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});