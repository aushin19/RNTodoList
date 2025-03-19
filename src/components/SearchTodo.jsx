import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../utils/Colors'

const SearchTodo = () => {
  return (
    <View style={styles.Container}>
      <Ionicons name="search" size={25} color="EBE8DB" />
      <TextInput placeholder='Search todo...' style={styles.TextInput} />
    </View>
  )
}

export default SearchTodo

const styles = StyleSheet.create({
  Container: {
    marginTop: 30,
    flexDirection: "row",
    height: 65,
    alignItems: "center",
    backgroundColor: Colors.cardBackground,
    borderRadius: 15,
    padding: 15,
  },
  TextInput: {
    width: "100%",
    fontSize: 16,
    padding: 10,
    fontWeight: "bold"
  }
})