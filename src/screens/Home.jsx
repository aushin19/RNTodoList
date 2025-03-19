import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Pressable,
  ActivityIndicator,
  Alert,
  Modal,
  RefreshControl
} from 'react-native';
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Todo from '../components/Todo';
import Colors from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddTaskBottomsheet from '../modals/AddTaskBottomsheet';
import EditTaskBottomsheet from '../modals/EditTaskBottomsheet';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Home = ({ navigation }) => {
  const API_URL = "https://rntodobackend.onrender.com"
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddTaskLoading, setIsAddTaskLoading] = useState(false);
  const [isEditTaskLoading, setIsEditTaskLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      dispatch(logout());

      navigation.navigate("Login");
      Alert.alert("Success", "Logged out successfully!");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "An error occurred during logout.");
    }
  };

  const handleAddTask = async (taskData) => {
    if (!taskData.title) {
      Alert.alert("Error", "Please enter a task title.");
      return;
    }

    setIsAddTaskLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        navigation.navigate("Login");
        return;
      }

      const response = await fetch(`${API_URL}/tasks`, {  // Use API_URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTodos((prevTodos) => [...prevTodos, newTask]);
        handleCloseAddTaskModal()
        Alert.alert("Success", "Task added successfully!");
        loadTasks();
      } else {
        const data = await response.json();
        console.error("Error creating task:", data);
        Alert.alert("Error", data.message || "Failed to create task.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      Alert.alert("Error", "An error occurred while creating the task.");
    } finally {
      setIsAddTaskLoading(false);
    }
  };

  const handleEditTask = async (taskData) => {
    if (!taskData.title) {
      Alert.alert("Error", "Please enter a task title.");
      return;
    }

    setIsEditTaskLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        navigation.navigate("Login");
        return;
      }

      const response = await fetch(`${API_URL}/tasks/${taskData._id}`, {   // Use API_URL
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ title: taskData.title, description: taskData.description }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === updatedTask._id ? updatedTask : todo))
        );

        handleCloseEditTaskModal();
        Alert.alert("Success", "Task updated successfully!");
        loadTasks();
      } else {
        const data = await response.json();
        console.error("Error updating task:", data);
        Alert.alert("Error", data.message || "Failed to update task.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      Alert.alert("Error", "An error occurred while updating the task.");
    } finally {
      setIsEditTaskLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        navigation.navigate("Login");
        return;
      }

      const response = await fetch(`${API_URL}/tasks/${taskId}`, {  // Use API_URL
        method: "DELETE",
        headers: {
          "x-auth-token": token,
        },
      });

      if (response.ok) {
        // Update the state by removing the deleted task
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== taskId));
        Alert.alert("Success", "Task deleted successfully!");
      } else {
        const data = await response.json();
        console.error("Error deleting task:", data);
        Alert.alert("Error", data.message || "Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      Alert.alert("Error", "An error occurred while deleting the task.");
    }
  };

  const handleOpenAddTaskModal = () => {
    console.log("FAB Pressed")
    setAddTaskModalVisible(true);
  };

  const handleCloseAddTaskModal = () => {
    setAddTaskModalVisible(false);
  };

  const handleOpenEditTaskModal = (item) => {
    setSelectedTask(item);
    setEditTaskModalVisible(true);
  };

  const handleCloseEditTaskModal = () => {
    setSelectedTask(null);
    setEditTaskModalVisible(false);
  };

  const loadTasks = async () => {
    setLoading(true);
    setRefreshing(true); // Set refreshing to true when loadTasks starts

    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        navigation.navigate('Login');
        return;
      }

      const response = await fetch(`${API_URL}/tasks`, {  // Use API_URL
        method: 'GET',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      } else {
        console.error('Error fetching tasks:', response.status, response.statusText);
        Alert.alert('Error', 'Failed to fetch tasks.');
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      Alert.alert('Error', 'Error loading tasks. Please check your connection.');
      navigation.navigate('Login')
    } finally {
      setLoading(false);
      setRefreshing(false); // Set refreshing to false when loadTasks finishes
    }
  };

    const onRefresh = useCallback(() => {
      loadTasks();
    }, []);

  useEffect(() => {
    loadTasks();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.background || '#fff'}
        translucent={true}
      />

      <SafeAreaView style={styles.safeContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary} // Optional: Customize the loading indicator color
            />
          }
        >
          <View style={styles.headerContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>Your's <Text style={styles.name}>To-dos</Text></Text>
              <Text style={styles.subtitle}>Let's be productive today!</Text>
            </View>
            <View style={{ gap: 20, flexDirection: "row", flex: 1, justifyContent: "flex-end", alignItems: "flex-end", padding: 10 }}>
              <Pressable onPress={handleOpenAddTaskModal}>
                <Ionicons name="add-circle-outline" size={30} color={Colors.primary} />
              </Pressable>
              <Pressable onPress={handleLogout}>
                <MaterialIcons name="logout" size={30} color={Colors.font} />
              </Pressable>
            </View>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : todos && todos.length > 0 ? (
            todos.map((item, index) => (
              <Todo
                key={item._id} // Use _id as key
                isDone={item.completed}
                title={item.title}
                subtitle={item.description}
                onDelete={() => handleDeleteTask(item._id)}
                onEdit={() => handleOpenEditTaskModal(item)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No todos yet. Add one below!</Text>
          )}
        </ScrollView>
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={addTaskModalVisible}
        onRequestClose={handleCloseAddTaskModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AddTaskBottomsheet
              onAddTask={handleAddTask}
              onClose={handleCloseAddTaskModal}
              loading={isAddTaskLoading}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editTaskModalVisible}
        onRequestClose={handleCloseEditTaskModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedTask && (
              <EditTaskBottomsheet
                task={selectedTask}
                onEditTask={handleEditTask}
                onClose={handleCloseEditTaskModal}
                loading={isEditTaskLoading}
              />
            )}
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default Home;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || '#fff',
  },
  safeContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? STATUSBAR_HEIGHT : 0,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
  },
  greeting: {
    color: Colors.font,
    fontSize: 25,
    fontWeight: '500',
  },
  name: {
    fontSize: 35,
    color: Colors.primary,
    fontWeight: 'bold'
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: Colors.subFont,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
  addTaskCard: {
    backgroundColor: Colors.primartAccent,
    padding: 10,
    borderRadius: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%', // Adjust width as needed
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 20
  },
  bottomSheetBackground: {
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  indicator: {
    backgroundColor: Colors.font,
  },
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.font,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.borderStroke,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: Colors.font,
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  cancelButton: {
    borderColor: Colors.primary,
    borderWidth: 2,
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.font,
    fontWeight: 'bold'
  },
  buttonText: {
    color: Colors.font,
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkbox: {
    borderRadius: 3,
    height: 20,
    width: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.font
  },
  subtitle: {
    fontWeight: "400",
    fontSize: 12,
    color: Colors.subFont
  },
  Container: {
    marginTop: 5,
    flexDirection: "row",
    height: 65,
    alignItems: "center",
    backgroundColor: Colors.cardBackground,
    borderRadius: 15,
    padding: 15,
  },
});