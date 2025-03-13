import {
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import Colors from "../utils/Colors";

const Signup = ({navigation}) => {
  return (
    <ScrollView style={{ width: "100%", backgroundColor: Colors.background }} contentContainerStyle={{ flex: 1 }}>
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
          <Text style={{ color: "black", fontSize: 50, fontWeight: "bold" }}>
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
            <TextInput style={styles.textInput} placeholder="John Doe" />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              placeholder="john.doe@gmail.com"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="••••••••••••••••"
              secureTextEntry={true}
            />
          </View>

          <View style={[styles.inputContainer, { marginTop: 50 }]}>
            <Pressable
              style={({ pressed }) => [
                styles.pressable,
                { backgroundColor: pressed ? "#f68181" : "#f22a2a" },
              ]}
            >
              <Text style={styles.buttonText}>Signup</Text>
            </Pressable>

            <Text
              style={{ color: "#505050", fontWeight: "600", marginTop: 30 }}
            >
              Already have an account?{" "}
              <Pressable onPress={() => navigation.goBack()}>
                <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
                  Signup
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
  },
  textInput: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    padding: 15,
    borderColor: Colors.borderStroke,
  },
  pressable: {
    alignItems: "center",
    backgroundColor: "green",
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
