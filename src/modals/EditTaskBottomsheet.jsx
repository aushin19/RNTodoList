// \\?\C:\Users\ASUS\RNTodoList\src\modals\EditTaskBottomsheet.jsx
import { StyleSheet, Text, View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../utils/Colors';

const EditTaskBottomsheet = ({ task, onEditTask, onClose, loading }) => {
  const [taskTitle, setTaskTitle] = useState(task ? task.title : '');
  const [taskDescription, setTaskDescription] = useState(task ? task.description : '');

  useEffect(() => {
      if (task) {
        setTaskTitle(task.title);
        setTaskDescription(task.description);
      }
  }, [task]);

  const handleEditTaskPress = () => {
    onEditTask({ _id: task._id, title: taskTitle, description: taskDescription });
    setTaskTitle('');
    setTaskDescription('');
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable onPress={handleEditTaskPress} disabled={loading}>
          <Text style={{ color: Colors.primary, fontWeight: "bold" }}>{loading ? "Saving..." : "Save"}</Text>
        </Pressable>
        <Text style={styles.title}>Edit To-do</Text>
        <Pressable onPress={onClose}>
          <Text style={{ color: Colors.font, fontWeight: "bold" }}>Cancel</Text>
        </Pressable>

      </View>

      <Text style={[styles.text, { marginTop: 30 }]}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Daily Workout Challenge"
        placeholderTextColor="#909090"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />

      <Text style={[styles.text, { marginTop: 20 }]}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Complete a 30-minute workout"
        placeholderTextColor="#909090"
        value={taskDescription}
        onChangeText={setTaskDescription}
        multiline
      />
    </View>
  )
}

export default EditTaskBottomsheet

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    width: "100%",
    padding: 10,
    height: "auto" // Adjusted height to auto
  },
  text: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
    color: "#909090"
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.font,
    marginBottom: 10,
    color: Colors.font // Ensure text is visible
  },
  input: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    padding: 15,
    color: Colors.font,
    borderColor: Colors.borderStroke,
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
    color: 'black', // Ensure text is visible
    fontWeight: 'bold'
  },
  buttonText: {
    color: 'black', // Ensure text is visible
    fontWeight: 'bold',
    fontSize: 16,
  },
});