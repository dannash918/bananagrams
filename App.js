import React, { useRef, useState } from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text
} from "react-native"
import Animated, {
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Draggable from './Draggable';

const initLetterPool = () => {
  // Full bananagrams tileset
  const fullLetters = [
    "J","J","K","K","Q","Q","X","X","Z","Z","B","B","B","C","C","C","F","F","F","H","H","H",
    "M","M","M","P","P","P","V","V","V","W","W","W","Y","Y","Y","G","G","G","G","L","L","L",
    "L","L","D","D","D","D","D","D","S","S","S","S","S","S","U","U","U","U","U","U","N","N",
    "N","N","N","N","N","N","T","T","T","T","T","T","T","T","T","R","R","R","R","R","R","R",
    "R","R","O","O","O","O","O","O","O","O","O","O","O","I","I","I","I","I","I","I","I","I",
    "I","I","I","A","A","A","A","A","A","A","A","A","A","A","A","A","E","E","E","E","E","E",
    "E","E","E","E","E","E","E","E","E","E","E","E"
  ]

  // smaller set for debugging
  const letters = [
    "J","K","Q","X","Z","B","B","C","C","F","F","H","H",
    "M","M","P","P","V","V","W","W","Y","Y","G","G","L",
    "L","L","D","D","D","S","S","S","U","U","U","N","N",
    "N","N","T","T","T","T","R","R","R","R",
    "O","O","O","O","O","O","I","I","I","I","I","I",
    "A","A","A","A","A","A","A","E","E","E","E","E","E",
    "E","E","E"
  ]

  return letters
}

const Tile = ({letter}) => {
  return (
    <Animated.View style={styles.key}>
      <Text style={styles.keyLetter}>{letter}</Text>
    </Animated.View>
  )
}

const TileRow = ({
  rowLetters,
}) => {
  return (
  <View style={styles.keyboardRow}>
    {rowLetters.map((letter, idx) => (
      <Draggable key={idx}>
        <Tile key={idx} letter={letter} />
      </Draggable>
    ))}
  </View>
)}

const getLetters = (numLetters, letterPool, setLetterPool) => {
  const shuffledLetters = letterPool.sort(() => 0.5 - Math.random())
  selectedLetters = shuffledLetters.splice(0, numLetters)
  return selectedLetters
}

const Keyboard = ({ letters }) => {
  const kl = [...letters]
  var keyRows = []
  while (kl.length > 10) {
    row = kl.splice(0, 9)
    keyRows.push(row)
  }
  keyRows.push(kl)
  console.log(keyRows)

  return (
    <View style={styles.keyboard}>
      {keyRows.map((kr, idx) => (
        <TileRow key={idx} rowLetters={kr} />))}
    </View>
  )
}

export default function App() {
  const [letterPool, setLetterPool] = React.useState(() => initLetterPool())
  const [dragLetters, setDragLetters] = React.useState(() => getLetters(9, letterPool, setLetterPool))

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <Text style={styles.notes}>Draggable Bananagrams!!</Text>
        <Keyboard letters={dragLetters} />
        <Text style={styles.notes}>Letters left: {letterPool.length}</Text>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  notes: {
    marginTop: 20,
    textAlign: "center",
  },
  keyboard: { 
    flexDirection: "column",
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  key: {
    backgroundColor: "#d3d6da",
    padding: 10,
    margin: 3,
    borderRadius: 5,
  },
  keyLetter: {
    fontWeight: "500",
    fontSize: 15,
  },
})