import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native';
import {DATA} from './Data';
import Row from './components/Row';
import Search from './components/Search';
import Add from './components/Add';

export default function App() {
const [items, setItems] = useState([]);
const [selectedId, setSelectedId] = useState(null);

useEffect(() => {
  setItems(DATA);
}, []);

const select = (id) => {
  setSelectedId(id);
}

const renderItem = ({item}) => (
  <Text key={item.id}>{item.lastname}</Text>
);

const executeSearch = (search) => {
  const searchArray = DATA.filter((item) => item.lastname.startsWith(search));
  setItems(searchArray);
}

  return (
    <SafeAreaView style={style.container}>
      <Search executeSearch={executeSearch}  />
      <Add items={items} setItems={setItems} />
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        extraData={selectedId}
        renderItem = {({item}) => (
          <Row person={item} selectedId={selectedId} select={select} />
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
