import {
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Text,
  View,
  Pressable,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Colors from "../utils/Colors";

const Login = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    setModalVisible(true)

    setTimeout(()=>{
      setModalVisible(false)
      navigation.navigate("Signup")
    }, 2000)
  }

  return (
    <ScrollView
      style={{ width: "100%", backgroundColor: Colors.background }}
      contentContainerStyle={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          statusBarTranslucent={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello, this is a Modal!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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
          <Text style={{ color: "black", fontSize: 50, fontWeight: "bold" }}>
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

              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <Text
              style={{ color: "#505050", fontWeight: "600", marginTop: 30 }}
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
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
