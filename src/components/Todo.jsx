import { StyleSheet, Text, View } from 'react-native'
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react'
import Colors from '../utils/Colors';

const Todo = ({ isDone, title, subtitle }) => {
    const [isChecked, setChecked] = useState(isDone);

    return (
        <View style={{ marginTop: 5 }}>
            <View style={styles.Container}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? Colors.primary : "grey"}
                />
                <View style={{flex: 1, justifyContent: "center", paddingLeft: 20}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
            </View>
        </View>
    )
}

export default Todo

const styles = StyleSheet.create({
    Container: {
        marginTop: 5,
        flexDirection: "row",
        height: 65,
        alignItems: "center",
        backgroundColor: '#EAEAEA',
        borderRadius: 15,
        padding: 15,
    },
    checkbox: {
        borderRadius: 3,
        height: 20,
        width: 20
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
    },
    subtitle: {
        fontWeight: "400",
        fontSize: 12,
    },
})