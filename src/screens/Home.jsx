import { SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import React from 'react'
import SearchTodo from '../components/SearchTodo'
import Todo from '../components/Todo'
import Colors from '../utils/Colors'
import { dummyTodo } from '../utils/DummyTodos'

const Home = () => {
  return (
    <View style={styles.container}>
      {/* Set the status bar */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background || "#fff"}
        translucent={true}
      />

      {/* Use SafeAreaView for content */}
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.greeting}>Hello! <Text style={styles.name}>Shivam</Text></Text>
            <Text style={styles.subtitle}>Let's be productive today!</Text>
          </View>

          {/* Todo input and list */}
          <SearchTodo />
          (
          <Text style={{ fontWeight: "bold", marginTop: 30 }}>To-do List</Text>
          {
            dummyTodo && dummyTodo.length > 0 ? (
              dummyTodo.map((item, index) => (
                <Todo
                  key={index}
                  isDone={item.isDone}
                  title={item.title}
                  subtitle={item.subtitle}
                />
              ))
            ) : (
              <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
            )
          }
          )
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Home

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
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '500',
  },
  name: {
    fontSize: 25,
    color: Colors.primary,
    fontWeight: 'bold'
  },
  subtitle: {
    marginTop: 4,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  }
})