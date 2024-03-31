import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Box from './box';
import Draggable from './Draggable';

const arr = new Array(25).fill('').map((_, i) => i);

const App = () => {
  // const positions = useSharedValue(
  //   Object.assign({}, ...arr.map(item => ({[item]: item}))),
  // );

  return (
    <SafeAreaProvider style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>
            {arr.map(item => (
              <Draggable key={item}>
                <Box key={item} count={item} /> 
              </Draggable>
          ))}
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
});