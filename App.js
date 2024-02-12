import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {  FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native';
import {DATA} from './Data';
import Row from './components/Row';
import Search from './components/Search';
import Add from './components/Add';
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@persons_Key';

export default function App() {
const [items, setItems] = useState([]);
const [selectedId, setSelectedId] = useState(null);

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

const getData = async() => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY)
    const json = JSON.parse(value)
    if (json === null) {
      json = []
    }
    console.log(json)
    setItems(json)
  } catch (ex) {
    console.log(ex)
  }
}

const storeData = async(value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(STORAGE_KEY,jsonValue)
  } catch (ex) {
    console.log(ex)
  }
}

useEffect(() => {
  //AsyncStorage.clear()
  //setItems(DATA);
  getData()
}, [])

  return (
    <SafeAreaView style={style.container}>
      <Search executeSearch={executeSearch}  />
      <Add items={items} setItems={setItems} storeData={storeData}/>
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
