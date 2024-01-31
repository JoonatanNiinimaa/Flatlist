import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function Row({person, selectedId, select}) {
    const backgroundColor = person.id === selectedId ? "#c0c0c0" : "#f5f5f5";

    return (
        <Pressable onPress={() => select(person.id)}>
            <Text 
            style={[style.row,{backgroundColor}]}>
            {person.lastname}, {person.firstname
        }</Text>
        </Pressable>
    );
}
const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
        padding: 15,
        marginBottom: 5,
    },
  });