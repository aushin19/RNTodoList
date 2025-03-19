import { StyleSheet, Text, View, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import Colors from '../utils/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Todo = ({ isDone, title, subtitle, onDelete, onEdit }) => {
    const [isChecked, setChecked] = useState(isDone);

    return (
        <View style={{ marginTop: 5 }}>
            <View style={styles.Container}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? Colors.primary : "#505050"}
                />
                <View style={{flex: 2, justifyContent: "center", paddingLeft: 20}}>
                    <Text style={[styles.title, {textDecorationLine: isChecked ? 'line-through' : "none", color: isChecked ? '#909090' : Colors.font}]}>{title}</Text>
                    <Text style={[styles.subtitle, {color: isChecked ? '#909090' : Colors.font, opacity: subtitle.length > 0 ? 1 : 0}]}>{subtitle}</Text>
                </View>
                <View style={{flexDirection: "row", flex: 1, justifyContent: "flex-end", alignItems: "flex-end", paddingLeft: 20}}>
                    <Pressable onPress={onEdit}>
                        <MaterialIcons name="edit" size={20} color={Colors.primary} style={{marginRight: 15}} />
                    </Pressable>

                    <Pressable onPress={onDelete}>
                        <MaterialIcons name="delete" size={20} color={Colors.binRed} />
                    </Pressable>
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
        backgroundColor: Colors.cardBackground,
        borderRadius: 15,
        padding: 15,
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
})