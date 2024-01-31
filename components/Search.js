import React,{useState} from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

export default function Search({executeSearch}) {
    const [search, setSearch] = useState('');

return(
    <View style={styles.searchBox}>
        <TextInput
            value={search}
            onChangeText={text => setSearch(text)}
            placeholder="Search..."
            returnKeyType="search"
            onSubmitEditing={() => executeSearch(search)}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    searchBox: {
        borderColor: '#333',
        borderWidth: 1,
        width: '35%',
        padding: 5,
        marginBottom: 20,
    },
});