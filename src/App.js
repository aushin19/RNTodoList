import React, { useState, useEffect } from "react";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Test from "./screens/Test";
import Colors from "./utils/Colors";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, StyleSheet } from "react-native";

// Redux imports
import { Provider } from 'react-redux';
import store from './redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = useState("Login");
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token") || null;

        if (token) {
          setInitialRouteName("Home");
        } else {
          setInitialRouteName("Login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        setInitialRouteName("Login");
      } finally {
        setIsLoading(false); // Set loading to false after token check, regardless of outcome
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return <LoadingScreen />; // Show loading screen while checking token
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false, statusBarStyle: "light" }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Test" component={Test} />
            <Stack.Screen name="Loading" component={LoadingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>

  );
};

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background
  }
});

export default App;